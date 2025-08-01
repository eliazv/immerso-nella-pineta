import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, User, Loader2 } from "lucide-react";
import { GuestData, AlloggiatiFormData } from "@/types/alloggiati";
import { useToast } from "@/hooks/use-toast";
import { getComuneByNome } from "@/data/comuni";
import { getStatoByNome } from "@/data/stati";
import ComuneSelect from "./ComuneSelect";
import StatoSelect from "./StatoSelect";
import DateRangeSelector from "./DateRangeSelector";
import { useFieldErrors } from "@/hooks/useFieldErrors";
import FieldError from "@/components/ui/field-error";

interface GuestFormProps {
  onSubmit: (data: AlloggiatiFormData) => void;
  isLoading?: boolean;
  initialData?: AlloggiatiFormData | null;
}

const GuestForm: React.FC<GuestFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData = null,
}) => {
  const { toast } = useToast();

  const getInitialFormData = (): AlloggiatiFormData => {
    if (initialData) {
      return initialData;
    }

    // Inizializza con campi vuoti per evitare warning controlled/uncontrolled
    return {
      ospiti: [
        {
          cognome: "",
          nome: "",
          sesso: "M",
          dataNascita: "",
          luogoNascita: "",
          provinciaNascita: "",
          statoNascita: "ITALIA",
          cittadinanza: "ITALIA",
          tipoDocumento: "IDENT",
          numeroDocumento: "",
          luogoRilascio: "",
          dataArrivo: "", // Inizialmente vuoto
          dataPartenza: "", // Inizialmente vuoto
          giorniPermanenza: 0, // Inizialmente 0
          tipoAlloggiato: "singolo",
          isCapoFamiglia: true,
          isItaliano: true,
        },
      ],
      idAppartamento: "001",
      emailContatto: "",
      note: "",
      // Dettagli soggiorno comuni - inizialmente vuoti
      dataArrivo: "",
      dataPartenza: "",
      giorniPermanenza: 0,
    };
  };

  const [formData, setFormData] = useState<AlloggiatiFormData>(
    getInitialFormData()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getFieldError, setFieldError, clearFieldError, clearAllErrors } =
    useFieldErrors();

  // Aggiorna il form quando cambiano i dati iniziali
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const addGuest = () => {
    const newGuest: GuestData = {
      cognome: "",
      nome: "",
      sesso: "M",
      dataNascita: "",
      luogoNascita: "",
      provinciaNascita: "",
      statoNascita: "ITALIA",
      cittadinanza: "ITALIA",
      tipoDocumento: "IDENT",
      numeroDocumento: "",
      luogoRilascio: "",
      // Usa i valori comuni del soggiorno
      dataArrivo: formData.dataArrivo,
      dataPartenza: formData.dataPartenza,
      giorniPermanenza: formData.giorniPermanenza,
      tipoAlloggiato: "membro_famiglia",
      isCapoFamiglia: false,
      isItaliano: true,
    };

    setFormData((prev) => ({
      ...prev,
      ospiti: [...prev.ospiti, newGuest],
    }));
  };

  const removeGuest = (index: number) => {
    if (formData.ospiti.length === 1) {
      toast({
        title: "Errore",
        description: "Deve esserci almeno un ospite",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      ospiti: prev.ospiti.filter((_, i) => i !== index),
    }));
  };

  // Funzione per calcolare i giorni di permanenza
  const calculateDays = (arrivo: string, partenza: string): number => {
    if (!arrivo || !partenza) return 1;
    const arrivoDate = new Date(arrivo);
    const partenzaDate = new Date(partenza);
    const diffTime = partenzaDate.getTime() - arrivoDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  // Funzione per validazione in tempo reale
  const validateField = (
    field: string,
    value: string | number | boolean | undefined,
    guestIndex?: number
  ) => {
    const fieldKey =
      guestIndex !== undefined ? `${field}-${guestIndex}` : field;

    // Rimuovi errore esistente per questo campo
    clearFieldError(fieldKey);

    switch (field) {
      case "cognome":
      case "nome":
        if (typeof value === "string") {
          if (value.trim().length < 2 && value.trim().length > 0) {
            setFieldError(
              fieldKey,
              `${
                field === "cognome" ? "Cognome" : "Nome"
              } deve avere almeno 2 caratteri`
            );
          } else if (
            value.trim().length > 0 &&
            !/^[a-zA-ZÀ-ſ\s'-]+$/.test(value.trim())
          ) {
            setFieldError(
              fieldKey,
              `${
                field === "cognome" ? "Cognome" : "Nome"
              } contiene caratteri non validi`
            );
          }
        }
        break;
      case "numeroDocumento":
        if (typeof value === "string" && guestIndex !== undefined) {
          const guest = formData.ospiti[guestIndex];
          if (guest && value.trim().length > 0) {
            const docNumber = value.trim();
            // Validazione meno stringente per documenti internazionali
            if (docNumber.length < 3) {
              setFieldError(
                fieldKey,
                "Numero documento troppo corto (minimo 3 caratteri)"
              );
            } else if (docNumber.length > 20) {
              setFieldError(
                fieldKey,
                "Numero documento troppo lungo (massimo 20 caratteri)"
              );
            } else if (!/^[A-Z0-9\-\s]+$/i.test(docNumber)) {
              setFieldError(
                fieldKey,
                "Il numero documento può contenere solo lettere, numeri, spazi e trattini"
              );
            }
            // Validazione specifica solo per documenti italiani se cittadinanza italiana
            else if (guest.cittadinanza === "ITALIA") {
              if (
                guest.tipoDocumento === "IDENT" &&
                !/^[A-Z]{2}\d{5}[A-Z]{2}$/i.test(docNumber.replace(/[\s\-]/g, ''))
              ) {
                setFieldError(
                  fieldKey,
                  "Formato carta d'identità italiana non valido (es: CA01376BS)"
                );
              } else if (
                guest.tipoDocumento === "PATEN" &&
                !/^[A-Z]{2}\d{6}[A-Z]$/i.test(docNumber.replace(/[\s\-]/g, ''))
              ) {
                setFieldError(
                  fieldKey,
                  "Formato patente italiana non valido (es: MI123456A)"
                );
              }
            }
          }
        }
        break;
      case "emailContatto":
        if (typeof value === "string" && value.trim().length > 0) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            setFieldError(fieldKey, "Email di contatto non valida");
          } else if (value.length > 100) {
            setFieldError(
              fieldKey,
              "Email di contatto troppo lunga (max 100 caratteri)"
            );
          }
        }
        break;
      case "dataNascita":
        if (typeof value === "string" && value) {
          const birthDate = new Date(value);
          const today = new Date();
          if (birthDate > today) {
            setFieldError(
              fieldKey,
              "Data di nascita non può essere nel futuro"
            );
          }
        }
        break;
    }
  };

  const updateGuest = (
    index: number,
    field: keyof GuestData,
    value: string | number | boolean | undefined
  ) => {
    // Validazione in tempo reale
    validateField(field, value, index);

    setFormData((prev) => ({
      ...prev,
      ospiti: prev.ospiti.map((guest, i) => {
        if (i === index) {
          const updatedGuest = { ...guest, [field]: value };

          // Auto-aggiorna campi correlati
          if (field === "statoNascita") {
            if (value === "ITALIA") {
              // Nato in Italia: aggiorna flag e suggerisci cittadinanza italiana
              updatedGuest.isItaliano = true;
              if (!updatedGuest.cittadinanza) {
                updatedGuest.cittadinanza = "ITALIA";
              }
            } else {
              // Non nato in Italia: resetta campi italiani
              updatedGuest.isItaliano = false;
              updatedGuest.provinciaNascita = "";
              updatedGuest.luogoNascita = "";
            }
          }

          if (field === "tipoAlloggiato") {
            updatedGuest.isCapoFamiglia =
              value === "capo_famiglia" || value === "singolo";
          }

          // Calcola automaticamente i giorni di permanenza quando cambiano le date
          if (field === "dataArrivo" || field === "dataPartenza") {
            const arrivo =
              field === "dataArrivo" ? String(value) : updatedGuest.dataArrivo;
            const partenza =
              field === "dataPartenza"
                ? String(value)
                : updatedGuest.dataPartenza;
            updatedGuest.giorniPermanenza = calculateDays(arrivo, partenza);
          }

          // Auto-completa provincia quando si seleziona un comune italiano
          if (field === "luogoNascita" && updatedGuest.isItaliano) {
            const comune = getComuneByNome(String(value));
            if (comune) {
              updatedGuest.provinciaNascita = comune.sigla;
            }
          }

          return updatedGuest;
        }
        return guest;
      }),
    }));
  };

  // Funzione per aggiornare i dettagli soggiorno e sincronizzarli con tutti gli ospiti
  const updateSoggiornoDetails = (
    field: "dataArrivo" | "dataPartenza",
    value: string
  ) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      // Calcola giorni permanenza
      if (field === "dataArrivo" || field === "dataPartenza") {
        const arrivo = field === "dataArrivo" ? value : prev.dataArrivo;
        const partenza = field === "dataPartenza" ? value : prev.dataPartenza;
        newFormData.giorniPermanenza = calculateDays(arrivo, partenza);
      }

      // Sincronizza con tutti gli ospiti
      newFormData.ospiti = prev.ospiti.map((guest) => ({
        ...guest,
        dataArrivo: newFormData.dataArrivo,
        dataPartenza: newFormData.dataPartenza,
        giorniPermanenza: newFormData.giorniPermanenza,
      }));

      return newFormData;
    });
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    // Pulisci errori precedenti
    clearAllErrors();

    // Validazione dettagli soggiorno comuni
    if (!formData.dataArrivo) {
      errors.push("Data di arrivo obbligatoria");
      setFieldError("dataArrivo", "Data di arrivo obbligatoria");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const arrivalDate = new Date(formData.dataArrivo);
      arrivalDate.setHours(0, 0, 0, 0);

      if (arrivalDate < today) {
        errors.push("Data di arrivo non può essere nel passato");
        setFieldError(
          "dataArrivo",
          "Data di arrivo non può essere nel passato"
        );
      }
    }

    if (!formData.dataPartenza) {
      errors.push("Data di partenza obbligatoria");
      setFieldError("dataPartenza", "Data di partenza obbligatoria");
    } else if (formData.dataArrivo) {
      const arrivalDate = new Date(formData.dataArrivo);
      arrivalDate.setHours(0, 0, 0, 0);
      const departureDate = new Date(formData.dataPartenza);
      departureDate.setHours(0, 0, 0, 0);

      if (departureDate <= arrivalDate) {
        errors.push("Data di partenza deve essere dopo la data di arrivo");
        setFieldError(
          "dataPartenza",
          "Data di partenza deve essere dopo la data di arrivo"
        );
      }
    }

    if (formData.giorniPermanenza < 1) {
      errors.push("Giorni permanenza deve essere almeno 1");
      setFieldError(
        "giorniPermanenza",
        "Giorni permanenza deve essere almeno 1"
      );
    } else if (formData.giorniPermanenza > 365) {
      errors.push("Giorni permanenza non può superare 365 giorni");
      setFieldError(
        "giorniPermanenza",
        "Giorni permanenza non può superare 365 giorni"
      );
    }

    for (const [index, guest] of formData.ospiti.entries()) {
      const guestNum = index + 1;

      // Validazioni base
      if (!guest.cognome.trim()) {
        errors.push(`Ospite ${guestNum}: Cognome obbligatorio`);
        setFieldError(`cognome-${index}`, "Cognome obbligatorio");
      } else if (guest.cognome.trim().length < 2) {
        errors.push(
          `Ospite ${guestNum}: Cognome deve avere almeno 2 caratteri`
        );
        setFieldError(
          `cognome-${index}`,
          "Cognome deve avere almeno 2 caratteri"
        );
      } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(guest.cognome.trim())) {
        errors.push(
          `Ospite ${guestNum}: Cognome contiene caratteri non validi`
        );
        setFieldError(
          `cognome-${index}`,
          "Cognome contiene caratteri non validi"
        );
      }

      if (!guest.nome.trim()) {
        errors.push(`Ospite ${guestNum}: Nome obbligatorio`);
        setFieldError(`nome-${index}`, "Nome obbligatorio");
      } else if (guest.nome.trim().length < 2) {
        errors.push(`Ospite ${guestNum}: Nome deve avere almeno 2 caratteri`);
        setFieldError(`nome-${index}`, "Nome deve avere almeno 2 caratteri");
      } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(guest.nome.trim())) {
        errors.push(`Ospite ${guestNum}: Nome contiene caratteri non validi`);
        setFieldError(`nome-${index}`, "Nome contiene caratteri non validi");
      }

      if (!guest.dataNascita) {
        errors.push(`Ospite ${guestNum}: Data di nascita obbligatoria`);
        setFieldError(`dataNascita-${index}`, "Data di nascita obbligatoria");
      } else {
        // Validazione età (non può essere nel futuro)
        const birthDate = new Date(guest.dataNascita);
        const today = new Date();
        if (birthDate > today) {
          errors.push(
            `Ospite ${guestNum}: Data di nascita non può essere nel futuro`
          );
          setFieldError(
            `dataNascita-${index}`,
            "Data di nascita non può essere nel futuro"
          );
        }
      }

      if (!guest.statoNascita) {
        errors.push(`Ospite ${guestNum}: Stato di nascita obbligatorio`);
        setFieldError(`statoNascita-${index}`, "Stato di nascita obbligatorio");
      }

      if (guest.statoNascita === "ITALIA") {
        if (!guest.luogoNascita.trim()) {
          errors.push(`Ospite ${guestNum}: Comune di nascita obbligatorio`);
          setFieldError(
            `luogoNascita-${index}`,
            "Comune di nascita obbligatorio"
          );
        }
        if (!guest.provinciaNascita?.trim()) {
          errors.push(`Ospite ${guestNum}: Provincia di nascita obbligatoria`);
          setFieldError(
            `provinciaNascita-${index}`,
            "Provincia di nascita obbligatoria"
          );
        }
      }

      if (!guest.cittadinanza.trim()) {
        errors.push(`Ospite ${guestNum}: Cittadinanza obbligatoria`);
        setFieldError(`cittadinanza-${index}`, "Cittadinanza obbligatoria");
      }

      if (!guest.dataArrivo) {
        errors.push(`Ospite ${guestNum}: Data di arrivo obbligatoria`);
      } else {
        // Validazione data arrivo (deve essere >= oggi)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Imposta a mezzanotte per confronto corretto
        const arrivalDate = new Date(guest.dataArrivo);
        arrivalDate.setHours(0, 0, 0, 0);

        if (arrivalDate < today) {
          errors.push(
            `Ospite ${guestNum}: Data arrivo deve essere da oggi in poi`
          );
        }
      }

      if (!guest.dataPartenza) {
        errors.push(`Ospite ${guestNum}: Data di partenza obbligatoria`);
      } else {
        // Validazione data partenza (deve essere >= oggi e > arrivo)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const arrivalDate = new Date(guest.dataArrivo);
        arrivalDate.setHours(0, 0, 0, 0);
        const departureDate = new Date(guest.dataPartenza);
        departureDate.setHours(0, 0, 0, 0);

        if (departureDate < today) {
          errors.push(
            `Ospite ${guestNum}: Data partenza deve essere da oggi in poi`
          );
        } else if (departureDate <= arrivalDate) {
          errors.push(
            `Ospite ${guestNum}: Data partenza deve essere dopo la data di arrivo`
          );
        }
      }

      if (guest.giorniPermanenza < 1) {
        errors.push(
          `Ospite ${guestNum}: Giorni permanenza deve essere almeno 1`
        );
      }

      // Validazioni per capo famiglia/gruppo
      if (guest.isCapoFamiglia) {
        if (!guest.numeroDocumento?.trim()) {
          errors.push(
            `Ospite ${guestNum}: Numero documento obbligatorio per capo famiglia/gruppo`
          );
          setFieldError(
            `numeroDocumento-${index}`,
            "Numero documento obbligatorio"
          );
        } else {
          // Validazione formato numero documento
          const docNumber = guest.numeroDocumento.trim();
          if (guest.tipoDocumento === "IDENT") {
            // Carta d'identità: formato italiano (es: CA01376BS)
            if (!/^[A-Z]{2}\d{5}[A-Z]{2}$/i.test(docNumber)) {
              errors.push(
                `Ospite ${guestNum}: Formato carta d'identità non valido (es: CA01376BS)`
              );
              setFieldError(
                `numeroDocumento-${index}`,
                "Formato carta d'identità non valido (es: CA01376BS)"
              );
            }
          } else if (guest.tipoDocumento === "PASSP") {
            // Passaporto: formato variabile ma almeno 6 caratteri alfanumerici
            if (!/^[A-Z0-9]{6,}$/i.test(docNumber)) {
              errors.push(
                `Ospite ${guestNum}: Formato passaporto non valido (min 6 caratteri alfanumerici)`
              );
              setFieldError(
                `numeroDocumento-${index}`,
                "Formato passaporto non valido (min 6 caratteri alfanumerici)"
              );
            }
          } else if (guest.tipoDocumento === "PATEN") {
            // Patente: formato italiano (es: MI123456A)
            if (!/^[A-Z]{2}\d{6}[A-Z]$/i.test(docNumber)) {
              errors.push(
                `Ospite ${guestNum}: Formato patente non valido (es: MI123456A)`
              );
              setFieldError(
                `numeroDocumento-${index}`,
                "Formato patente non valido (es: MI123456A)"
              );
            }
          }
        }

        if (!guest.luogoRilascio?.trim()) {
          errors.push(
            `Ospite ${guestNum}: Luogo rilascio documento obbligatorio per capo famiglia/gruppo`
          );
          setFieldError(
            `luogoRilascio-${index}`,
            "Luogo rilascio documento obbligatorio"
          );
        }
      }
    }

    // Validazione email se fornita
    if (formData.emailContatto && formData.emailContatto.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailContatto)) {
        errors.push("Email di contatto non valida");
        setFieldError("emailContatto", "Email di contatto non valida");
      } else if (formData.emailContatto.length > 100) {
        errors.push("Email di contatto troppo lunga (max 100 caratteri)");
        setFieldError(
          "emailContatto",
          "Email di contatto troppo lunga (max 100 caratteri)"
        );
      }
    }

    // Validazione che ci sia almeno un capo famiglia/gruppo
    const capiFamiglia = formData.ospiti.filter(
      (guest) => guest.isCapoFamiglia
    );
    if (capiFamiglia.length === 0) {
      errors.push("Deve esserci almeno un capo famiglia o ospite singolo");
      setFieldError(
        "tipoAlloggiato-0",
        "Deve esserci almeno un capo famiglia o ospite singolo"
      );
    }

    // Validazione duplicati (stesso nome, cognome e data di nascita)
    for (let i = 0; i < formData.ospiti.length; i++) {
      for (let j = i + 1; j < formData.ospiti.length; j++) {
        const guest1 = formData.ospiti[i];
        const guest2 = formData.ospiti[j];

        if (
          guest1.nome.trim().toLowerCase() ===
            guest2.nome.trim().toLowerCase() &&
          guest1.cognome.trim().toLowerCase() ===
            guest2.cognome.trim().toLowerCase() &&
          guest1.dataNascita === guest2.dataNascita
        ) {
          errors.push(
            `Ospiti duplicati trovati: ${guest1.nome} ${guest1.cognome}`
          );
          setFieldError(`nome-${j}`, "Ospite duplicato");
          setFieldError(`cognome-${j}`, "Ospite duplicato");
        }
      }
    }

    if (errors.length > 0) {
      toast({
        title: "Errori di validazione",
        description:
          errors.slice(0, 3).join("; ") + (errors.length > 3 ? "..." : ""),
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dettagli Soggiorno Comuni */}
      <DateRangeSelector
        dataArrivo={formData.dataArrivo}
        dataPartenza={formData.dataPartenza}
        giorniPermanenza={formData.giorniPermanenza}
        onDateChange={updateSoggiornoDetails}
        getFieldError={getFieldError}
      />

      {/* Lista ospiti */}
      {formData.ospiti.map((guest, index) => (
        <GuestCard
          key={index}
          guest={guest}
          index={index}
          isFirst={index === 0}
          onUpdate={(field, value) => updateGuest(index, field, value)}
          onRemove={() => removeGuest(index)}
          getFieldError={getFieldError}
        />
      ))}

      {/* Email di contatto */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Informazioni di contatto</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="emailContatto">Email di contatto</Label>
            <Input
              id="emailContatto"
              type="email"
              value={formData.emailContatto}
              onChange={(e) => {
                setFormData(prev => ({...prev, emailContatto: e.target.value}));
                validateField("emailContatto", e.target.value);
              }}
              placeholder="esempio@email.com"
              maxLength={100}
              className={getFieldError("emailContatto") ? "border-red-500 focus:border-red-500" : ""}
            />
            <FieldError error={getFieldError("emailContatto")} />
            <p className="text-sm text-muted-foreground mt-1">
              Opzionale. Verrà utilizzata per inviarti una copia dei documenti generati.
            </p>
          </div>
          
          {formData.note !== undefined && (
            <div className="mt-4">
              <Label htmlFor="note">Note aggiuntive</Label>
              <Input
                id="note"
                value={formData.note}
                onChange={(e) => setFormData(prev => ({...prev, note: e.target.value}))}
                placeholder="Note o informazioni aggiuntive..."
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Massimo 200 caratteri. Informazioni aggiuntive opzionali.
              </p>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* Pulsanti azione */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={addGuest}
          className="flex items-center justify-center gap-2 h-12"
        >
          <Plus className="h-4 w-4" />
          Aggiungi Ospite
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 h-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Invio in corso...
            </>
          ) : (
            "Invia i documenti"
          )}
        </Button>
      </div>
    </form>
  );
};

interface GuestCardProps {
  guest: GuestData;
  index: number;
  isFirst: boolean;
  onUpdate: (
    field: keyof GuestData,
    value: string | number | boolean | undefined
  ) => void;
  onRemove: () => void;
  getFieldError: (field: string) => string | undefined;
}

const GuestCard: React.FC<GuestCardProps> = ({
  guest,
  index,
  isFirst,
  onUpdate,
  onRemove,
  getFieldError,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Ospite {index + 1}
            {guest.isCapoFamiglia && (
              <span className="text-sm text-muted-foreground">
                (Capo famiglia/gruppo)
              </span>
            )}
          </CardTitle>
          {!isFirst && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tipo alloggiato */}
        <div>
          <Label>Tipo Alloggiato</Label>
          <Select
            value={guest.tipoAlloggiato}
            onValueChange={(value) => onUpdate("tipoAlloggiato", value)}
          >
            <SelectTrigger
              className={
                getFieldError(`tipoAlloggiato-${index}`) ? "border-red-500" : ""
              }
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="singolo">Ospite Singolo</SelectItem>
              <SelectItem value="capo_famiglia">
                Capo Famiglia/Gruppo
              </SelectItem>
              <SelectItem value="membro_famiglia">
                Membro Famiglia/Gruppo
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError error={getFieldError(`tipoAlloggiato-${index}`)} />
        </div>

        {/* Dati anagrafici */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`cognome-${index}`}>Cognome *</Label>
            <Input
              id={`cognome-${index}`}
              value={guest.cognome}
              onChange={(e) => onUpdate("cognome", e.target.value)}
              placeholder="Rossi"
              maxLength={50}
              required
              className={
                getFieldError(`cognome-${index}`)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }
            />
            <FieldError error={getFieldError(`cognome-${index}`)} />
          </div>
          <div>
            <Label htmlFor={`nome-${index}`}>Nome *</Label>
            <Input
              id={`nome-${index}`}
              value={guest.nome}
              onChange={(e) => onUpdate("nome", e.target.value)}
              placeholder="Mario"
              maxLength={30}
              required
              className={
                getFieldError(`nome-${index}`)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }
            />
            <FieldError error={getFieldError(`nome-${index}`)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Sesso *</Label>
            <Select
              value={guest.sesso}
              onValueChange={(value) => onUpdate("sesso", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Maschio</SelectItem>
                <SelectItem value="F">Femmina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`dataNascita-${index}`}>Data di Nascita *</Label>
            <Input
              id={`dataNascita-${index}`}
              type="date"
              value={guest.dataNascita}
              onChange={(e) => onUpdate("dataNascita", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
              className={
                getFieldError(`dataNascita-${index}`)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }
            />
            <FieldError error={getFieldError(`dataNascita-${index}`)} />
          </div>
        </div>

        {/* Stato di nascita (prima del comune) */}
        <div>
          <StatoSelect
            id={`statoNascita-${index}`}
            label="Stato di Nascita"
            value={guest.statoNascita}
            onChange={(stato) => onUpdate("statoNascita", stato)}
            placeholder="Cerca stato di nascita..."
            required
          />
          <FieldError error={getFieldError(`statoNascita-${index}`)} />
        </div>

        {/* Luogo di nascita (solo se Italia) */}
        {guest.statoNascita === "ITALIA" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ComuneSelect
                id={`luogoNascita-${index}`}
                label="Comune di Nascita"
                value={guest.luogoNascita}
                onChange={(comune, provincia) => {
                  onUpdate("luogoNascita", comune);
                  if (provincia) {
                    onUpdate("provinciaNascita", provincia);
                  }
                }}
                placeholder="Cerca comune italiano..."
                required
              />
              <FieldError error={getFieldError(`luogoNascita-${index}`)} />
            </div>
            <div>
              <Label htmlFor={`provinciaNascita-${index}`}>
                Provincia di Nascita *
              </Label>
              <Input
                id={`provinciaNascita-${index}`}
                value={guest.provinciaNascita || ""}
                onChange={(e) => onUpdate("provinciaNascita", e.target.value)}
                placeholder="BO"
                maxLength={2}
                required
                disabled
                className="bg-gray-50"
              />
              <FieldError error={getFieldError(`provinciaNascita-${index}`)} />
            </div>
          </div>
        )}

        {/* Cittadinanza */}
        <div>
          <StatoSelect
            id={`cittadinanza-${index}`}
            label="Cittadinanza"
            value={guest.cittadinanza}
            onChange={(stato) => onUpdate("cittadinanza", stato)}
            placeholder="Cerca cittadinanza..."
            required
          />
          <FieldError error={getFieldError(`cittadinanza-${index}`)} />
        </div>

        {/* Documento (solo per capo famiglia/gruppo) */}
        {guest.isCapoFamiglia && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Documento di Identità</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Tipo Documento *</Label>
                <Select
                  value={guest.tipoDocumento}
                  onValueChange={(value) => onUpdate("tipoDocumento", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDENT">Carta d'Identità</SelectItem>
                    <SelectItem value="PASSP">Passaporto</SelectItem>
                    <SelectItem value="PATEN">Patente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`numeroDocumento-${index}`}>
                  Numero Documento *
                </Label>
                <Input
                  id={`numeroDocumento-${index}`}
                  value={guest.numeroDocumento || ""}
                  onChange={(e) =>
                    onUpdate("numeroDocumento", e.target.value.toUpperCase())
                  }
                  placeholder={
                    guest.tipoDocumento === "IDENT"
                      ? "CA01376BS"
                      : guest.tipoDocumento === "PASSP"
                      ? "AA1234567"
                      : "MI123456A"
                  }
                  maxLength={20}
                  required
                  className={
                    getFieldError(`numeroDocumento-${index}`)
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                <FieldError error={getFieldError(`numeroDocumento-${index}`)} />
              </div>
              <div>
                {guest.isItaliano ? (
                  <ComuneSelect
                    id={`luogoRilascio-${index}`}
                    label="Luogo Rilascio"
                    value={guest.luogoRilascio || ""}
                    onChange={(comune) => {
                      onUpdate("luogoRilascio", comune);
                    }}
                    placeholder="Cerca comune di rilascio..."
                    required
                  />
                ) : (
                  <StatoSelect
                    id={`luogoRilascio-${index}`}
                    label="Luogo Rilascio"
                    value={guest.luogoRilascio || ""}
                    onChange={(stato) => onUpdate("luogoRilascio", stato)}
                    placeholder="Cerca stato di rilascio..."
                    required
                  />
                )}
                <FieldError error={getFieldError(`luogoRilascio-${index}`)} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestForm;
