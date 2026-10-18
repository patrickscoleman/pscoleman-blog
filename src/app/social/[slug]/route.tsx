import { ImageResponse } from 'next/og';
import {
  SocialHeader,
  SocialPaper,
  SocialRule,
} from '@/components/social-paper';
import { getSocialAssets } from '@/lib/social-assets';
import { getTranslation, getTranslations } from '@/lib/translations';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { slug: 'translations' },
    ...getTranslations().map(({ slug }) => ({ slug })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const translation = getTranslation(slug);
  if (slug !== 'translations' && !translation)
    return new Response('Not found', { status: 404 });
  const assets = await getSocialAssets();
  const title = translation?.title ?? 'Translations';
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 88px',
        background: '#faf9f6',
        color: '#252821',
        fontFamily: 'Geist',
        position: 'relative',
      }}
    >
      <SocialPaper src={assets.paper} />
      <SocialHeader rule={assets.rule} translations />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: 'Interface Mono',
            fontSize: title.length > 24 ? 62 : 80,
            lineHeight: 1.16,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, color: '#666a62' }}>
          {translation?.author ?? 'Spanish / Japanese → English'}
        </div>
      </div>
      <SocialRule src={assets.rule} />
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: '#666a62',
          paddingTop: 24,
        }}
      >
        {translation
          ? `Translated from ${translation.language} by Patrick Coleman`
          : 'Literary translations by Patrick Coleman'}
      </div>
    </div>,
    { width: 1200, height: 630, fonts: assets.fonts },
  );
}
