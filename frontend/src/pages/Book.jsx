import BookingForm from '../components/BookingForm';
import './Book.css';

export default function Book() {
  return (
    <div className="book-page">
      <div className="page-header">
        <h1>Book a Room</h1>
        <p>Fill in your details to reserve your perfect room at ABC Hotel.</p>
      </div>
      <BookingForm />
    </div>
  );
}
