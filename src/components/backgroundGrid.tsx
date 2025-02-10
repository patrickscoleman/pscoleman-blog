"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const BackgroundGrid = (props: { className?: string }) => {
  // const pathname = usePathname();
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [radius, setRadius] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   const updateRadius = () => {
  //     const width = window.innerWidth;
  //     const height = window.innerHeight;
  //     setRadius(Math.min(width, height) * 0.15);
  //   };

  //   const updateViewportSize = () => {
  //     setViewportSize({ width: window.innerWidth, height: window.innerHeight });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("resize", updateRadius);
  //   window.addEventListener("resize", updateViewportSize);

  //   // Initial updates on component mount
  //   updateRadius();
  //   updateViewportSize();

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("resize", updateRadius);
  //     window.removeEventListener("resize", updateViewportSize);
  //   };
  // }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-none pointer-events-none ${props.className}`}
    >
      <svg
        height="100%"
        width="100%"
        key={`${viewportSize.width}-${viewportSize.height}`}
      >
        <defs>
          <pattern
            id="gridPattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="var(--grid)"
              strokeWidth="2"
            />
          </pattern>
          {/* <mask id="circleMask">
            <radialGradient
              id="fadeGradient"
              cx={mousePosition.x}
              cy={mousePosition.y}
              r={radius * 0.5} // 50% of the radius for gradient effect
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r={radius}
              fill="url(#fadeGradient)"
            />
          </mask> */}
          <mask id="edgeMask">
            <linearGradient
              id="edgeFade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              spreadMethod="pad"
            >
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="25%" stopColor="white" stopOpacity="0" />
              <stop offset="75%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#edgeFade)"
            />
          </mask>
        </defs>
        {/* {pathname === "/" && viewportSize.width > 639 && (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gridPattern)"
            mask="url(#circleMask)"
          />
        )}
        {pathname === "/test" ? (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gridPattern)"
          />
        ) : ( */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gridPattern)"
            mask="url(#edgeMask)"
          />
        {/* )} */}
      </svg>
    </div>
  );
};
