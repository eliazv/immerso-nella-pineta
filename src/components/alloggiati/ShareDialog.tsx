import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Share2, 
  Mail, 
  Link, 
  Download, 
  Copy, 
  CheckCircle,
  ExternalLink,
  FileSpreadsheet
} from 'lucide-react';
import { AlloggiatiFormData } from '@/types/alloggiati';
import { StorageService } from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  formData: AlloggiatiFormData;
  children: React.ReactNode;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ formData, children }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string>('');
  const [emailData, setEmailData] = useState({
    recipient: '',
    senderName: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const generateShareLink = () => {
    try {
      const link = StorageService.generateShareableLink(formData);
      setShareLink(link);
      toast({
        title: "Link generato",
        description: "Il link di condivisione è stato creato",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile generare il link di condivisione",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      toast({
        title: "Link copiato",
        description: "Il link è stato copiato negli appunti",
      });
      
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile copiare il link",
        variant: "destructive"
      });
    }
  };

  const sendEmail = async () => {
    if (!emailData.recipient.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await StorageService.sendViaEmail(
        formData,
        emailData.recipient,
        emailData.senderName
      );
      
      if (success) {
        toast({
          title: "Email inviata",
          description: "La schedina è stata inviata via email",
        });
        setEmailData({ recipient: '', senderName: '', message: '' });
      } else {
        throw new Error('Invio fallito');
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile inviare l'email. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    try {
      StorageService.downloadCSV(formData);
      toast({
        title: "Download avviato",
        description: "Il file CSV è stato scaricato",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile scaricare il file CSV",
        variant: "destructive"
      });
    }
  };

  const openGoogleSheets = () => {
    // Apre Google Sheets per creare un nuovo foglio
    window.open('https://sheets.google.com', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Condividi e Salva Dati
          </DialogTitle>
          <DialogDescription>
            Scegli come condividere o salvare i dati degli ospiti
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
          </TabsList>

          {/* Tab Link Condivisibile */}
          <TabsContent value="link" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Genera Link Condivisibile</h4>
              <p className="text-sm text-gray-600 mb-4">
                Crea un link temporaneo (valido 7 giorni) per condividere i dati
              </p>
              
              {!shareLink ? (
                <Button onClick={generateShareLink} className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  Genera Link
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input 
                      value={shareLink} 
                      readOnly 
                      className="flex-1"
                    />
                    <Button 
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {linkCopied ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      Il link scadrà automaticamente dopo 7 giorni per motivi di sicurezza.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab Email */}
          <TabsContent value="email" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Invia via Email</h4>
              <p className="text-sm text-gray-600 mb-4">
                Invia la schedina direttamente via email
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="recipient">Email destinatario *</Label>
                  <Input
                    id="recipient"
                    type="email"
                    value={emailData.recipient}
                    onChange={(e) => setEmailData(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="gestore@hotel.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="senderName">Il tuo nome (opzionale)</Label>
                  <Input
                    id="senderName"
                    value={emailData.senderName}
                    onChange={(e) => setEmailData(prev => ({ ...prev, senderName: e.target.value }))}
                    placeholder="Mario Rossi"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Messaggio aggiuntivo (opzionale)</Label>
                  <Textarea
                    id="message"
                    value={emailData.message}
                    onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Messaggio personalizzato..."
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={sendEmail} 
                  disabled={isLoading || !emailData.recipient.trim()}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isLoading ? 'Invio in corso...' : 'Invia Email'}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Tab Export */}
          <TabsContent value="export" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Esporta Dati</h4>
              <p className="text-sm text-gray-600 mb-4">
                Scarica i dati in diversi formati
              </p>
              
              <div className="space-y-3">
                <Button onClick={downloadCSV} variant="outline" className="w-full justify-start">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Scarica CSV (Excel)
                </Button>
                
                <Alert>
                  <AlertDescription>
                    Il file CSV può essere aperto con Excel o Google Sheets per ulteriori elaborazioni.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          {/* Tab Cloud */}
          <TabsContent value="cloud" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Salvataggio Cloud</h4>
              <p className="text-sm text-gray-600 mb-4">
                Salva i dati su servizi cloud
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={openGoogleSheets} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apri Google Sheets
                </Button>
                
                <Alert>
                  <AlertDescription>
                    <strong>Istruzioni:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Scarica prima il file CSV</li>
                      <li>Apri Google Sheets</li>
                      <li>Importa il file CSV nel foglio</li>
                      <li>Condividi il foglio con chi necessario</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
