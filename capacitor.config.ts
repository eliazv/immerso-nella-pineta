import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.immerso.backoffice",
  appName: "backoffice-app",
  webDir: "dist",
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#ffffff", // Status bar bianca opaca
      overlaysWebView: false, // FONDAMENTALE: status bar separata
    },
  },
};

export default config;
