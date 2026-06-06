import { useEffect, useState } from 'react';
import './App.css';
import EditForm from './components/EditForm.jsx';
import EventForm from './components/EventForm.jsx';
import EventList from './components/EventList.jsx';
import HomePanel from './components/HomePanel.jsx';
import Navbar from './components/Navbar.jsx';
import { statuses } from './components/StatusSelect.jsx';

const statusTabs = ['All', ...statuses];

export default function App() {
  const [events, setEvents] = useState(getSavedEvents);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('taskFiveEvents', JSON.stringify(events));
  }, [events]);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
      && (tab === 'All' || event.status === tab)
  );

  const addEvent = event => {
    setEvents([...events, { id: crypto.randomUUID(), ...event }]);
  };

  const updateEvent = updatedEvent => {
    setEvents(events.map(event => (
      event.id === updatedEvent.id ? updatedEvent : event
    )));
    setEditingEvent(null);
    setSelectedIds([]);
  };

  const toggleSelected = id => setSelectedIds(
    selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
  );

  const toggleAllVisible = () => {
    const visibleIds = filteredEvents.map(event => event.id);
    const allSelected = visibleIds.every(id => selectedIds.includes(id));
    const selectedHiddenIds = selectedIds.filter(id => !visibleIds.includes(id));

    setSelectedIds(allSelected ? selectedHiddenIds : [...selectedHiddenIds, ...visibleIds]);
  };

  const confirmDelete = () => {
    setEvents(events.filter(event => !selectedIds.includes(event.id)));
    setSelectedIds([]);
    setShowDeletePopup(false);
  };

  const clearSelected = () => setSelectedIds([]);
  const openHome = () => setPage('home');
  const openEvents = () => setPage('events');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className={`app-page ${theme}-theme`}>
      <Navbar theme={theme} onHome={openHome} onThemeChange={toggleTheme} />

      <div className="app-shell">
        <main className={page === 'events' ? 'main-content events-view' : 'main-content'}>
          {page === 'home' ? (
            <HomePanel total={events.length} onOpenEvents={openEvents} />
          ) : (
            <section className="event-panel">
              <div className="panel-header">
                <h1>Events</h1>
                <StatusTabs activeTab={tab} onChange={setTab} />
              </div>

              <div className="panel-tools">
                <label className="search-box">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16.5 16.5 4 4" />
                  </svg>
                  <input
                    className="search"
                    placeholder="Search event"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                  />
                </label>
              </div>

              <EventForm onAdd={addEvent} />
              <EventList
                events={filteredEvents}
                selectedIds={selectedIds}
                onClearSelected={clearSelected}
                onDeleteSelected={() => setShowDeletePopup(true)}
                onEdit={setEditingEvent}
                onToggleAll={toggleAllVisible}
                onToggleSelected={toggleSelected}
              />
            </section>
          )}
        </main>
      </div>

      {editingEvent && (
        <EditForm event={editingEvent} onCancel={() => setEditingEvent(null)} onSave={updateEvent} />
      )}

      {showDeletePopup && (
        <div className="modal-backdrop">
          <div className="edit-card delete-card">
            <h2>Delete Events?</h2>
            <p>Are you sure you want to delete selected events?</p>
            <div className="edit-actions">
              <button type="button" onClick={() => setShowDeletePopup(false)}>Cancel</button>
              <button className="primary" type="button" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusTabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      {statusTabs.map(tab => (
        <button
          key={tab}
          className={activeTab === tab ? 'tab active' : 'tab'}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function getSavedEvents() {
  return JSON.parse(localStorage.getItem('taskFiveEvents')) || [];
}
