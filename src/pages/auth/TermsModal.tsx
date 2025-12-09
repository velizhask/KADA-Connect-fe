import { Button } from "@/components/ui/button";

export default function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4 shadow-lg">

        <h2 className="text-2xl font-bold">KADA Connect Terms of Service</h2>

        <div className="h-96 overflow-y-auto border p-4 rounded text-sm leading-relaxed space-y-4">

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
          </p>

          <p>
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
          </p>

          <p>
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.
            Praesent egestas leo in pede. Praesent blandit odio eu enim.
          </p>

          <p>
            Suspendisse potenti. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue,
            eu vulputate magna eros eu erat. Aliquam erat volutpat.
          </p>

          <p>
            Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
            Phasellus ultrices nulla quis nibh. Quisque a lectus.
          </p>

        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="cursor-pointer text-primary"  onClick={onClose}>
            Close
          </Button>
          <Button className="cursor-pointer"  onClick={onClose}>
            Agree
          </Button>
        </div>
      </div>
    </div>
  );
}
