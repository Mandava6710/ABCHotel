import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BookingContext = createContext();

const initialState = {
  bookings: [],
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.bookingId !== action.payload),
      };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const makeBooking = (bookingData) => {
    const nights = Math.max(
      1,
      Math.ceil(
        (new Date(bookingData.dateTo) - new Date(bookingData.dateFrom)) /
          (1000 * 60 * 60 * 24)
      )
    );
    const price = 50 * bookingData.guestCount * nights;
    const priceEuro = +(price * 0.85).toFixed(2);
    const booking = {
      bookingId: uuidv4(),
      ...bookingData,
      price,
      priceEuro,
      nights,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_BOOKING', payload: booking });
    return booking;
  };

  const cancelBooking = (bookingId) => {
    dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
  };

  return (
    <BookingContext.Provider value={{ bookings: state.bookings, makeBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);
