import React, { useState, useEffect } from 'react';
import { Copy, Link, Settings, ExternalLink, Eye, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

interface AlloggiatiConfig {
  propertyName: string;
  propertyAddress: string;
  propertyCity: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  customWelcomeMessage: string;
  showPropertyInfo: boolean;
  allowGuestEdit: boolean;
  requireAllFields: boolean;
  emailNotifications: boolean;
  customCss: string;
}

const DEFAULT_CONFIG: AlloggiatiConfig = {
  propertyName: 'Immerso nella Pineta',
  propertyAddress: 'Viale dei Mille, 123',
  propertyCity: 'Pinarella di Cervia (RA)',
  ownerName: 'Proprietario',
  ownerEmail: 'info@immersonellapineta.it',
  ownerPhone: '+39 123 456 7890',
  customWelcomeMessage: 'Benvenuti nel nostro alloggio! Vi preghiamo di compilare la registrazione ospiti.',
  showPropertyInfo: true,
  allowGuestEdit: true,
  requireAllFields: true,
  emailNotifications: true,
  customCss: ''
};

export const AlloggiatiManager: React.FC = () => {
  const [config, setConfig] = useState<AlloggiatiConfig>(DEFAULT_CONFIG);
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState<AlloggiatiConfig>(DEFAULT_CONFIG);
  const [customLink, setCustomLink] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('alloggiati_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        setEditConfig({ ...DEFAULT_CONFIG, ...parsed });
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const saveConfig = () => {
    try {
      localStorage.setItem('alloggiati_config', JSON.stringify(editConfig));
      setConfig(editConfig);
      setIsEditing(false);
      toast({
        title: 'Configurazione salvata',
        description: 'Le impostazioni sono state salvate correttamente.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Errore durante il salvataggio della configurazione.',
        variant: 'destructive',
      });
    }
  };

  const cancelEdit = () => {
    setEditConfig(config);
    setIsEditing(false);
  };

  const generateAlloggiatiLink = (withData?: boolean) => {
    const baseUrl = window.location.origin;
    let url = `${baseUrl}/alloggiati`;
    
    if (withData && customLink) {
      url += `?data=${encodeURIComponent(customLink)}`;
    }
    
    const params = new URLSearchParams();
    
    // Add configuration parameters
    if (config.propertyName !== DEFAULT_CONFIG.propertyName) {
      params.set('property', config.propertyName);
    }
    if (config.customWelcomeMessage !== DEFAULT_CONFIG.customWelcomeMessage) {
      params.set('welcome', config.customWelcomeMessage);
    }
    if (!config.allowGuestEdit) {
      params.set('readonly', 'true');
    }
    
    if (params.toString()) {
      url += (url.includes('?') ? '&' : '?') + params.toString();
    }
    
    return url;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copiato!',
        description: `${label} copiato negli appunti.`,
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile copiare negli appunti.',
        variant: 'destructive',
      });
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const resetToDefaults = () => {
    setEditConfig(DEFAULT_CONFIG);
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem('alloggiati_config');
    toast({
      title: 'Reset completato',
      description: 'Configurazione ripristinata ai valori predefiniti.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestione Alloggiati</h2>
          <p className="text-muted-foreground">
            Gestisci link e configurazioni per la registrazione ospiti.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Annulla' : 'Modifica'}
          </Button>
          {isEditing && (
            <Button onClick={saveConfig}>
              <Save className="w-4 h-4 mr-2" />
              Salva
            </Button>
          )}
        </div>
      </div>

      {/* Link Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Link Alloggiati
          </CardTitle>
          <CardDescription>
            Genera link personalizzati per la registrazione ospiti.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={generateAlloggiatiLink()}
              readOnly
              className="flex-1 font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(generateAlloggiatiLink(), 'Link base')}
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

          <div className="space-y-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurazione
          </CardTitle>
          <CardDescription>
            Personalizza l'esperienza di registrazione ospiti.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Informazioni Struttura</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Nome Struttura</Label>
                {isEditing ? (
                  <Input
                    id="propertyName"
                    value={editConfig.propertyName}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, propertyName: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.propertyName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Indirizzo</Label>
                {isEditing ? (
                  <Input
                    id="propertyAddress"
                    value={editConfig.propertyAddress}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, propertyAddress: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.propertyAddress}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyCity">Città</Label>
                {isEditing ? (
                  <Input
                    id="propertyCity"
                    value={editConfig.propertyCity}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, propertyCity: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.propertyCity}</div>
                )}
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Informazioni Proprietario</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Nome</Label>
                {isEditing ? (
                  <Input
                    id="ownerName"
                    value={editConfig.ownerName}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, ownerName: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.ownerName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Email</Label>
                {isEditing ? (
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={editConfig.ownerEmail}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, ownerEmail: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.ownerEmail}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Telefono</Label>
                {isEditing ? (
                  <Input
                    id="ownerPhone"
                    value={editConfig.ownerPhone}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, ownerPhone: e.target.value })
                    }
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.ownerPhone}</div>
                )}
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-4">
            <h4 className="font-medium">Personalizzazione</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Messaggio di Benvenuto</Label>
                {isEditing ? (
                  <Textarea
                    id="welcomeMessage"
                    value={editConfig.customWelcomeMessage}
                    onChange={(e) =>
                      setEditConfig({ ...editConfig, customWelcomeMessage: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{config.customWelcomeMessage}</div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mostra Informazioni Struttura</Label>
                    <p className="text-sm text-muted-foreground">
                      Visualizza nome e indirizzo della struttura
                    </p>
                  </div>
                  <Switch
                    checked={isEditing ? editConfig.showPropertyInfo : config.showPropertyInfo}
                    onCheckedChange={(checked) =>
                      isEditing && setEditConfig({ ...editConfig, showPropertyInfo: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Permetti Modifica Ospiti</Label>
                    <p className="text-sm text-muted-foreground">
                      Consenti agli ospiti di modificare i propri dati
                    </p>
                  </div>
                  <Switch
                    checked={isEditing ? editConfig.allowGuestEdit : config.allowGuestEdit}
                    onCheckedChange={(checked) =>
                      isEditing && setEditConfig({ ...editConfig, allowGuestEdit: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Campi Obbligatori</Label>
                    <p className="text-sm text-muted-foreground">
                      Rendi obbligatori tutti i campi del form
                    </p>
                  </div>
                  <Switch
                    checked={isEditing ? editConfig.requireAllFields : config.requireAllFields}
                    onCheckedChange={(checked) =>
                      isEditing && setEditConfig({ ...editConfig, requireAllFields: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifiche Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Invia email di notifica per nuove registrazioni
                    </p>
                  </div>
                  <Switch
                    checked={isEditing ? editConfig.emailNotifications : config.emailNotifications}
                    onCheckedChange={(checked) =>
                      isEditing && setEditConfig({ ...editConfig, emailNotifications: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced */}
          {isEditing && (
            <div className="space-y-4">
              <h4 className="font-medium">Avanzate</h4>
              <div className="space-y-2">
                <Label htmlFor="customCss">CSS Personalizzato</Label>
                <Textarea
                  id="customCss"
                  value={editConfig.customCss}
                  onChange={(e) =>
                    setEditConfig({ ...editConfig, customCss: e.target.value })
                  }
                  placeholder="/* CSS personalizzato per la pagina alloggiati */"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  CSS personalizzato da applicare alla pagina di registrazione ospiti.
                </p>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetToDefaults}
                className="text-destructive hover:text-destructive"
              >
                Ripristina Predefiniti
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
          <CardDescription>
            Link utili per la gestione degli alloggiati.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => openInNewTab('/alloggiati')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizza Pagina
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(generateAlloggiatiLink(), 'Link alloggiati')}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copia Link
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://alloggiatiweb.poliziadistato.it', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Polizia di Stato
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};