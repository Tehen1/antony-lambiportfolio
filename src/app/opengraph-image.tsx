import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/metadata';

export const runtime = 'edge';
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 16,
            letterSpacing: '-2px',
          }}
        >
          Antony Lambi
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#a1a1aa',
            textAlign: 'center',
          }}
        >
          Développeur Blockchain &amp; Web3 · Liège
        </p>
      </div>
    ),
    { ...size }
  );
}
