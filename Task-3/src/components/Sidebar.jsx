function Sidebar({ count, page, setPage }) {
  return (
    <aside className="sidebar">
      {['home', 'events'].map((item) => (
        <button
          key={item}
          className={page === item ? 'side-link active' : 'side-link'}
          onClick={() => setPage(item)}
        >
          {item === 'home' ? 'Home' : 'Add Event'}
        </button>
      ))}
      <p className="side-count"><b>{count}</b>Total events</p>
    </aside>
  )
}

export default Sidebar
