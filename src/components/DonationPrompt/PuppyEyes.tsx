import { useEffect, useId, useRef, useState } from 'react';

/**
 * A puppy making puppy eyes, and then, once someone has given, a happy one.
 *
 * People give more when they are being looked at — the effect holds for images of eyes, not just
 * real ones — and the face doing the looking matters too. This one is built from the features
 * people answer without thinking: a round head, eyes that are big, dark, set low and wet-looking,
 * and the expression dogs bred alongside people evolved for exactly this: inner brows raised, gaze
 * tipped up from under them, a slow blink. It should read as a request, never as cheerful.
 *
 * The happy mood is the payoff. Eyes squeezed shut, mouth open, tongue out: the thank-you is the
 * dog being pleased, not a line of text.
 *
 * Head only, on purpose. A body in this flat style looked like a toy; the photo it is after has
 * the body receding behind a big foreground head, which needs shading this drawing does not have.
 *
 * Drawn inline instead of shipped as an image so it stays sharp at any size, costs no request, and
 * can move. Everything below is one <svg> with no dependencies; swapping in a photograph later
 * means replacing this component and nothing else.
 */

const EYE_LEFT_X = 75;
const EYE_RIGHT_X = 125;
const EYE_Y = 104;
const EYE_RX = 21;
const EYE_RY = 22;

/** At rest the irises sit high, so white shows beneath them: the upward look of an appeal. */
const GAZE_REST: Offset = { x: 0, y: -4 };

/** How far the irises may drift from rest. Past this they leave the eye. */
const PUPIL_TRAVEL = 4;

const BLINK_INTERVAL_MS = 4600;
/** Slow on purpose. A quick blink is a twitch; a slow one is what the reference dog does. */
const BLINK_DURATION_MS = 420;

type Offset = { x: number; y: number };

export type PuppyMood = 'asking' | 'happy';

