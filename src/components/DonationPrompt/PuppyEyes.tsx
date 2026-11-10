import puppy from './puppy.webp';
import puppyStill from './puppy-still.webp';

/**
 * The puppy above the ask: a long-haired puppy looking up at whoever is holding the phone, its
 * big nose closest to them, wagging its tail and blinking now and then.
 *
 * It replaced a drawn head whose pleading face read as close to tears. This one looks up at you
 * the same way, as a real puppy does.
 *
 * The white background was cut away for the dark card. The blink stretches the fur above each eye
 * down over it, the way an upper lid closes, and the tail bends from its root with the tip trailing
 * a little. It is an animated WebP: a 3.2 s loop of 50 ms frames, the tail wagging every 0.4 s and
 * one blink of about 350 ms. The same puppy stays on the thank-you, so the puppy that asked is the
 * one that is thanked.
 */

/** The clip is 440 by 536; this keeps its proportions. */
const WIDTH = 160;
const HEIGHT = 195;

export default function PuppyEyes() {
  return (
    <picture>
      {/* An animated image ignores the reduced-motion setting by itself, so anyone who has asked
          for less motion gets the first frame, still. */}
      <source srcSet={puppyStill} media="(prefers-reduced-motion: reduce)" />
      <img
        src={puppy}
        width={WIDTH}
        height={HEIGHT}
        // Decorative. The form says everything in text, and a screen reader announcing a picture
        // of a dog in the middle of a request for money is noise.
        alt=""
        draggable={false}
        // Nothing to tap. A long press on an image would otherwise offer to save it.
        style={{ display: 'block', pointerEvents: 'none' }}
      />
    </picture>
  );
}
