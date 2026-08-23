export default async function copyText(text: string | null) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);

    alert("Tex copied to clipboard.");
  } catch (e) {
    alert("Failed to copy text.");
  }
}
