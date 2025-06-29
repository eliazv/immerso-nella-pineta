// Rileva se l'app è in ambiente Capacitor
export function isCapacitorApp() {
  return !!(window as any).Capacitor;
}
