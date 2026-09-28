import { useEffect, useRef, useState } from 'react';

/**
 * A puppy whose eyes follow the pointer.
 *
 * People give more when they are being looked at — the effect holds for images of eyes, not just
 * real ones, and a gaze that tracks you is a stronger version of it than a fixed stare. That is the
 * whole reason this is drawn rather than written: an appeal for money reads very differently under
 * a face than under a paragraph.
 *
 * Drawn inline instead of shipped as an image so it stays sharp at any size, costs no request, and
 * can move. Everything below is one <svg> with no dependencies; swapping in a photograph later
 * means replacing this component and nothing else.
 */

const EYE_LEFT_X = 76;
const EYE_RIGHT_X = 124;
const EYE_Y = 92;

/** How far a pupil may drift from centre. Past this the eyes stop reading as eyes and start to squint. */
const PUPIL_TRAVEL = 6;

const BLINK_INTERVAL_MS = 5200;
const BLINK_DURATION_MS = 180;

type Offset = { x: number; y: number };

const CENTRE: Offset = { x: 0, y: 0 };

export default function PuppyEyes({ size = 132 }: { size?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [gaze, setGaze] = useState<Offset>(CENTRE);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // A coarse pointer has no hover position to follow, and reduced motion is a request not to
    // animate. Both keep the gaze dead ahead, which is still eye contact — the part that matters.
    const wantsStillness =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches;

    if (wantsStillness) return;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      // Coalesced into one update per frame. Pointer events fire far faster than the screen
      // refreshes, and re-rendering on every one of them for a decorative detail is not a trade
      // worth making on a mid-range phone.
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;

        const svg = svgRef.current;
        if (!svg) return;

        const bounds = svg.getBoundingClientRect();
        const faceX = bounds.left + bounds.width / 2;
        const faceY = bounds.top + bounds.height * 0.46;

        const dx = event.clientX - faceX;
        const dy = event.clientY - faceY;
        const distance = Math.hypot(dx, dy) || 1;

        // Saturating rather than linear: the eyes reach full deflection about a face-width away and
        // hold there, instead of creeping further the longer the pointer travels.
        const reach = Math.min(1, distance / (bounds.width * 0.9));

        setGaze({
          x: (dx / distance) * reach * PUPIL_TRAVEL,
          y: (dy / distance) * reach * PUPIL_TRAVEL,
        });
      });
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let closeTimer: number;

    const interval = window.setInterval(() => {
      setIsBlinking(true);
      closeTimer = window.setTimeout(
        () => setIsBlinking(false),
        BLINK_DURATION_MS
      );
    }, BLINK_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      // Decorative. The prompt says everything in text, and a screen reader announcing a drawing of
      // a dog in the middle of a request for money is noise.
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="puppyFur" cx="50%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#e8bf8c" />
          <stop offset="100%" stopColor="#c99257" />
        </radialGradient>
        <linearGradient id="puppyEar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a97542" />
          <stop offset="100%" stopColor="#7d5230" />
        </linearGradient>
        <radialGradient id="puppyIris" cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#7a4a24" />
          <stop offset="100%" stopColor="#331d0d" />
        </radialGradient>
      </defs>

      {/* Ears first so the head overlaps them at the join. */}
      <path
        d="M52 62 C24 66 16 108 26 142 C33 166 55 172 64 156 C72 141 62 108 66 84 Z"
        fill="url(#puppyEar)"
      />
      <path
        d="M148 62 C176 66 184 108 174 142 C167 166 145 172 136 156 C128 141 138 108 134 84 Z"
        fill="url(#puppyEar)"
      />

      <ellipse cx="100" cy="102" rx="58" ry="56" fill="url(#puppyFur)" />

      {/* Inner-brow raise. This is the actual "puppy eyes" movement — dogs bred alongside people
          evolved the muscle for it, and it is read as appeal rather than as a face at rest. */}
      <path
        d="M62 70 Q76 62 90 68"
        stroke="#8a5d33"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M138 70 Q124 62 110 68"
        stroke="#8a5d33"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {[EYE_LEFT_X, EYE_RIGHT_X].map((eyeX) => (
        <g key={eyeX}>
          <ellipse cx={eyeX} cy={EYE_Y} rx="19" ry="20.5" fill="#ffffff" />

          <g
            style={{
              transform: `translate(${gaze.x}px, ${gaze.y}px)`,
              transition: 'transform 120ms ease-out',
            }}
          >
            <circle cx={eyeX} cy={EYE_Y} r="14" fill="url(#puppyIris)" />
            <circle cx={eyeX} cy={EYE_Y} r="6.8" fill="#120a04" />
            {/* Catchlights. Without them the eyes look painted on rather than wet. */}
            <circle
              cx={eyeX - 5}
              cy={EYE_Y - 6.5}
              r="4.1"
              fill="#ffffff"
              opacity="0.95"
            />
            <circle
              cx={eyeX + 4.5}
              cy={EYE_Y + 5}
              r="2"
              fill="#ffffff"
              opacity="0.55"
            />
          </g>

          {/* The lid drops over the eye rather than the eye disappearing, so a blink stays a blink. */}
          <ellipse
            cx={eyeX}
            cy={EYE_Y}
            rx="19.4"
            ry="20.9"
            fill="url(#puppyFur)"
            style={{
              transformOrigin: `${eyeX}px ${EYE_Y - 20.5}px`,
              transform: `scaleY(${isBlinking ? 1 : 0})`,
              transition: `transform ${BLINK_DURATION_MS / 2}ms ease-in-out`,
            }}
          />
        </g>
      ))}

      <ellipse cx="100" cy="132" rx="27" ry="20" fill="#f0d3ad" />
      <path
        d="M88 124 Q100 118 112 124 Q112 134 100 138 Q88 134 88 124 Z"
        fill="#2b1a10"
      />
      <ellipse cx="95" cy="126" rx="3" ry="2" fill="#5d4636" opacity="0.85" />

      {/* Mouth: two small curves under the nose, kept closed. An open smile reads as cheerful,
          which is the wrong register for asking. */}
      <path
        d="M100 138 L100 144"
        stroke="#2b1a10"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M100 144 Q92 151 85 144"
        stroke="#2b1a10"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 144 Q108 151 115 144"
        stroke="#2b1a10"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
