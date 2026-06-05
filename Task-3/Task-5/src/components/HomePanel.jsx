export default function HomePanel({ total, onOpenEvents }) {
  const cards = [
    [total, 'Total Events'],
    ['Padma', 'Organizer'],
    ['Today', 'Workspace Status'],
  ];

  return (
    <section className="home-panel">
      <h1>Welcome to EventHub</h1>
      <p>Manage your events, reports, and organizer work from one place.</p>

      <div className="home-grid">
        {cards.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <button className="primary home-action" onClick={onOpenEvents}>Manage Events</button>
    </section>
  );
}
