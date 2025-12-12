import { Button } from "@/components/ui/button";
import { termsOfService } from "@/assets/docs/terms-of-service";
export default function TermsModal({
  onClose,
  onAgree,
}: {
  onClose: () => void;
  onAgree: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold">KADA Connect Terms of Service</h2>

        <div
          className="h-96 overflow-y-auto border p-4 rounded text-sm leading-relaxed space-y-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: termsOfService }}
        />

        <div className="flex justify-start gap-3 mt-4">
          <Button
            className="cursor-pointer"
            onClick={() => {
              onAgree();
              onClose();
            }}
          >
            Agree
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer text-primary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
