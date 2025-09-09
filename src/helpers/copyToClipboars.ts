export function copyToClipboard(invitationCode:string, baseUrl:string) {
  if (!invitationCode) return;

  const formattedLink = `${baseUrl}${invitationCode}`;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(formattedLink)
      .catch((err) => console.error("Failed to copy: ", err));
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = formattedLink;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed: ", err);
    }
    document.body.removeChild(textarea);
  }
}