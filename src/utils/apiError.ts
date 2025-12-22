export function extractErrorMessage(err: any): string {
  const data = err?.response?.data;

  if (data) {
    // // Backend validation
    // if (typeof data.error === "string" && data.error.trim()) {
    //   return data.error;
    // }

    // General backend message
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }
  }

  // Fallback JS error
  if (err?.message) return err.message;

  return "Something went wrong. Please try again.";
}
