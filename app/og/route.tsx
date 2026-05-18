import { ImageResponse } from 'next/og';

// Use the Edge Runtime for optimal performance
export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '60px',
        background: 'linear-gradient(135deg, #020617, #0f172a)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 9999,
            background: '#0ea5e9',
            color: '#ffffff',
          }}
        >
          Project Collection
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.2,
            color: '#38bdf8',
          }}
        >
          100+ React JS Projects
        </h1>

        <p
          style={{
            fontSize: 32,
            marginTop: 20,
            color: '#cbd5f5',
          }}
        >
          From Beginner to Advanced
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 22,
          color: '#94a3b8',
        }}
      >
        <span>Built with Next.js, TypeScript & Tailwind CSS</span>
        <span>{process.env.NEXT_PUBLIC_URL}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
