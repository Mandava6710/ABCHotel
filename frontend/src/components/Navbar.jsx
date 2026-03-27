import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🏨 ABC Hotel
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className={({ isActive }) => isActive ? 'active' : ''}>
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/book" className={({ isActive }) => isActive ? 'active' : ''}>
            Book Now
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
            My Bookings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
