import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { calculatePrice } from '../data';
import './BookingForm.css';

const today = new Date().toISOString().split('T')[0];

export default function BookingForm() {
  const { makeBooking, availableRooms } = useBooking();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: '',
    dateFrom: today,
    dateTo: '',
    guestCount: 2,
    prepaid: false,
  });
  const [error, setError] = useState('');

  const nights =
    form.dateFrom && form.dateTo
      ? Math.max(
          0,
          Math.round(
            (new Date(form.dateTo) - new Date(form.dateFrom)) /
              (24 * 60 * 60 * 1000)
          )
        )
      : 0;

  const estimatedPrice =
    nights > 0 ? calculatePrice(form.guestCount, form.dateFrom, form.dateTo) : 0;

  const availableCapacities = [...new Set(availableRooms.map((r) => r.capacity))].sort(
    (a, b) => a - b
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value,
    }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.userId.trim()) {
      setError('Please enter your name or user ID.');
      return;
    }
    if (!form.dateTo || nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    if (!availableCapacities.includes(form.guestCount)) {
      setError(`No available rooms for ${form.guestCount} guests. Available capacities: ${availableCapacities.join(', ')}.`);
      return;
    }

    try {
      const bookingId = makeBooking({ ...form });
      navigate('/bookings', { state: { newBookingId: bookingId } });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">Your Name / User ID</label>
        <input
          id="userId"
          name="userId"
          type="text"
          placeholder="e.g. John Smith"
          value={form.userId}
          onChange={handleChange}
          required
        />
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
            required
          />
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
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="guestCount">Number of Guests</label>
        <select
          id="guestCount"
          name="guestCount"
          value={form.guestCount}
          onChange={handleChange}
        >
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} guests {availableCapacities.includes(n) ? '' : '(unavailable)'}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group form-check">
        <input
          id="prepaid"
          name="prepaid"
          type="checkbox"
          checked={form.prepaid}
          onChange={handleChange}
        />
        <label htmlFor="prepaid">Pre-pay now</label>
      </div>

      {nights > 0 && (
        <div className="price-estimate">
          <span>Estimated total:</span>
          <span className="price-value">${estimatedPrice.toFixed(2)}</span>
          <span className="price-detail">
            ({nights} night{nights !== 1 ? 's' : ''} × {form.guestCount} guests × $50/night)
          </span>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={availableRooms.length === 0}>
        {availableRooms.length === 0 ? 'No Rooms Available' : 'Confirm Booking'}
      </button>
    </form>
  );
}
