function Navbar({ onHome }) {
  return (
    <nav className="navbar">
      <button className="brand" onClick={onHome}>
        <img src="/react.svg" alt="" /> EventHub
      </button>
      <div className="profile">
        <span>P</span>
        <b>Padma</b>
      </div>
    </nav>
  )
}

export default Navbar
