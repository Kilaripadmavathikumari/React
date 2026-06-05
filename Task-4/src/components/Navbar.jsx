export default function Navbar({ onHome }) {
  return (
    <nav className="top-nav">
      <button className="nav-logo" onClick={onHome}>
        <span className="react-logo">React</span>
        <strong>EventHub</strong>
      </button>

      <div className="nav-right">
        <span className="avatar">P</span>
        <span>
          Padma
          <small>Organizer</small>
        </span>
      </div>
    </nav>
  );
}
