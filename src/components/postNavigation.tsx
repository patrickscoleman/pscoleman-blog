"use client";

import Link from "next/link";
import { RssButton } from "@/components/rssButton";
import { usePathname } from "next/navigation";

interface PostNavigationProps {
  prevPost?: string;
  nextPost?: string;
}

export const PostNavigation: React.FC<PostNavigationProps> = ({
  prevPost,
  nextPost,
}) => {
  const pathname = usePathname();

  if (pathname.includes("/blog/")) {
    return (
      <>
        <hr className="my-8" />
        <div className="flex my-0 content-end items-center justify-around">
          {prevPost ? (
            <Link href={prevPost} className="no-underline">
              &lt; prev
            </Link>
          ) : (
            <div className="muted">prev</div>
          )}
          <div className="flex items-center gap-2">
            <Link href="/blog" className="no-underline">
              [ all ]
            </Link>
            <RssButton className="text-sm" />
          </div>
          {nextPost ? (
            <Link
              href={nextPost}
              className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
            >
              next &gt;
            </Link>
          ) : (
            <div className="text-text-lightfaint dark:text-text-darkfaint">
              next
            </div>
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
};
