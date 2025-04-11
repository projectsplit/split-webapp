import { ExpenseProps } from "../../interfaces";
import { StyledExpense } from "./Expense.styled";
import { MdLocationOn } from "react-icons/md";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { TimeOnly } from "../../helpers/timeHelpers";
import Pill from "../Pill/Pill";

const Expense = ({
  timeZoneId,
  onClick,
  amount,
  currency,
  description,
  location,
  occurred,
  userAmount,
  labels,
}: ExpenseProps) => {

  const labelColors: { [key: string]: string } = {
    color1: "#9dc3ff",
    color2: "#ff9baf",
    color3: "#ede478",
    color4: "#6ed7b9",
    color5: "#ffa1ef",
    color6: "#c2a7ff",
    color7: "#81e1fe",
    color8: "#ffb79a"
  };
  
  return (
    <StyledExpense onClick={onClick} userAmount={userAmount}>
      <div className="topRow">
        {/* <div className="locationIcon">{expense.location &&<IoLocationOutline />}</div> */}
        {location ? <MdLocationOn className="locationIcon" /> : <div />}
        <strong className="time">{TimeOnly(occurred, timeZoneId)}</strong>
      </div>

      <div className="descrAndAmounts">
        <div className="descr">
          {description ? (
            <span>{description}</span>
          ) : location ? (
            <span>{location.google?.name}</span>
          ) : (
            ""
          )}
        </div>
        <div className="amounts">
          <div className="groupTotal">
            {amount === 0 ? "" : <div className="legendGroup" />}
            <div className="amount">
              {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
            </div>
          </div>

          <div className="userShare">
            {userAmount === 0 ? "" : <div className="legendUser" />}
            <div className="amount">
              {userAmount === 0
                ? ""
                : displayCurrencyAndAmount(
                  Math.abs(userAmount).toString(),
                  currency
                )}
            </div>
          </div>
        </div>
      </div>

      {labels.length > 0 ? (
        <div className="labels">
          {labels.map((l, index) => {
            return (
              <Pill
                textColor={"#000000c8"}
                key={index}
                title={l.text}
                color={labelColors[l.color]}
                closeButton={false}
                fontSize="14px" />
            );
          })}
        </div>
      ) : null}
    </StyledExpense>
  );
};

// const Label = ({ backgroundColor }: LabelProps) => {
//   return <StyledLabel backgroundColor={backgroundColor} />;
// };

export default Expense;

// const chromeColors: HexColor[] = ["#84b4ff", "#ff829b", "#e9dd56", "#4acda8", "#ff89eb", "#b391ff", "#62d9fe", "#ffa581"]
// const labelColors2: HexColor[] = ['#90bcff', '#ff8fa5', '#ebe067', '#5cd2b1', '#ff95ed', '#bb9cff', '#72ddfe', '#ffae8e']
// const labelColors: HexColor[] = ['#9dc3ff', '#ff9baf', '#ede478', '#6ed7b9', '#ffa1ef', '#c2a7ff', '#81e1fe', '#ffb79a']

// console.log(" ")
// console.log(chromeColors)
// console.log(chromeColors.map(x => lightenHexColor(x, 0.2)))

type HexColor = `#${string}`;

function lightenHexColor(hex: HexColor, amount: number = 0.15): HexColor {

  const hexString = hex.replace('#', '');

  // Convert to RGB
  let r = parseInt(hexString.slice(0, 2), 16);
  let g = parseInt(hexString.slice(2, 4), 16);
  let b = parseInt(hexString.slice(4, 6), 16);

  // Increase each value, keeping between 0-255
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));

  // Convert back to hex
  const lala: HexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  return lala;
}

function paleColorWithContrast(hue: number, bgHex: HexColor): HexColor {
  const bgLum = hexToLuminance(bgHex);
  // Target luminance for 4.5:1 contrast
  const targetLum = bgLum * 4.5 + 0.05 * (4.5 - 1);
  // Clamp lightness to stay pale (0.7-0.95 range)
  const lightness = Math.min(0.95, Math.max(0.7, targetLum));
  const color = `hsl(${hue}, 30%, ${Math.floor(lightness * 100)}%)`;
  return rgbToHex(color);
}

// Hex to luminance
function hexToLuminance(hex: HexColor): number {
  const { r, g, b } = hexToRGB(hex);
  return 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
}

// Hex to RGB
function hexToRGB(hex: HexColor): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// HSL to RGB to Hex
function rgbToHex(hsl: string): HexColor {
  const { r, g, b } = hslToRGB(hsl);
  return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}` as HexColor;
}

// HSL to RGB
function hslToRGB(hsl: string): { r: number; g: number; b: number } {
  const [, h, s, l] = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)!.map(Number);
  const c = (1 - Math.abs(2 * l / 100 - 1)) * (s / 100);
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l / 100 - c / 2;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else[r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function getDarkerTextColor(bgHex: HexColor): HexColor {
  // Get the luminance of the background color
  const bgLum = hexToLuminance(bgHex);

  // Calculate the target luminance for the text color to achieve 4.5:1 contrast
  // For a darker color, we need Ltext < Lbg, so solve: (Lbg + 0.05) / (Ltext + 0.05) = 4.5
  const targetLum = (bgLum + 0.05) / 4.5 - 0.05;

  // Clamp lightness to ensure it’s dark enough (0 to 0.3 range for "darker" text)
  const lightness = Math.max(0, Math.min(0.3, targetLum));

  // Extract hue from the background color (convert hex to HSL)
  const { h } = hexToHSL(bgHex);

  // Use the same hue, moderate saturation (e.g., 50%), and the calculated lightness
  const textColor = `hsl(${h}, 50%, ${Math.floor(lightness * 100)}%)`;
  return rgbToHex(textColor);
}

// Helper: Convert Hex to HSL
function hexToHSL(hex: HexColor): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRGB(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rnd(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const splitAmount = (total: number, splits: number, maxDecimals: number): number[] => {
  if (splits <= 0 || !Number.isInteger(splits) || maxDecimals < 0 || !Number.isInteger(maxDecimals)) return [];

  const multiplier = Math.pow(10, maxDecimals);
  const totalCents = Math.round(total * multiplier);
  const baseCents = Math.floor(totalCents / splits);
  const remainderCents = totalCents - baseCents * splits;

  const result = Array(splits).fill(baseCents);
  for (let i = 0; i < remainderCents; i++) {
    result[i]++;
  }

  return result.map(val => Number((val / multiplier).toFixed(maxDecimals)));
}
