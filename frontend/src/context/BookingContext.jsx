import { createContext, useContext, useState } from 'react';
import { rooms as initialRooms, calculatePrice, findAvailableRoom } from '../data';

const BookingContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [availableRooms, setAvailableRooms] = useState(initialRooms);
  const [bookings, setBookings] = useState([]);

  function makeBooking({ userId, dateFrom, dateTo, guestCount, prepaid }) {
    const room = findAvailableRoom(availableRooms, guestCount);
    if (!room) {
      throw new Error(`No room available for ${guestCount} guests.`);
    }
    const price = calculatePrice(guestCount, dateFrom, dateTo);
    const bookingId = `BK-${Date.now()}`;
    const booking = {
      id: bookingId,
      userId,
      dateFrom,
      dateTo,
      guestCount,
      prepaid,
      roomId: room.id,
      roomType: room.type,
      price,
    };
    setBookings((prev) => [...prev, booking]);
    setAvailableRooms((prev) => prev.filter((r) => r.id !== room.id));
    return bookingId;
  }

  function cancelBooking(bookingId) {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    const restored = initialRooms.find((r) => r.id === booking.roomId);
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    if (restored) {
      setAvailableRooms((prev) => [...prev, restored]);
    }
  }

  return (
    <BookingContext.Provider value={{ availableRooms, bookings, makeBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
