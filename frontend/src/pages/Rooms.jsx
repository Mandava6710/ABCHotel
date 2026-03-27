import { useState } from 'react';
import { rooms } from '../data/rooms';
import RoomCard from '../components/RoomCard';
import './Rooms.css';

export default function Rooms() {
  const [guestFilter, setGuestFilter] = useState(0);

  const filtered = guestFilter
    ? rooms.filter((r) => r.capacity >= guestFilter)
    : rooms;

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Our Rooms</h1>
        <p>Choose the perfect room for your stay</p>
      </div>

      <div className="rooms-filter">
        <label htmlFor="guest-filter">Filter by guests:</label>
        <select
          id="guest-filter"
          value={guestFilter}
          onChange={(e) => setGuestFilter(Number(e.target.value))}
        >
          <option value={0}>All rooms</option>
          <option value={2}>2+ guests</option>
          <option value={3}>3+ guests</option>
          <option value={4}>4+ guests</option>
          <option value={5}>5 guests</option>
        </select>
        <span className="rooms-count">{filtered.length} room{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      <div className="rooms-grid">
        {filtered.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rooms-empty">
          <span>😔</span>
          <p>No rooms found for {guestFilter} guests. Try a different filter.</p>
        </div>
      )}
    </div>
  );
}
