import { toast } from "sonner";

/**
 * Centrally handles API errors by logging them to the console and
 * displaying a rich error toaster alert to the user.
 */
export function handleError(error: any): string {
  console.error("API error caught:", error);

  // Handle RTK Query nested error payloads or generic error structures
  const errorPayload = error?.data || error;
  const message =
    errorPayload?.message ||
    error?.message ||
    "Something went wrong. Please check your connection and try again.";

  toast.error(message);
  return message;
}
