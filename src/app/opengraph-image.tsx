import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BluEdge Agency - Creative Digital Agency in Dubai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(44, 172, 226, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(44, 172, 226, 0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Scanline overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Top-left cyan glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(44, 172, 226, 0.15) 0%, rgba(44, 172, 226, 0.05) 40%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom-right cyan glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0, 174, 239, 0.12) 0%, rgba(0, 174, 239, 0.04) 40%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Center glow behind text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(44, 172, 226, 0.08) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Accent line top */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '3px',
            background:
              'linear-gradient(90deg, transparent 0%, #2CACE2 30%, #00AEEF 50%, #2CACE2 70%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Accent line bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '3px',
            background:
              'linear-gradient(90deg, transparent 0%, #2CACE2 30%, #00AEEF 50%, #2CACE2 70%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            gap: '0',
          }}
        >
          {/* BLU EDGE heading */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '20px',
            }}
          >
            <span
              style={{
                fontSize: '110px',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1,
                color: 'white',
                textShadow: '0 0 60px rgba(44, 172, 226, 0.3)',
              }}
            >
              BLU
            </span>
            <span
              style={{
                fontSize: '110px',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1,
                backgroundImage:
                  'linear-gradient(135deg, #2CACE2 0%, #00AEEF 50%, #2CACE2 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: 'none',
              }}
            >
              EDGE
            </span>
          </div>

          {/* Separator line */}
          <div
            style={{
              width: '120px',
              height: '3px',
              background:
                'linear-gradient(90deg, transparent, #2CACE2, transparent)',
              marginTop: '28px',
              marginBottom: '28px',
              display: 'flex',
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              letterSpacing: '8px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
            }}
          >
            Creative Digital Agency
          </div>

          {/* Location tag */}
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#2CACE2',
              marginTop: '16px',
              opacity: 0.8,
              display: 'flex',
            }}
          >
            Dubai, UAE
          </div>
        </div>

        {/* Corner decorations - top left */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(44, 172, 226, 0.4)',
            borderLeft: '2px solid rgba(44, 172, 226, 0.4)',
            display: 'flex',
          }}
        />

        {/* Corner decorations - top right */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(44, 172, 226, 0.4)',
            borderRight: '2px solid rgba(44, 172, 226, 0.4)',
            display: 'flex',
          }}
        />

        {/* Corner decorations - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(44, 172, 226, 0.4)',
            borderLeft: '2px solid rgba(44, 172, 226, 0.4)',
            display: 'flex',
          }}
        />

        {/* Corner decorations - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(44, 172, 226, 0.4)',
            borderRight: '2px solid rgba(44, 172, 226, 0.4)',
            display: 'flex',
          }}
        />

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            Branding
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'rgba(44, 172, 226, 0.5)',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            Web Design
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'rgba(44, 172, 226, 0.5)',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            Video
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'rgba(44, 172, 226, 0.5)',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            Social Media
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'rgba(44, 172, 226, 0.5)',
              display: 'flex',
            }}
          />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            Marketing
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
