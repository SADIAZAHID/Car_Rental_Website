import { createContext, useContext, useEffect, useState } from 'react';

const BookingContext = createContext(null);
const BOOKINGS_KEY = 'drivenow_bookings';

function readBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readBookings);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function addBooking(booking) {
    const record = {
      id: `bk_${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...booking,
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  }

  function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function removeBooking(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateStatus, removeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
}