import { isNativeApp } from '@/helpers/platform';
import { bytesToBase64 } from './base64';
import { ExportFile } from './exportModel';

/**
 * Hands the finished file to the person. On the web that is a download; in the app it is the
 * system share sheet, since a WebView cannot download a blob and the sheet is how Android lets
 * someone save to Files or Drive, or send it on, in one step.
 */
export const saveFile = async (file: ExportFile): Promise<void> => {
  if (isNativeApp()) {
    await shareNatively(file);
    return;
  }

  const blob = new Blob([file.bytes], { type: file.mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Not revoked straight away: Safari only starts the download after the click has returned.
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
};

const shareNatively = async (file: ExportFile): Promise<void> => {
  const [{ Filesystem, Directory }, { Share }] = await Promise.all([
    import('@capacitor/filesystem'),
    import('@capacitor/share'),
  ]);

  // The cache directory is the one the app's FileProvider is allowed to hand out, and the system
  // may clear it later, which is fine: the file has been shared on by then or was not wanted.
  const { uri } = await Filesystem.writeFile({
    path: file.name,
    data: bytesToBase64(file.bytes),
    directory: Directory.Cache,
  });

  try {
    await Share.share({
      title: file.name,
      url: uri,
      dialogTitle: 'Save or send',
    });
  } catch (error) {
    // Closing the sheet without choosing anything is a change of mind, not a failure.
    if (isShareCancellation(error)) return;
    throw error;
  }
};

const isShareCancellation = (error: unknown): boolean =>
  error instanceof Error && /cancel/i.test(error.message);
