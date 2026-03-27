import { useBooking } from '../context/BookingContext';
import RoomCard from '../components/RoomCard';
import './Rooms.css';

export default function Rooms() {
  const { availableRooms } = useBooking();

  return (
    <div className="rooms-page">
      <div className="page-header">
        <h1>Our Rooms</h1>
        <p>Browse all available rooms and find the perfect fit for your stay.</p>
      </div>
      {availableRooms.length === 0 ? (
        <p className="rooms-empty">All rooms are currently booked. Please check back later.</p>
      ) : (
        <div className="rooms-grid">
          {availableRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
