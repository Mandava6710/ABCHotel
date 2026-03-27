import { Link, useLocation } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { bookings } = useBookings();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🏨</span>
          <span className="brand-name">ABC Hotel</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/rooms" className={location.pathname === '/rooms' ? 'active' : ''}>
            Rooms
          </Link>
        </li>
        <li>
          <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>
            My Bookings
            {bookings.length > 0 && (
              <span className="badge">{bookings.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
