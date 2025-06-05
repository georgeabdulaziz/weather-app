export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Weather App</h3>
          <p>Get accurate weather information for any location</p>
        </div>
        <div className="footer-section">
          <h3>Developed by</h3>
          <a 
            href="https://georgeabdulaziz.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            George Abdulaziz
          </a>
          <p>For TVO Job Assignment</p>
        </div>
      </div>
    </footer>
  );
} 