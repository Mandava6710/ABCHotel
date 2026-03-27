import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import './Confirmation.css';

export default function Confirmation() {
  const { bookingId } = useParams();
  const { bookings } = useBookings();
  const booking = bookings.find((b) => b.bookingId === bookingId);

  if (!booking) {
    return (
      <div className="confirm-not-found">
        <h2>Booking not found</h2>
        <Link to="/rooms">Browse Rooms</Link>
      </div>
    );
  }

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p className="confirm-sub">
          Thank you, <strong>{booking.userId}</strong>. Your reservation has been placed successfully.
        </p>

        <div className="confirm-details">
          <div className="detail-row">
            <span>Booking ID</span>
            <span className="mono">{booking.bookingId.slice(0, 8).toUpperCase()}…</span>
          </div>
          <div className="detail-row">
            <span>Room</span>
            <span>Room {booking.roomId}</span>
          </div>
          <div className="detail-row">
            <span>Check-in</span>
            <span>{new Date(booking.dateFrom).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="detail-row">
            <span>Check-out</span>
            <span>{new Date(booking.dateTo).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="detail-row">
            <span>Duration</span>
            <span>{booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
          </div>
          <div className="detail-row">
            <span>Guests</span>
            <span>{booking.guestCount}</span>
          </div>
          <div className="detail-row">
            <span>Payment</span>
            <span>{booking.prepaid ? '✅ Prepaid' : '🕐 Pay on arrival'}</span>
          </div>
          <div className="detail-row total">
            <span>Total</span>
            <span>${booking.price} <em>(€{booking.priceEuro})</em></span>
          </div>
        </div>

        <p className="confirm-email-note">
          📧 A confirmation email has been sent to your registered address.
        </p>

        <div className="confirm-actions">
          <Link to="/my-bookings" className="btn-bookings">View My Bookings</Link>
          <Link to="/rooms" className="btn-rooms">Book Another Room</Link>
        </div>
      </div>
    </div>
  );
}
