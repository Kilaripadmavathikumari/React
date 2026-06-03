export default function TopNav({ onHomeClick }) {
  return (
    <nav className="top-nav">
      <button className="nav-logo" onClick={onHomeClick}>
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
