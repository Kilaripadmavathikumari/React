function HomePanel({ count, onStart }) {
  return (
    <section className="card home-panel">
      <p className="eyebrow">Welcome back, Padma</p>
      <h1>Plan your events from one simple place.</h1>
      <section className="stats">
        <b>{count}</b>
        <span>{count === 1 ? 'event saved' : 'events saved'}</span>
      </section>
      <button onClick={onStart}>Manage Events</button>
    </section>
  )
}

export default HomePanel
