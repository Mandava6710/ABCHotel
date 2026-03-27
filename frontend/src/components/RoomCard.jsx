import { Link } from 'react-router-dom';
import './RoomCard.css';

export default function RoomCard({ room }) {
  return (
    <div className="room-card">
      <div className="room-image-wrap">
        <img src={room.image} alt={room.name} className="room-image" />
        <span className="room-type-badge">{room.type}</span>
      </div>
      <div className="room-body">
        <div className="room-header">
          <h3 className="room-name">{room.name}</h3>
          <span className="room-id">Room {room.id}</span>
        </div>
        <p className="room-description">{room.description}</p>
        <div className="room-meta">
          <span className="room-capacity">👤 Up to {room.capacity} guests</span>
          <span className="room-floor">🏢 Floor {room.floor}</span>
        </div>
        <ul className="room-amenities">
          {room.amenities.slice(0, 4).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <div className="room-footer">
          <div className="room-price">
            <span className="price-amount">${room.pricePerNight}</span>
            <span className="price-label"> / night</span>
          </div>
          <Link to={`/book/${room.id}`} className="btn-book">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
