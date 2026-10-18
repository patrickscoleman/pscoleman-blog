import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#faf9f6',
        color: '#244ec7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 100,
        fontWeight: 400,
      }}
    >
      p.
    </div>,
    size,
  );
}
