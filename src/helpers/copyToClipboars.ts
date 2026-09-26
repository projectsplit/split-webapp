export async function copyToClipboard(
  invitationCode: string,
  baseUrl: string
): Promise<boolean> {
  if (!invitationCode) return false;

  const formattedLink = `${baseUrl}${invitationCode}`;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(formattedLink);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = formattedLink;
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed: ', err);
  }
  document.body.removeChild(textarea);
  return copied;
}
