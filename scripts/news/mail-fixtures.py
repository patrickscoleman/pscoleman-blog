"""Offline MIME feasibility checks; no inbox access, network, or authentication.

This establishes whether common forwarding shapes preserve newsletter metadata.
It is not production ingestion and cannot establish sender authenticity.
"""

import email.policy
from email.parser import BytesParser
import unittest


def inspect_message(raw):
    message = BytesParser(policy=email.policy.default).parsebytes(raw)
    attached = [
        part for part in message.walk() if part.get_content_type() == "message/rfc822"
    ]
    if attached:
        message = attached[0].get_payload()[0]
    body = message.get_body(preferencelist=("plain", "html"))
    return {
        "list_id": str(message.get("List-ID", "")).strip().lower(),
        "sender": str(message.get("From", "")),
        "message_id": str(message.get("Message-ID", "")),
        "body": body.get_content() if body else "",
        "has_unsubscribe": bool(message.get("List-Unsubscribe")),
    }


DIRECT = b"""From: Example Garden <events@example.org>
To: digest@example.net
Message-ID: <edition-1@example.org>
List-ID: <garden.example.org>
List-Unsubscribe: <https://example.org/unsubscribe?token=private>
Subject: Garden events
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary=sample

--sample
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: quoted-printable

A garden walk =E2=80=94 Saturday at noon.
--sample
Content-Type: text/html; charset=utf-8

<p>A garden walk.</p><img src="https://example.org/track.gif">
--sample--
"""


class ForwardingFeasibility(unittest.TestCase):
    def test_direct_multipart_preserves_identity_and_decodes_text(self):
        parsed = inspect_message(DIRECT)
        self.assertEqual(parsed["list_id"], "<garden.example.org>")
        self.assertIn("\u2014 Saturday", parsed["body"])
        self.assertNotIn("<img", parsed["body"])

    def test_attached_forward_preserves_original_identity(self):
        forwarded = b"""From: Forwarder <forwarder@example.net>
To: receiver@example.net
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=forward

--forward
Content-Type: message/rfc822

""" + DIRECT + b"\n--forward--\n"
        self.assertEqual(inspect_message(forwarded)["list_id"], "<garden.example.org>")
        self.assertEqual(inspect_message(forwarded)["message_id"], "<edition-1@example.org>")

    def test_inline_forward_cannot_be_safely_identified_from_body_headers(self):
        forwarded = b"""From: Forwarder <forwarder@example.net>
Subject: Fwd: Garden events
Content-Type: text/plain; charset=utf-8

---------- Forwarded message ----------
From: Example Garden <events@example.org>
List-ID: <garden.example.org>
A garden walk.
"""
        self.assertEqual(inspect_message(forwarded)["list_id"], "")

if __name__ == "__main__":
    unittest.main(verbosity=2)