export default function PuppyEyes({
  size = 150,
  mood = 'asking',
}: {
  size?: number;
  mood?: PuppyMood;
}) {
  // More than one of these can be mounted at once (Settings and the home page each have a support
  // sheet), and gradient and clip ids are document-wide. React's ids contain characters that are not valid in a CSS class name.
  const id = `puppy${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [gaze, setGaze] = useState<Offset>(GAZE_REST);
  const [isBlinking, setIsBlinking] = useState(false);
  const isHappy = mood === 'happy';

  useEffect(() => {
    // A coarse pointer has no hover position to follow, and reduced motion is a request not to
    // animate. Both keep the gaze at rest, looking up, which is still eye contact.
    const wantsStillness =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches;

    if (wantsStillness || isHappy) return;

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
        const faceY = bounds.top + bounds.height * 0.52;

        const dx = event.clientX - faceX;
        const dy = event.clientY - faceY;
        const distance = Math.hypot(dx, dy) || 1;

        // Saturating rather than linear: the eyes reach full deflection about a face-width away and
        // hold there, instead of creeping further the longer the pointer travels.
        const reach = Math.min(1, distance / (bounds.width * 0.9));

        setGaze({
          x: GAZE_REST.x + (dx / distance) * reach * PUPIL_TRAVEL,
          y: GAZE_REST.y + (dy / distance) * reach * PUPIL_TRAVEL,
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
  }, [isHappy]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (isHappy) return;

    let openTimer: number;

    const interval = window.setInterval(() => {
      setIsBlinking(true);
      openTimer = window.setTimeout(
        () => setIsBlinking(false),
        BLINK_DURATION_MS
      );
    }, BLINK_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(openTimer);
    };
  }, [isHappy]);

  const fur = `url(#${id}-fur)`;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      // Decorative. The form says everything in text, and a screen reader announcing a drawing of
      // a dog in the middle of a request for money is noise.
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* In drawing units rather than per shape, so anything filled with fur (the eyelids, the
            tuft) takes the colour of the head at that spot and blends into it. */}
        <radialGradient
          id={`${id}-fur`}
          gradientUnits="userSpaceOnUse"
          cx="100"
          cy="72"
          r="98"
        >
          <stop offset="0%" stopColor="#f3cf9d" />
          <stop offset="70%" stopColor="#dfa865" />
          <stop offset="100%" stopColor="#c98e4f" />
        </radialGradient>
        <linearGradient id={`${id}-ear`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c48a4f" />
          <stop offset="55%" stopColor="#9c6334" />
          <stop offset="100%" stopColor="#6f4220" />
        </linearGradient>
        <radialGradient id={`${id}-iris`} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#6b3d1c" />
          <stop offset="60%" stopColor="#3a200d" />
          <stop offset="100%" stopColor="#1a0d05" />
        </radialGradient>
        <radialGradient id={`${id}-muzzle`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fdeed6" />
          <stop offset="100%" stopColor="#f0cf9f" />
        </radialGradient>
        <radialGradient id={`${id}-nose`} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#5a4034" />
          <stop offset="100%" stopColor="#120a06" />
        </radialGradient>
        {[EYE_LEFT_X, EYE_RIGHT_X].map((eyeX) => (
          <clipPath key={eyeX} id={`${id}-eye-${eyeX}`}>
            <ellipse cx={eyeX} cy={EYE_Y} rx={EYE_RX} ry={EYE_RY} />
          </clipPath>
        ))}
      </defs>

      <style>{`
        .puppyHead-${id} {
          transform-origin: 100px 168px;
          animation: puppyTilt-${id} ${isHappy ? '1.4s' : '7s'} ease-in-out infinite;
        }
        @keyframes puppyTilt-${id} {
          0%, 100% { transform: rotate(${isHappy ? -4 : -5}deg); }
          50% { transform: rotate(${isHappy ? 4 : 2}deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .puppyHead-${id} { animation: none; transform: rotate(-4deg); }
        }
      `}</style>

      {/* The whole head tilts: slowly while asking, the way a dog asking for something does, and
          quicker once pleased. */}
      <g className={`puppyHead-${id}`}>
        {/* Ears first so the head overlaps them at the join. Long and low, with the wavy tips of
            a spaniel's, which frame the face and pull the eye down to the eyes. */}
        <path
          d="M58 60 C30 58 16 88 18 124 C19 146 22 166 30 178 Q36 186 42 177 Q47 186 53 176 Q59 183 62 171 C67 150 62 118 68 88 Z"
          fill={`url(#${id}-ear)`}
        />
        <path
          d="M142 60 C170 58 184 88 182 124 C181 146 178 166 170 178 Q164 186 158 177 Q153 186 147 176 Q141 183 138 171 C133 150 138 118 132 88 Z"
          fill={`url(#${id}-ear)`}
        />

        <ellipse cx="100" cy="106" rx="63" ry="60" fill={fur} />

        {/* A tuft on top. Babyish, and it breaks up a head that would otherwise be a plain oval. */}
        <path
          d="M88 50 Q92 36 99 47 Q103 33 110 46 Q115 38 116 50 Z"
          fill={fur}
        />

        {isHappy ? (
          <>
            {/* Brows up and out: nothing to worry about any more. */}
            <path
              d="M54 80 Q70 68 90 72"
              stroke="#9f6334"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M146 80 Q130 68 110 72"
              stroke="#9f6334"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </>
        ) : (
          <>
            {/* Inner brows raised: the actual "puppy eyes" movement, and the one people read as
                appeal rather than as a face at rest. The inner ends sit highest. */}
            <path
              d="M52 86 Q64 70 92 66 Q74 78 52 86 Z"
              fill="#9f6334"
              opacity="0.9"
            />
            <path
              d="M148 86 Q136 70 108 66 Q126 78 148 86 Z"
              fill="#9f6334"
              opacity="0.9"
            />
          </>
        )}

        {/* A little colour in the cheeks, more of it when pleased. */}
        <ellipse
          cx="57"
          cy="134"
          rx="10"
          ry="6"
          fill="#ff8a8a"
          opacity={isHappy ? 0.4 : 0.2}
        />
        <ellipse
          cx="143"
          cy="134"
          rx="10"
          ry="6"
          fill="#ff8a8a"
          opacity={isHappy ? 0.4 : 0.2}
        />

        {[EYE_LEFT_X, EYE_RIGHT_X].map((eyeX) =>
          isHappy ? (
            // Squeezed shut into an upturned arc: the universal drawing of a face that is pleased.
            <path
              key={eyeX}
              d={`M${eyeX - 18} ${EYE_Y + 6} Q${eyeX} ${EYE_Y - 18} ${eyeX + 18} ${EYE_Y + 6}`}
              stroke="#2a170a"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <g key={eyeX}>
              <ellipse
                cx={eyeX}
                cy={EYE_Y}
                rx={EYE_RX}
                ry={EYE_RY}
                fill="#fffdf8"
                stroke="#2a170a"
                strokeWidth="2.4"
              />

              <g clipPath={`url(#${id}-eye-${eyeX})`}>
                <g
                  style={{
                    transform: `translate(${gaze.x}px, ${gaze.y}px)`,
                    transition: 'transform 120ms ease-out',
                  }}
                >
                  <circle
                    cx={eyeX}
                    cy={EYE_Y}
                    r="17.5"
                    fill={`url(#${id}-iris)`}
                  />
                  {/* Wide pupils. Dilation is read as interest and warmth. */}
                  <circle cx={eyeX} cy={EYE_Y} r="10" fill="#0d0603" />
                  {/* Catchlights. Without them the eyes look painted on rather than wet. */}
                  <circle
                    cx={eyeX - 6}
                    cy={EYE_Y - 7}
                    r="6"
                    fill="#ffffff"
                    opacity="0.95"
                  />
                  <circle
                    cx={eyeX + 6.5}
                    cy={EYE_Y + 4}
                    r="2.6"
                    fill="#ffffff"
                    opacity="0.75"
                  />
                  <circle
                    cx={eyeX + 8.5}
                    cy={EYE_Y - 6}
                    r="1.4"
                    fill="#ffffff"
                    opacity="0.6"
                  />
                </g>
              </g>

              {/* A wet line along the lower lid, the shine of eyes about to well up. */}
              <path
                d={`M${eyeX - 14} ${EYE_Y + 17} Q${eyeX} ${EYE_Y + 23} ${eyeX + 14} ${EYE_Y + 17}`}
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />

              {/* The lid drops over the eye rather than the eye disappearing, so a blink stays a
                  blink. Its lashes ride on its lower edge, so the closed eye reads as a closed eye. */}
              <g
                style={{
                  transformOrigin: `${eyeX}px ${EYE_Y - EYE_RY - 1.8}px`,
                  transform: `scaleY(${isBlinking ? 1 : 0})`,
                  transition: `transform ${BLINK_DURATION_MS / 2}ms ease-in-out`,
                }}
              >
                <ellipse
                  cx={eyeX}
                  cy={EYE_Y}
                  rx={EYE_RX + 1.8}
                  ry={EYE_RY + 1.8}
                  fill={fur}
                />
                <path
                  d={`M${eyeX - 15} ${EYE_Y + 10} Q${eyeX} ${EYE_Y + 19} ${eyeX + 15} ${EYE_Y + 10}`}
                  stroke="#3a2414"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>
          )
        )}

        <ellipse
          cx="100"
          cy="147"
          rx="31"
          ry="22"
          fill={`url(#${id}-muzzle)`}
        />
        <path
          d="M84 132 Q100 123 116 132 Q118 142 100 150 Q82 142 84 132 Z"
          fill={`url(#${id}-nose)`}
        />
        <ellipse
          cx="94"
          cy="131"
          rx="5"
          ry="2.8"
          fill="#ffffff"
          opacity="0.5"
        />

        {isHappy ? (
          <>
            {/* An open grin with the tongue lolling out of it. */}
            <path
              d="M82 152 Q100 176 118 152 Q100 160 82 152 Z"
              fill="#4a1f1a"
            />
            <path d="M91 158 Q100 182 109 158 Z" fill="#f27f96" />
            <path
              d="M100 161 v12"
              stroke="#d9566f"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Mouth: kept small and closed. An open smile reads as cheerful, which is the wrong
                register for asking. */}
            <path
              d="M100 150 L100 155"
              stroke="#2b1a10"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M100 155 Q94 161 88 157"
              stroke="#2b1a10"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100 155 Q106 161 112 157"
              stroke="#2b1a10"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
      </g>
    </svg>
  );
}
