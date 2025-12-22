import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecoveryHandlerRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    // Supabase recovery link
    if (hash && hash.includes("type=recovery")) {
      navigate(`/reset-password${hash}`, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RecoveryHandlerRoute;