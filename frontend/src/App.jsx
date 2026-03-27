import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import BookingForm from './pages/BookingForm';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/book/:roomId" element={<BookingForm />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
