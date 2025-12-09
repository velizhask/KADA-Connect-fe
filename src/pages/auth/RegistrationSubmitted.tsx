import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import KADALOGO from "@/assets/logo/kadalogo.png";

export default function RegistrationSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-10 text-center shadow-none border-0 rounded-3xl">

        {/* LOGO */}
        <div className="flex items-center justify-center mb-4">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-2">Submitted!</h2>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Please wait while we validate your account. We’ll send you an email once your account is ready.
        </p>

        {/* BUTTON */}
        <Button
          onClick={() => navigate("/login")}
          className="w-full h-12 font-medium bg-primary text-white hover:bg-primary/80"
        >
          Back to login
        </Button>
      </Card>
    </div>
  );
}
