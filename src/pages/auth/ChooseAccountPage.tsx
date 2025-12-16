import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";

export default function ChooseAccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "company" | "trainee" | null
  >(null);

  const handleContinue = () => {
    if (!selectedType) return;
    setLoading(true);

    navigate(
      selectedType === "company"
        ? "/register/company"
        : "/register/trainee"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-4xl p-6 md:p-10 text-center border-0 shadow-none space-y-6">
        {/* LOGO */}
        <div className="flex justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl mb-0 font-semibold">
          What are you?
        </h2>

        {/* OPTIONS */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mb-0">
          {/* COMPANY */}
          <button
            type="button"
            onClick={() => setSelectedType("company")}
            className={`
              w-full md:w-1/2
              px-6 md:px-8 py-5 md:py-6
              rounded-2xl border-2
              flex gap-4 items-center text-left
              transition-all
              cursor-pointer
              ${
                selectedType === "company"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }
            `}
          >
            {/* CHECKBOX */}
            <div
              className={`
                w-6 h-6 rounded-md border-2
                flex items-center justify-center
                
                ${
                  selectedType === "company"
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                }
              `}
            >
              {selectedType === "company" && (
                <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
              )}
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-base md:text-lg font-semibold">
                Company
              </h3>
              <p className="text-sm text-muted-foreground">
                I'm a company looking for talents
              </p>
            </div>
          </button>

          {/* TRAINEE */}
          <button
            type="button"
            onClick={() => setSelectedType("trainee")}
            className={`
              w-full md:w-1/2
              px-6 md:px-8 py-5 md:py-6
              rounded-2xl border-2
              flex gap-4 items-center text-left
              transition-all
              cursor-pointer

              ${
                selectedType === "trainee"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }
            `}
          >
            <div
              className={`
                w-6 h-6 rounded-md border-2
                flex items-center justify-center
                ${
                  selectedType === "trainee"
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                }
              `}
            >
              {selectedType === "trainee" && (
                <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
              )}
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold">
                Trainee
              </h3>
              <p className="text-sm text-muted-foreground">
                I'm a trainee finding opportunities
              </p>
            </div>
          </button>
        </div>

        {/* CONTINUE BUTTON */}
        <Button
          onClick={handleContinue}
          disabled={loading || !selectedType}
          className={`
              cursor-pointer
              mb-0
            w-full md:w-40 h-12 mx-auto text-base md:text-lg
            ${
              !selectedType
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }
          `}
        >
          Continue
        </Button>

        {/* LOGIN LINK */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer text-primary hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
