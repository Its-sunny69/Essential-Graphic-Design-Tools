import { toast } from "react-hot-toast";

export const copyToClipboard = async (
  text: string,
  options?: {
    onSuccess?: () => void;
    onError?: (err: Error) => void;
  }
) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");

    if (options?.onSuccess) options.onSuccess();
  } catch (err) {
    toast.error("Failed to copy!");
    if (options?.onError) options.onError(err as Error);
  }
};
