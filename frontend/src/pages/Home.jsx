import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import './Home.css';

const features = [
  { icon: '🛏️', title: 'Comfortable Rooms', desc: 'Choose from standard doubles to spacious family suites.' },
  { icon: '📅', title: 'Easy Booking', desc: 'Book your stay in seconds with our simple online form.' },
  { icon: '💳', title: 'Flexible Payment', desc: 'Pay upfront or settle on arrival — your choice.' },
  { icon: '✉️', title: 'Instant Confirmation', desc: 'Receive an immediate booking confirmation.' },
];

export default function Home() {
  const { availableRooms, bookings } = useBooking();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ABC Hotel</h1>
          <p>Experience comfort and luxury in the heart of the city. Your perfect stay starts here.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{availableRooms.length}</span>
              <span className="stat-label">Rooms Available</span>
            </div>
            <div className="stat">
              <span className="stat-value">{bookings.length}</span>
              <span className="stat-label">Active Bookings</span>
            </div>
            <div className="stat">
              <span className="stat-value">5</span>
              <span className="stat-label">Room Types</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/book" className="btn-hero-primary">Book a Room</Link>
            <Link to="/rooms" className="btn-hero-secondary">View All Rooms</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose ABC Hotel?</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
