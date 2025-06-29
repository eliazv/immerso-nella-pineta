import React from "react";
import FirebaseSecurity from "@/components/FirebaseSecurity";

/**
 * Pagina per la configurazione della sicurezza Firebase
 */
const Security: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Sicurezza Database
        </h1>
        <p className="text-gray-600">
          Configura località e regole di sicurezza per il database Firebase
        </p>
      </div>

      <FirebaseSecurity />
    </div>
  );
};

export default Security;
