"use client";

import Link from "next/link";
import { RssButton } from "@/components/rssButton";
import { usePathname } from "next/navigation";
import { getPrevPost, getNextPost } from "@/utils/getPosts";

interface PostNavigationProps {
  prevPost?: string;
  nextPost?: string;
}

export const PostNavigation: React.FC<PostNavigationProps> = () => {
  const pathname = usePathname();
  const postId = pathname.split("/").pop() || "";
  const prevPost = getPrevPost(postId);
  const nextPost = getNextPost(postId);

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
            <div className="text-muted-foreground">prev</div>
          )}
          <div className="flex items-center gap-2">
            <Link href="/blog" className="no-underline">
              [ all ]
            </Link>
            <RssButton className="text-xs" />
          </div>
          {nextPost ? (
            <Link
              href={nextPost}
              className="no-underline hover:text-accent-light dark:hover:text-accent-dark"
            >
              next &gt;
            </Link>
          ) : (
            <div className="text-muted-foreground">next</div>
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
};
