const menuItems = [
  ['home', 'H', 'Home'],
  ['tasks', 'E', 'Events'],
];

export default function Sidebar({ page, totalEvents, onPageChange }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <span className="brand-mark">EH</span>
          <span>
            EventHub
            <small>Workspace</small>
          </span>
        </div>

        <nav className="menu">
          {menuItems.map(([id, icon, label]) => (
            <button
              key={id}
              className={page === id ? 'menu-item active' : 'menu-item'}
              onClick={() => onPageChange(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <p>Total Events</p>
        <strong>{totalEvents}</strong>
      </div>
    </aside>
  );
}
