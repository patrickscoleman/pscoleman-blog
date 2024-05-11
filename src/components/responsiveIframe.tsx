"use client";

import { useState, useEffect, FC } from "react";

interface ResponsiveIframeProps {
  className?: string;
  src: string;
  title: string;
}

const ResponsiveIframeComponent: FC<ResponsiveIframeProps> = ({
  className,
  src,
  title,
}) => {
  const [iframeSize, setIframeSize] = useState<{
    width: number;
    height: number;
  }>({ width: 300, height: 169 });

  useEffect(() => {
    const handleResize = () => {
      const iframeContainer = document.getElementById("iframe-container");
      if (!iframeContainer) return;

      const parentWidth = iframeContainer.offsetWidth;
      const width = parentWidth * 0.9; // 90% of parent's width
      const height = width * 0.5625; // Maintain 16:9 aspect ratio
      setIframeSize({ width, height });
    };

    // Calculate size on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="iframe-container" style={{ width: "100%" }}>
      <iframe
        className={className}
        width={iframeSize.width}
        height={iframeSize.height}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export const ResponsiveIframe = ResponsiveIframeComponent;
