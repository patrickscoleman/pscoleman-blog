"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  return (
    <div>
      {usePathname().includes("/blog/") ? (
        <>
          <h1>Post not found</h1>
          <p>
            View all <Link href="/blog">blog posts</Link>
          </p>
          <p>
            Return <Link href="/">home</Link>
          </p>
        </>
      ) : (
        <>
          <h1>Page not found</h1>
          <p>
            Return <Link href="/">home</Link>
          </p>
        </>
      )}
    </div>
  );
}
