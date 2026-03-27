import { Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import { getRoomById } from '../data/rooms';
import './MyBookings.css';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();

  const handleCancel = (bookingId, userId) => {
    if (window.confirm(`Cancel booking for ${userId}? This action cannot be undone.`)) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your current reservations</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bookings-empty">
          <span>📋</span>
          <h3>No bookings yet</h3>
          <p>You haven&apos;t made any reservations. Start by browsing our rooms.</p>
          <Link to="/rooms" className="btn-browse">Browse Rooms</Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const room = getRoomById(booking.roomId);
            return (
              <div key={booking.bookingId} className="booking-item">
                {room && (
                  <div className="booking-room-thumb">
                    <img src={room.image} alt={room.name} />
                  </div>
                )}
                <div className="booking-info">
                  <div className="booking-info-top">
                    <div>
                      <h3 className="booking-room-name">{room ? room.name : `Room ${booking.roomId}`}</h3>
                      <span className="booking-id">ID: {booking.bookingId.slice(0, 8).toUpperCase()}…</span>
                    </div>
                    <div className="booking-price-tag">
                      ${booking.price}
                      <span>€{booking.priceEuro}</span>
                    </div>
                  </div>

                  <div className="booking-meta-grid">
                    <div className="bm-item">
                      <span className="bm-label">Guest</span>
                      <span>{booking.userId}</span>
                    </div>
                    <div className="bm-item">
                      <span className="bm-label">Check-in</span>
                      <span>{new Date(booking.dateFrom).toLocaleDateString()}</span>
                    </div>
                    <div className="bm-item">
                      <span className="bm-label">Check-out</span>
                      <span>{new Date(booking.dateTo).toLocaleDateString()}</span>
                    </div>
                    <div className="bm-item">
                      <span className="bm-label">Nights</span>
                      <span>{booking.nights}</span>
                    </div>
                    <div className="bm-item">
                      <span className="bm-label">Guests</span>
                      <span>{booking.guestCount}</span>
                    </div>
                    <div className="bm-item">
                      <span className="bm-label">Payment</span>
                      <span>{booking.prepaid ? '✅ Prepaid' : '🕐 On arrival'}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancel(booking.bookingId, booking.userId)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
