import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Book from './pages/Book';
import MyBookings from './pages/MyBookings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <div className="app-layout">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/book" element={<Book />} />
              <Route path="/bookings" element={<MyBookings />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>© {new Date().getFullYear()} ABC Hotel — All rights reserved.</p>
          </footer>
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
