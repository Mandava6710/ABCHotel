import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../data/rooms';
import { useBookings } from '../context/BookingContext';
import './BookingForm.css';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export default function BookingForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { makeBooking } = useBookings();
  const room = getRoomById(roomId);

  const [form, setForm] = useState({
    userId: '',
    dateFrom: today,
    dateTo: tomorrow,
    guestCount: room ? room.capacity : 1,
    prepaid: false,
  });

  const [errors, setErrors] = useState({});

  if (!room) {
    return (
      <div className="booking-not-found">
        <h2>Room not found</h2>
        <button onClick={() => navigate('/rooms')}>Back to Rooms</button>
      </div>
    );
  }

  const nights = Math.max(
    1,
    Math.ceil((new Date(form.dateTo) - new Date(form.dateFrom)) / 86400000)
  );
  const price = 50 * form.guestCount * nights;
  const priceEuro = (price * 0.85).toFixed(2);

  const validate = () => {
    const e = {};
    if (!form.userId.trim()) e.userId = 'Guest name is required.';
    if (!form.dateFrom) e.dateFrom = 'Check-in date is required.';
    if (!form.dateTo) e.dateTo = 'Check-out date is required.';
    if (new Date(form.dateTo) <= new Date(form.dateFrom))
      e.dateTo = 'Check-out must be after check-in.';
    if (form.guestCount < 1 || form.guestCount > room.capacity)
      e.guestCount = `Guests must be between 1 and ${room.capacity}.`;
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const booking = makeBooking({ ...form, roomId: room.id });
    navigate(`/confirmation/${booking.bookingId}`);
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-room-info">
          <img src={room.image} alt={room.name} className="booking-room-img" />
          <div className="booking-room-details">
            <span className="booking-room-type">{room.type}</span>
            <h2>{room.name}</h2>
            <p>Room {room.id} · Floor {room.floor}</p>
            <p className="booking-capacity">👤 Up to {room.capacity} guests</p>
            <div className="booking-price-preview">
              <span className="bp-nights">{nights} night{nights !== 1 ? 's' : ''}</span>
              <span className="bp-total">${price} <span className="bp-eur">(€{priceEuro})</span></span>
            </div>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <h3>Booking Details</h3>

          <div className="form-group">
            <label htmlFor="userId">Full Name</label>
            <input
              id="userId"
              name="userId"
              type="text"
              placeholder="Your full name"
              value={form.userId}
              onChange={handleChange}
              className={errors.userId ? 'error' : ''}
            />
            {errors.userId && <span className="form-error">{errors.userId}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateFrom">Check-in Date</label>
              <input
                id="dateFrom"
                name="dateFrom"
                type="date"
                value={form.dateFrom}
                min={today}
                onChange={handleChange}
                className={errors.dateFrom ? 'error' : ''}
              />
              {errors.dateFrom && <span className="form-error">{errors.dateFrom}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="dateTo">Check-out Date</label>
              <input
                id="dateTo"
                name="dateTo"
                type="date"
                value={form.dateTo}
                min={form.dateFrom || today}
                onChange={handleChange}
                className={errors.dateTo ? 'error' : ''}
              />
              {errors.dateTo && <span className="form-error">{errors.dateTo}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guestCount">Number of Guests</label>
            <input
              id="guestCount"
              name="guestCount"
              type="number"
              min={1}
              max={room.capacity}
              value={form.guestCount}
              onChange={handleChange}
              className={errors.guestCount ? 'error' : ''}
            />
            {errors.guestCount && <span className="form-error">{errors.guestCount}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="prepaid"
                checked={form.prepaid}
                onChange={handleChange}
              />
              <span>Pay upfront (Prepaid booking)</span>
            </label>
            {form.prepaid && price > 200 && form.guestCount < 3 && (
              <p className="form-warning">
                ⚠️ Prepaid bookings over $200 require at least 3 guests.
              </p>
            )}
          </div>

          <div className="booking-summary">
            <div className="summary-row">
              <span>Base rate</span>
              <span>$50 × {form.guestCount} guests × {nights} night{nights !== 1 ? 's' : ''}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${price} <em>(€{priceEuro})</em></span>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
