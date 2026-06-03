export default function HomePage({ total }) {
  const cards = [
    { value: total, label: 'Total Events' },
    { value: 'Padma', label: 'Organizer' },
    { value: 'Today', label: 'Workspace Status' },
  ];

  return (
    <section className="home-panel">
      <h1>Welcome to EventHub</h1>
      <p>Manage your events, reports, and organizer work from one place.</p>

      <div className="home-grid">
        {cards.map(card => (
          <div key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
