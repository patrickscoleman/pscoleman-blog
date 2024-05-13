"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const BackgroundGrid = (props: { className?: string }) => {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateRadius = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setRadius(Math.min(width, height) * 0.15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateRadius);

    // Initial radius update on component mount
    updateRadius();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-none pointer-events-none ${props.className}`}
    >
      <svg height="100%" width="100%">
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
              strokeWidth="1"
            />
          </pattern>
          <mask id="circleMask">
            <radialGradient
              id="fadeGradient"
              cx={mousePosition.x}
              cy={mousePosition.y}
              r={radius * 0.5} // 50% of the radius for gradient effect
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="50%" stop-color="white" stop-opacity="1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r={radius}
              fill="url(#fadeGradient)"
            />
          </mask>
          <mask id="edgeMask">
            <linearGradient
              id="edgeFade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              spreadMethod="pad"
            >
              <stop offset="0%" stop-color="white" stop-opacity="1" />
              <stop offset="25%" stop-color="white" stop-opacity="0" />
              <stop offset="75%" stop-color="white" stop-opacity="0" />
              <stop offset="100%" stop-color="white" stop-opacity="1" />
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
        {pathname === "/" && (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gridPattern)"
            mask="url(#circleMask)"
          />
        )}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#gridPattern)"
          mask="url(#edgeMask)"
        />
      </svg>
    </div>
  );
};
