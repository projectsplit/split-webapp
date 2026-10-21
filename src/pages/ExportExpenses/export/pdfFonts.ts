import { bytesToBase64 } from './base64';

/**
 * The PDF embeds its own typeface rather than using the built-in Helvetica, because that one only
 * knows Latin-1: a description in Greek, a Polish name or a rupee sign would come out as boxes.
 * Noto Sans, cut down to Latin, Greek, Cyrillic and the common symbols, lives in public/fonts and
 * is fetched the first time a PDF is made.
 */
export type PdfFonts = {
  /** Base64 TTF. */
  regular: string;
  bold: string;
};

let pending: Promise<PdfFonts> | null = null;

export const loadPdfFonts = (): Promise<PdfFonts> => {
  if (!pending) {
    pending = Promise.all([
      fetchAsBase64(fontUrl('NotoSans-Regular.ttf')),
      fetchAsBase64(fontUrl('NotoSans-SemiBold.ttf')),
    ])
      .then(([regular, bold]) => ({ regular, bold }))
      .catch((error) => {
        // So the next attempt fetches again rather than failing on a cached rejection.
        pending = null;
        throw error;
      });
  }

  return pending;
};

const fontUrl = (file: string) => `${import.meta.env.BASE_URL}fonts/${file}`;

const fetchAsBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not load ${url} (${response.status})`);
  }

  return bytesToBase64(new Uint8Array(await response.arrayBuffer()));
};
