import { useState, useEffect } from "react";
import { getDashboardStats } from "@/services/dashboardService";

export const useDashboardData = () => {
  const [occupancyData, setOccupancyData] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const dashboardStatsData = await getDashboardStats(
        "all",
        new Date().getFullYear()
      );
      setDashboardStats(dashboardStatsData.stats);
      setOccupancyData(dashboardStatsData.stats.occupancy);
    } catch (error) {
      console.error("Errore nel caricamento dati occupazione:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Listener per ricaricare i dati quando cambiano prenotazioni o appartamenti
    const handleDataUpdate = () => {
      loadDashboardData();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadDashboardData();
      }
    };

    const handleFocus = () => {
      loadDashboardData();
    };

    // Eventi personalizzati per aggiornamenti
    window.addEventListener("apartmentsUpdated", handleDataUpdate);
    window.addEventListener("bookingsUpdated", handleDataUpdate);

    // Eventi di visibilità
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("apartmentsUpdated", handleDataUpdate);
      window.removeEventListener("bookingsUpdated", handleDataUpdate);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return {
    occupancyData,
    dashboardStats,
    isLoading,
    loadDashboardData,
  };
};
