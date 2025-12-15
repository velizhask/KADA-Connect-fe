import KADALOGO from "@/assets/logo/kada-logo.png";

export const LoadingSpinner = ({
  text = "Loading...",
}: {
  text?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] w-full text-center">
      <img
        src={KADALOGO}
        alt="KADA Logo"
        className="
          w-40 mb-4
          animate-[fadePulse_1.6s_ease-in-out_infinite]
        "
      />

      <p className="text-base md:text-lg font-medium text-muted-foreground">
        {text}
      </p>
    </div>
  );
};
