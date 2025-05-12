import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import PocketBaseAdmin from "@/components/backoffice/PocketBaseAdmin";
import PocketBaseManager from "@/components/backoffice/PocketBaseManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DatabaseAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Verifica l'autenticazione quando la pagina viene caricata
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        // Se l'utente non è autenticato, reindirizza alla dashboard
        navigate("/admin");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-serif font-medium">
              Amministrazione Database
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-pine-dark text-white rounded-md hover:bg-pine-dark/90 flex items-center"
            >
              ← Torna indietro
            </button>
          </div>

          <Tabs defaultValue="manager">
            <TabsList className="mb-4">
              <TabsTrigger value="manager">Gestione Database</TabsTrigger>
              <TabsTrigger value="admin">Admin PocketBase</TabsTrigger>
            </TabsList>

            <TabsContent value="manager" className="space-y-4">
              <PocketBaseManager />
            </TabsContent>

            <TabsContent value="admin">
              <div className="bg-white rounded-lg shadow-md">
                <PocketBaseAdmin />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DatabaseAdmin;
