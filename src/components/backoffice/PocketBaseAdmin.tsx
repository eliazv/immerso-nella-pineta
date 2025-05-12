import React, { useEffect, useState } from "react";

// Componente che integra l'interfaccia admin di PocketBase in un iframe
const PocketBaseAdmin = () => {
  const [iframeHeight, setIframeHeight] = useState("800px");
  const [isLoading, setIsLoading] = useState(true);
  const pocketBaseUrl = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";

  // Regola l'altezza in base alla finestra
  useEffect(() => {
    const updateHeight = () => {
      const minHeight = 800;
      const height = Math.max(window.innerHeight - 200, minHeight);
      setIframeHeight(`${height}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="w-full pb-4">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      <iframe
        src={`${pocketBaseUrl}/_/`}
        className="w-full border-0 rounded-lg"
        style={{ height: iframeHeight, display: isLoading ? "none" : "block" }}
        onLoad={() => setIsLoading(false)}
        title="PocketBase Admin"
      />
    </div>
  );
};

export default PocketBaseAdmin;
