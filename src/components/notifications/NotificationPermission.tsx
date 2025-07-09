import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff, Smartphone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { notificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";

const NotificationPermission: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isRequesting, setIsRequesting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = () => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  };

  const requestPermission = async () => {
    setIsRequesting(true);
    try {
      const granted = await notificationService.requestPermission();
      checkPermissionStatus();
      
      if (granted) {
        toast({
          title: "Notifiche attivate",
          description: "Riceverai notifiche per check-in e check-out",
        });
        
        // Show a test notification
        await notificationService.showNotification({
          title: "RentPilot - Notifiche attive",
          body: "Riceverai notifiche per check-in e check-out degli ospiti",
          tag: "test-notification"
        });
      } else {
        toast({
          title: "Permesso negato",
          description: "Non potrai ricevere notifiche per check-in/check-out",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Errore",
        description: "Errore nella richiesta dei permessi di notifica",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case "granted":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
          badge: <Badge variant="default" className="bg-green-100 text-green-800">Attive</Badge>,
          description: "Le notifiche sono attive. Riceverai avvisi per check-in e check-out.",
          showButton: false
        };
      case "denied":
        return {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          badge: <Badge variant="destructive">Bloccate</Badge>,
          description: "Le notifiche sono bloccate. Abilita le notifiche nelle impostazioni del browser.",
          showButton: false
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
          badge: <Badge variant="secondary">Non configurate</Badge>,
          description: "Attiva le notifiche per ricevere avvisi di check-in e check-out.",
          showButton: true
        };
    }
  };

  const status = getPermissionStatus();

  if (!("Notification" in window)) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <BellOff className="h-5 w-5" />
            Notifiche non supportate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700">
            Il tuo browser non supporta le notifiche push.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Notifiche Check-in/Check-out
          {status.badge}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {status.icon}
          {status.description}
        </CardDescription>
      </CardHeader>
      {status.showButton && (
        <CardContent>
          <Button 
            onClick={requestPermission} 
            disabled={isRequesting}
            className="w-full"
          >
            <Bell className="h-4 w-4 mr-2" />
            {isRequesting ? "Richiesta in corso..." : "Attiva Notifiche"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Riceverai una notifica il giorno del check-in e check-out degli ospiti alle 9:00.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default NotificationPermission;
