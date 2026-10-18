'use client';

import { useState } from 'react';

export function OriginalTextToggle() {
  const [visible, setVisible] = useState(false);
  function toggle() {
    const next = !visible;
    document
      .querySelectorAll<HTMLElement>('#translation-text .original-text')
      .forEach((paragraph) => {
        paragraph.hidden = !next;
      });
    setVisible(next);
  }
  return (
    <button
      className="original-toggle"
      type="button"
      aria-pressed={visible}
      aria-controls="translation-text"
      onClick={toggle}
    >
      <span aria-hidden="true">[</span>
      <span className="control-label">
        {visible ? 'Hide original' : 'Show original'}
      </span>
      <span aria-hidden="true">]</span>
    </button>
  );
}
