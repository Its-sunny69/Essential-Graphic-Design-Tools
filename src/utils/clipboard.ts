import { toast } from "react-hot-toast";

export const copyToClipboard = async (
  text: string,
  options?: {
    onSuccess?: () => void;
    onError?: (err: Error) => void;
  }
) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use native API if available
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for mobile or insecure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!success) {
        throw new Error("Fallback copy failed");
      }
    }

    toast.success("Copied to clipboard!");
    options?.onSuccess?.();
  } catch (err) {
    toast.error("Failed to copy!");
    options?.onError?.(err as Error);
  }
};

