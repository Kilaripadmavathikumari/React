import { useState } from 'react'
import './App.css'
import EventForm from './components/EventForm.jsx'
import EventList from './components/EventList.jsx'
import HomePanel from './components/HomePanel.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  const [events, setEvents] = useState([])
  const [eventName, setEventName] = useState('')
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [page, setPage] = useState('home')
  const isEditing = Boolean(editId)

  const resetForm = () => {
    setEventName('')
    setEditId(null)
    setError('')
  }

  const saveEvent = () => {
    const name = eventName.trim()

    if (!name) {
      setError('Please enter an event name.')
      return
    }

    setEvents(isEditing
      ? events.map((event) => event.id === editId ? { ...event, name } : event)
      : [...events, { id: Date.now(), name }]
    )
    resetForm()
  }

  const startEdit = ({ id, name }) => {
    setEventName(name)
    setEditId(id)
    setError('')
  }

  const removeEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
    if (editId === id) resetForm()
  }

  return (
    <div className="app">
      <Navbar onHome={() => setPage('home')} />
      <div className="layout">
        <Sidebar count={events.length} page={page} setPage={setPage} />
        <main className="main">
          {page === 'home' ? (
            <HomePanel count={events.length} onStart={() => setPage('events')} />
          ) : (
            <section className="card">
              <div className="card-head">
                <h1>Event Manager</h1>
                <p className="subtitle">Add, update, and remove your event names in one simple list.</p>
              </div>

              <EventForm
                name={eventName}
                isEditing={isEditing}
                onCancel={resetForm}
                onChange={(value) => {
                  setEventName(value)
                  setError('')
                }}
                onSave={saveEvent}
              />
              {error && <p className="error">{error}</p>}
              <EventList events={events} onEdit={startEdit} onDelete={removeEvent} />
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
