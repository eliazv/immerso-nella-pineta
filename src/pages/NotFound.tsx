
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pine-light/50 to-sea-light/50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl border border-border p-8 text-center shadow-sm">
        <h1 className="font-serif text-5xl font-medium mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Pagina non trovata</p>
        <p className="text-muted-foreground mb-8">
          La pagina che stai cercando potrebbe essere stata rimossa o non è temporaneamente disponibile.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
