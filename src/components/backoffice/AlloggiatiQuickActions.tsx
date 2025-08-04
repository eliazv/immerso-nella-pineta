import React, { useState } from "react";
import { Copy, Link, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export const AlloggiatiQuickActions: React.FC = () => {
  const [customLink, setCustomLink] = useState("");

  const generateAlloggiatiLink = (withData?: boolean) => {
    const baseUrl = window.location.origin;
    let url = `${baseUrl}/alloggiati`;

    if (withData && customLink) {
      url += `?data=${encodeURIComponent(customLink)}`;
    }

    return url;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiato!",
        description: `${label} copiato negli appunti.`,
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile copiare negli appunti.",
        variant: "destructive",
      });
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5" />
          Raccolta Documenti
        </CardTitle>
        <CardDescription>
          Invia questo link agli ospiti per la raccolta dei loro documenti per
          la comunicazione alla questura. I dati sno salvati conformi al formato
          AlloggiatiWeb.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Link Generation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={generateAlloggiatiLink()}
              readOnly
              className="flex-1 font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyToClipboard(generateAlloggiatiLink(), "Link base")
              }
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openInNewTab(generateAlloggiatiLink())}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="customLink">Link con dati condivisi (opzionale)</Label>
            <div className="flex gap-2">
              <Input
                id="customLink"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                placeholder="ID dati condivisi (es. abc123)"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateAlloggiatiLink(true), 'Link con dati')}
                disabled={!customLink}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Inserisci l'ID di dati precedentemente condivisi per pre-compilare il form.
            </p>
          </div> */}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {/* <Button
              variant="outline"
              onClick={() => openInNewTab("/alloggiati")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizza Pagina
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                copyToClipboard(generateAlloggiatiLink(), "Link alloggiati")
              }
            >
              <Copy className="w-4 h-4 mr-2" />
              Copia Link
            </Button> */}
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://alloggiatiweb.poliziadistato.it", "_blank")
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Polizia di Stato
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
