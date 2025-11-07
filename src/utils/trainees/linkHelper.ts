import { toast } from "sonner";

export const handleSafeLinkClick = (url?: string | null, label?: string) => {
  if (!url || url.trim() === "" || url.trim() === "-") {
    toast.error(`${label || "This link"} is not available.`);
    return;
  }

  const links = url
    .split(/[\s,&]+/)
    .map((l) => l.trim())
    .filter(Boolean);

  links.forEach((raw) => {
    let finalUrl = raw.replace(/^www\./i, "");

    if (/linkedin/i.test(label || "")) {
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = finalUrl.startsWith("linkedin.com")
          ? `https://${finalUrl}`
          : `https://linkedin.com/in/${finalUrl}`;
      }
    } else if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    try {
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } catch {
      toast.error(`Unable to open ${label || "the link"}.`);
    }
  });
};
