import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Don't show footer on auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} Inventory Management System. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
