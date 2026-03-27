import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { icon: '🛏️', title: '5 Unique Rooms', desc: 'From cozy doubles to spacious family suites on two floors.' },
  { icon: '📅', title: 'Easy Booking', desc: 'Reserve your room in minutes with our simple booking form.' },
  { icon: '💳', title: 'Prepaid Option', desc: 'Pay upfront and enjoy a hassle-free stay with full peace of mind.' },
  { icon: '💱', title: 'Currency Support', desc: 'View prices in USD and EUR for your convenience.' },
  { icon: '📧', title: 'Confirmation Email', desc: 'Receive instant booking confirmation straight to your inbox.' },
  { icon: '🔒', title: 'Secure Cancellation', desc: 'Cancel any booking easily from your bookings dashboard.' },
];

const testimonials = [
  { name: 'Alice M.', rating: 5, text: 'Absolutely stunning stay! The staff were amazing and the rooms were immaculate.' },
  { name: 'James T.', rating: 5, text: 'Booked the Family Suite for a weekend getaway — best decision ever. Will be back!' },
  { name: 'Priya S.', rating: 4, text: 'Great location, comfortable beds, and the breakfast was delicious. Highly recommend.' },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Welcome to</p>
          <h1 className="hero-title">ABC Hotel</h1>
          <p className="hero-tagline">
            Experience luxury, comfort, and hospitality at its finest.
          </p>
          <div className="hero-actions">
            <Link to="/rooms" className="btn-primary">Browse Rooms</Link>
            <a href="#features" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat"><span className="stat-num">5</span><span>Rooms</span></div>
        <div className="stat"><span className="stat-num">2</span><span>Floors</span></div>
        <div className="stat"><span className="stat-num">$50</span><span>Base Rate / Night</span></div>
        <div className="stat"><span className="stat-num">★ 4.8</span><span>Guest Rating</span></div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Why Choose ABC Hotel?</h2>
          <p>We offer everything you need for an unforgettable stay</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready for Your Perfect Stay?</h2>
          <p>Book your room today and enjoy our world-class hospitality.</p>
          <Link to="/rooms" className="btn-primary large">View Available Rooms</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Guests Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <p className="testimonial-author">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 ABC Hotel. All rights reserved.</p>
        <p className="footer-sub">Comfort. Luxury. Hospitality.</p>
      </footer>
    </div>
  );
}
