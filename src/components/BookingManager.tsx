import React, { useState } from "react";
import BookingModal from "@/components/BookingModal";
import { Timestamp } from "firebase/firestore";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookings } from "@/hooks/useBookings";
import { createBooking, updateBooking } from "@/services/firebaseBookingService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  Users,
  Euro,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Booking } from "@/types/firebase";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface BookingManagerProps {
  selectedProperty?: string;
}

const BookingManager: React.FC<BookingManagerProps> = ({
  selectedProperty,
}) => {
  const {
    bookings,
    properties,
    loading,
    error,
    hasMore,
    loadBookings,
    updateTaxStatus,
    deleteBooking,
    filters,
    setFilters,
    totalBookings,
    bookingsWithTaxDue,
    todayCheckIns,
    todayCheckOuts,
  } = useBookings({
    propertyId:
      selectedProperty && selectedProperty !== "all"
        ? selectedProperty
        : undefined,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [taxFilter, setTaxFilter] = useState<string>("all");

  // Filtra le prenotazioni in base ai criteri di ricerca
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesTax =
      taxFilter === "all" ||
      (taxFilter === "paid" && booking.tassaSoggiornoPagata) ||
      (taxFilter === "unpaid" && !booking.tassaSoggiornoPagata);

    return matchesSearch && matchesStatus && matchesTax;
  });

  // Mobile detection (fino a md)
  const isMobile = useIsMobile();

  // Stato modale
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Partial<Booking> | undefined>(undefined);

  // Apre modale per aggiunta
  const openAddModal = () => {
    setModalData(undefined);
    setModalOpen(true);
  };
  // Apre modale per modifica
  const openEditModal = (booking: Booking) => {
    setModalData({
      ...booking,
      checkInDate: booking.checkInDate && typeof booking.checkInDate.toDate === 'function'
        ? booking.checkInDate.toDate().toISOString().slice(0, 10)
        : booking.checkInDate,
      checkOutDate: booking.checkOutDate && typeof booking.checkOutDate.toDate === 'function'
        ? booking.checkOutDate.toDate().toISOString().slice(0, 10)
        : booking.checkOutDate,
    });
    setModalOpen(true);
  };

  // Salva prenotazione (add/edit)
  const handleSaveBooking = async (data: Partial<Booking>) => {
    // Conversione date string -> Timestamp
    const toTimestamp = (d: string | Date | undefined) => {
      if (!d) return undefined;
      if (typeof d === "string") return Timestamp.fromDate(new Date(d));
      if (d instanceof Date) return Timestamp.fromDate(d);
      return d;
    };
    const payload: Partial<Booking> = {
      ...data,
      checkInDate: toTimestamp(data.checkInDate as string),
      checkOutDate: toTimestamp(data.checkOutDate as string),
      totalAmount: data.totalAmount ? Number(data.totalAmount) : 0,
    };
    if (data.id) {
      // Modifica
      await updateBooking(data.id, payload);
    } else {
      // Nuova
      await createBooking(payload);
    }
    setModalOpen(false);
    loadBookings(true);
  };

  // Gestori eventi
  const handleTaxStatusChange = async (bookingId: string, isPaid: boolean) => {
    try {
      await updateTaxStatus(bookingId, isPaid, isPaid ? new Date() : undefined);
    } catch (error) {
      console.error("Errore aggiornamento tassa:", error);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
    } catch (error) {
      console.error("Errore cancellazione prenotazione:", error);
    }
  };

  // Rendering stati della prenotazione
  const renderStatus = (status: Booking["status"]) => {
    const statusConfig = {
      confirmed: { label: "Confermata", color: "bg-blue-100 text-blue-800" },
      "checked-in": { label: "Check-in", color: "bg-green-100 text-green-800" },
      "checked-out": { label: "Check-out", color: "bg-gray-100 text-gray-800" },
      cancelled: { label: "Cancellata", color: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Rendering stato tassa
  const renderTaxStatus = (booking: Booking) => {
    if (booking.tassaSoggiornoPagata) {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">Pagata</span>
          {booking.dataPagamentoTassa && (
            <span className="text-xs text-gray-500">
              (
              {format(booking.dataPagamentoTassa.toDate(), "dd/MM", {
                locale: it,
              })}
              )
            </span>
          )}
        </div>
      );
    }

    const isOverdue = booking.checkOutDate.toDate() < new Date();
    return (
      <div
        className={`flex items-center gap-1 ${
          isOverdue ? "text-red-600" : "text-orange-600"
        }`}
      >
        {isOverdue ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
        <span className="text-sm">{isOverdue ? "Scaduta" : "Da pagare"}</span>
      </div>
    );
  };

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
            <Button onClick={() => loadBookings(true)} className="mt-4">
              Riprova
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards statistiche */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* ...statistiche come prima... */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Prenotazioni</p>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Check-in oggi</p>
                <p className="text-2xl font-bold">{todayCheckIns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Check-out oggi</p>
                <p className="text-2xl font-bold">{todayCheckOuts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Euro className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Tasse da pagare</p>
                <p className="text-2xl font-bold">{bookingsWithTaxDue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Card compatte + FAB */}
      {isMobile ? (
        <>
          <div className="flex flex-col gap-3">
            {filteredBookings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Nessuna prenotazione trovata</div>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="shadow-sm border p-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-base">{booking.guestName}</p>
                      <p className="text-xs text-gray-500">{booking.guestEmail}</p>
                    </div>
                    <div>{renderStatus(booking.status)}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs mt-1">
                    <span>Check-in: {format(booking.checkInDate.toDate(), "dd/MM/yy", { locale: it })}</span>
                    <span>Check-out: {format(booking.checkOutDate.toDate(), "dd/MM/yy", { locale: it })}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span>App: {booking.propertyName}</span>
                    <span>Totale: €{booking.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {renderTaxStatus(booking)}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => openEditModal(booking)}>
                      Modifica
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDeleteBooking(booking.id)}>
                      Elimina
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
          {/* Floating Action Button per aggiunta */}
          <Button
            className="fixed bottom-20 right-4 z-50 rounded-full shadow-lg bg-primary text-white w-14 h-14 flex items-center justify-center text-3xl md:hidden"
            onClick={openAddModal}
            aria-label="Aggiungi prenotazione"
          >
            <Plus className="w-7 h-7" />
          </Button>
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Gestione Prenotazioni</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={openAddModal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuova Prenotazione
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Esporta
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtri */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Input
                placeholder="Cerca per nome o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="confirmed">Confermata</SelectItem>
                  <SelectItem value="checked-in">Check-in</SelectItem>
                  <SelectItem value="checked-out">Check-out</SelectItem>
                  <SelectItem value="cancelled">Cancellata</SelectItem>
                </SelectContent>
              </Select>
              <Select value={taxFilter} onValueChange={setTaxFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tassa soggiorno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte</SelectItem>
                  <SelectItem value="paid">Pagata</SelectItem>
                  <SelectItem value="unpaid">Da pagare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Tabella prenotazioni */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ospite</TableHead>
                    <TableHead>Appartamento</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Tassa Soggiorno</TableHead>
                    <TableHead>Totale</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Caricamento...
                      </TableCell>
                    </TableRow>
                  ) : filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        Nessuna prenotazione trovata
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-sm text-gray-500">
                              {booking.guestEmail}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.propertyName}</TableCell>
                        <TableCell>
                          {format(booking.checkInDate.toDate(), "dd/MM/yyyy", {
                            locale: it,
                          })}
                        </TableCell>
                        <TableCell>
                          {format(booking.checkOutDate.toDate(), "dd/MM/yyyy", {
                            locale: it,
                          })}
                        </TableCell>
                        <TableCell>{renderStatus(booking.status)}</TableCell>
                        <TableCell>{renderTaxStatus(booking)}</TableCell>
                        <TableCell>€{booking.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditModal(booking)}>Modifica</DropdownMenuItem>
                              <DropdownMenuItem>Visualizza</DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleTaxStatusChange(
                                    booking.id,
                                    !booking.tassaSoggiornoPagata
                                  )
                                }
                              >
                                {booking.tassaSoggiornoPagata
                                  ? "Segna tassa non pagata"
                                  : "Segna tassa pagata"}
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    Elimina
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Conferma eliminazione
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Sei sicuro di voler eliminare la
                                      prenotazione di {booking.guestName}? Questa
                                      azione non può essere annullata.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteBooking(booking.id)
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Elimina
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Carica altro */}
            {hasMore && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => loadBookings(false)}
                  disabled={loading}
                >
                  {loading ? "Caricamento..." : "Carica altro"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {/* Modale prenotazione */}
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveBooking}
        initialData={modalData}
        properties={properties}
      />
    </div>
  );
};

export default BookingManager;
