// Static room data matching the Java RoomService
export const rooms = [
  { id: '1.1', capacity: 2, type: 'Standard Double', pricePerNight: 50, image: null },
  { id: '1.2', capacity: 2, type: 'Deluxe Double', pricePerNight: 50, image: null },
  { id: '1.3', capacity: 5, type: 'Family Suite', pricePerNight: 50, image: null },
  { id: '2.1', capacity: 3, type: 'Triple Room', pricePerNight: 50, image: null },
  { id: '2.2', capacity: 4, type: 'Quad Room', pricePerNight: 50, image: null },
];

export const BASE_PRICE_USD = 50.0;

export function calculatePrice(guestCount, dateFrom, dateTo) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const nights = Math.round((new Date(dateTo) - new Date(dateFrom)) / msPerDay);
  return BASE_PRICE_USD * guestCount * nights;
}

export function findAvailableRoom(rooms, guestCount) {
  return rooms.find((r) => r.capacity === guestCount) || null;
}
