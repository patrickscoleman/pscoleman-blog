import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export const RssIcon = ({ className = "", ...props }) => {
  const sizeClasses = {
    "text-xs": { width: "14", height: "14" },
    "text-sm": { width: "18", height: "18" },
    "text-base": { width: "22", height: "22" },
    "text-lg": { width: "26", height: "26" },
    "text-xl": { width: "30", height: "30" },
    "text-2xl": { width: "34", height: "34" },
    "text-3xl": { width: "38", height: "38" },
    "text-4xl": { width: "42", height: "42" },
    "text-5xl": { width: "46", height: "46" },
    "text-6xl": { width: "50", height: "50" },
  };

  const getSize = () => {
    if (!className) {
      console.error("RssIcon requires a className to determine size.");
      return { width: "20", height: "20" }; // Default size if no className
    }
    const sizeClass = Object.keys(sizeClasses).find((size) =>
      className.includes(size)
    );
    if (!sizeClass) {
      return { width: "20", height: "20" }; // Default size if className does not specify a valid size
    }
    return sizeClasses[sizeClass];
  };

  const { width, height } = getSize();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height || 20}
      width={width || 20}
      viewBox="0 0 504.4 504.4"
      xmlSpace="preserve"
      className={className}
      {...props}
    >
      <path d="M377.6,0.2H126.4C56.8,0.2,0,57,0,126.6v251.6c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6    C504,57,447.2,0.2,377.6,0.2z M136.8,409c-23.2,0-42-18.8-42-41.6c0-23.2,18.8-41.6,42-41.6c23.2,0,42,18.8,42,41.6    C178.8,390.2,160,409,136.8,409z M242,408.2c0-40-14.8-76-42.4-103.6c-28-28-63.6-42.4-103.6-42.4v-60.4    c112,0,206.4,94.4,206.4,206.4H242z M348.8,408.2c0-140-112.8-252.8-252.8-252.8V95c172,0,313.2,141.2,313.2,313.2H348.8z" />
    </svg>
  );
};

const RssButtonComponent = (props) => (
  <Tooltip title="RSS Feed">
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
      href="/rss.xml"
      passHref
    >
      <RssIcon {...props} />
    </Link>
  </Tooltip>
);

export const RssButton = RssButtonComponent;
