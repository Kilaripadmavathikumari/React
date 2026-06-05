export default function Navbar({ theme, onHome, onThemeChange }) {
  return (
    <nav className="top-nav">
      <button className="nav-logo" onClick={onHome}>
        <span className="react-logo">React</span>
        <strong>EventHub</strong>
      </button>

      <div className="nav-right">
        <button className="home-button" onClick={onHome} aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5.5 10.5V20h13v-9.5" />
            <path d="M9.5 20v-6h5v6" />
          </svg>
        </button>
        <button className="theme-toggle" onClick={onThemeChange}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <span className="avatar">P</span>
        <span>
          Padma
          <small>Organizer</small>
        </span>
      </div>
    </nav>
  );
}
