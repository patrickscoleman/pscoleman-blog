import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rss } from "lucide-react";

export const RssButton = (props: { className?: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
          href="/rss.xml"
          passHref
        >
          <Rss className={props.className} />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>RSS Feed</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
