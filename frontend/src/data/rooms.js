// Room data matching the Java backend RoomService
export const rooms = [
  {
    id: '1.1',
    capacity: 2,
    name: 'Cozy Double Room',
    floor: 1,
    type: 'Standard',
    pricePerNight: 100, // $50/night × 2 guests
    description: 'A comfortable room for two guests with modern amenities and garden view.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar'],
  },
  {
    id: '1.2',
    capacity: 2,
    name: 'Deluxe Double Room',
    floor: 1,
    type: 'Deluxe',
    pricePerNight: 100,
    description: 'An upgraded double room featuring premium bedding and city views.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat Screen TV', 'Coffee Machine', 'Safe'],
  },
  {
    id: '1.3',
    capacity: 5,
    name: 'Family Suite',
    floor: 1,
    type: 'Suite',
    pricePerNight: 250, // $50/night × 5 guests
    description: 'Spacious family suite with separate living area, perfect for larger groups.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Flat Screen TVs', 'Kitchenette', 'Balcony', 'Safe'],
  },
  {
    id: '2.1',
    capacity: 3,
    name: 'Triple Room',
    floor: 2,
    type: 'Standard',
    pricePerNight: 150, // $50/night × 3 guests
    description: 'Ideal for small groups, this triple room offers extra comfort with a pool view.',
    image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=600&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Pool View'],
  },
  {
    id: '2.2',
    capacity: 4,
    name: 'Executive Room',
    floor: 2,
    type: 'Deluxe',
    pricePerNight: 200, // $50/night × 4 guests
    description: 'Premium executive room for up to four guests with stunning panoramic views.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat Screen TV', 'Coffee Machine', 'Balcony', 'Bathtub'],
  },
];

export const getRoomById = (id) => rooms.find((r) => r.id === id);
