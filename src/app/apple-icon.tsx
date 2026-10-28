import { ImageResponse } from 'next/og';
import initial from '../generated/handwriting-initial.json';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <svg
      role="img"
      aria-label="Patrick Coleman"
      width="180"
      height="180"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="4" fill="#faf9f6" />
      <path d="M8 17h48M8 32h48M8 47h48" stroke="#d5d5cc" />
      <path d={initial.path} fill="#252821" />
      <rect
        x={initial.dot.x}
        y={initial.dot.y}
        width={initial.dot.size}
        height={initial.dot.size}
        fill="#244ec7"
      />
    </svg>,
    size,
  );
}
