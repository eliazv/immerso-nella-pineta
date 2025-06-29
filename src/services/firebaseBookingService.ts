import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryConstraint,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Booking,
  BookingFilters,
  BookingSortOptions,
  Property,
} from "@/types/firebase";

const bookingsCollection = collection(db, "bookings");
const propertiesCollection = collection(db, "properties");

// CRUD funzioni standalone
export async function createBooking(
  bookingData: Partial<Booking>
): Promise<string> {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Errore creazione prenotazione:", error);
    throw new Error("Impossibile creare la prenotazione");
  }
}

export async function updateBooking(
  bookingId: string,
  updates: Partial<Booking>
): Promise<void> {
  try {
    const docRef = doc(bookingsCollection, bookingId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Errore aggiornamento prenotazione:", error);
    throw new Error("Impossibile aggiornare la prenotazione");
  }
}

// --- FINE FILE ---
