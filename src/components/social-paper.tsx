export function SocialPaper({ src }: { src: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: Static ImageResponse, not browser UI.
    <img
      src={src}
      alt=""
      width={1200}
      height={630}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
}

export function SocialRule({ src }: { src: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: Static ImageResponse, not browser UI.
    <img src={src} alt="" width={1024} height={5} style={{ opacity: 0.4 }} />
  );
}

export function SocialHeader({
  rule,
  translations = false,
}: {
  rule: string;
  translations?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Interface Mono',
          fontSize: 22,
          height: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              background: '#244ec7',
            }}
          />
          <span>
            pscoleman.me<span style={{ color: '#5e7195' }}>:~</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <span>{translations ? '[Translations]' : 'Translations'}</span>
          <span>Alloglot ↗</span>
        </div>
      </div>
      <SocialRule src={rule} />
    </div>
  );
}
