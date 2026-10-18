import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import { SocialHeader, SocialPaper } from '@/components/social-paper';
import handwriting from '@/generated/handwriting-outlines.json';
import { getSocialAssets } from '@/lib/social-assets';

export const alt = 'Patrick Coleman — products, growth, and languages.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const [assets, portrait] = await Promise.all([
    getSocialAssets(),
    sharp(path.join(process.cwd(), 'public/images/patrick-layered.webp'))
      .resize(352, 352)
      .png()
      .toBuffer(),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#faf9f6',
        color: '#252821',
        fontFamily: 'Geist',
        padding: '48px 88px',
        position: 'relative',
      }}
    >
      <SocialPaper src={assets.paper} />
      <SocialHeader rule={assets.rule} />
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 20,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 600 }}>
          {Object.entries(handwriting).map(([word, glyph]) => (
            <svg
              key={word}
              role="img"
              aria-label={word}
              width={480}
              height={142}
              viewBox={`0 0 ${glyph.width} 1100`}
            >
              <path
                d={glyph.path}
                transform="translate(0 820) scale(1 -1)"
                fill="#252821"
              />
            </svg>
          ))}
          <span style={{ marginTop: 20, fontSize: 26, color: '#666a62' }}>
            Products, growth, and languages.
          </span>
        </div>
        {/* biome-ignore lint/performance/noImgElement: ImageResponse requires an embedded image. */}
        <img
          src={`data:image/png;base64,${portrait.toString('base64')}`}
          width={352}
          height={352}
          alt=""
        />
      </div>
    </div>,
    { ...size, fonts: assets.fonts },
  );
}
