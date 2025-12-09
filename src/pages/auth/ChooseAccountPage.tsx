import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";

export default function ChooseAccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<"company" | "trainee">(
    "trainee"
  );

  const handleContinue = () => {
    setLoading(true);
    if (selectedType === "company") {
      navigate("/register/company");
    } else {
      navigate("/register/trainee");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-4xl p-10 text-center shadow-none border-0 space-y-6">
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          What are you?
        </h2>

        {/* CHECKBOX OPTIONS */}
        <div className="flex justify-center gap-6 w-full">
          {/* Company */}
          <button
            onClick={() => setSelectedType("company")}
            className={`
      px-8 py-6 rounded-2xl border-2 flex gap-4 min-w-[300px] cursor-pointer
      transition-all text-left items-center
      ${
        selectedType === "company"
          ? "border-purple-500 bg-purple-50"
          : "border-gray-300 bg-white"
      }
    `}
          >
            {/* Checkbox */}
            <div
              className={`
        w-6 h-6 rounded-md border-2 flex items-center justify-center
        ${
          selectedType === "company"
            ? "bg-purple-600 border-purple-600"
            : "border-gray-400"
        }
      `}
            >
              {selectedType === "company" && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Company</h3>
              <p className="text-sm text-gray-600">
                I'm a company looking for talents
              </p>
            </div>
          </button>

          {/* Trainee */}
          <button
            onClick={() => setSelectedType("trainee")}
            className={`
      px-8 py-6 rounded-2xl border-2 flex gap-4 min-w-[300px] cursor-pointer
      transition-all text-left items-center
      ${
        selectedType === "trainee"
          ? "border-purple-500 bg-purple-50"
          : "border-gray-300 bg-white"
      }
    `}
          >
            <div
              className={`
        w-6 h-6 rounded-md border-2 flex items-center justify-center
        ${
          selectedType === "trainee"
            ? "bg-purple-600 border-purple-600"
            : "border-gray-400"
        }
      `}
            >
              {selectedType === "trainee" && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Trainee</h3>
              <p className="text-sm text-gray-600">
                I'm a trainee finding opportunities
              </p>
            </div>
          </button>
        </div>

        {/* CONTINUE BUTTON */}
        <Button
          onClick={handleContinue}
          disabled={loading}
          className="cursor-pointer w-40 h-12 mb-0 text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white mx-auto"
        >
          Continue
        </Button>

        {/* LOGIN LINK */}
        <div className="mt-0 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 decoration-blue-600 underline-offset-2 hover:underline font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
