import { useLocation } from 'react-router-dom';
import BookingList from '../components/BookingList';
import './MyBookings.css';

export default function MyBookings() {
  const location = useLocation();
  const newBookingId = location.state?.newBookingId;

  return (
    <div className="my-bookings-page">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Manage your current reservations at ABC Hotel.</p>
      </div>
      {newBookingId && (
        <div className="booking-success">
          ✅ Booking <strong>{newBookingId}</strong> confirmed! Scroll down to see your reservation.
        </div>
      )}
      <BookingList highlightId={newBookingId} />
    </div>
  );
}
