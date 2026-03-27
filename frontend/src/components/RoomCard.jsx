import './RoomCard.css';

export default function RoomCard({ room }) {
  const icons = {
    2: '🛏️',
    3: '🛏️🛏️',
    4: '🛏️🛏️🛏️',
    5: '🛏️🛏️🛏️🛏️',
  };

  return (
    <div className="room-card">
      <div className="room-icon">{icons[room.capacity] || '🛏️'}</div>
      <div className="room-info">
        <h3 className="room-id">Room {room.id}</h3>
        <p className="room-type">{room.type}</p>
        <p className="room-capacity">Capacity: {room.capacity} guest{room.capacity !== 1 ? 's' : ''}</p>
        <p className="room-price">${room.pricePerNight} / night per guest</p>
      </div>
    </div>
  );
}
