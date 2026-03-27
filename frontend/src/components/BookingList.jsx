import { useBooking } from '../context/BookingContext';
import './BookingList.css';

export default function BookingList({ highlightId }) {
  const { bookings, cancelBooking } = useBooking();

  if (bookings.length === 0) {
    return (
      <div className="booking-empty">
        <p>You have no bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="booking-list">
      {bookings.map((b) => (
        <div
          key={b.id}
          className={`booking-item${b.id === highlightId ? ' booking-item--new' : ''}`}
        >
          <div className="booking-header">
            <span className="booking-id">#{b.id}</span>
            <span className={`booking-status ${b.prepaid ? 'paid' : 'pending'}`}>
              {b.prepaid ? 'Pre-paid' : 'Pay on arrival'}
            </span>
          </div>
          <div className="booking-details">
            <div>
              <span className="detail-label">Guest:</span> {b.userId}
            </div>
            <div>
              <span className="detail-label">Room:</span> {b.roomId} ({b.roomType})
            </div>
            <div>
              <span className="detail-label">Dates:</span> {b.dateFrom} → {b.dateTo}
            </div>
            <div>
              <span className="detail-label">Guests:</span> {b.guestCount}
            </div>
            <div>
              <span className="detail-label">Total:</span>{' '}
              <span className="booking-price">${b.price.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="btn-cancel"
            onClick={() => cancelBooking(b.id)}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}
