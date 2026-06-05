import { useEffect, useState } from 'react';
import './App.css';
import EditForm from './components/EditForm.jsx';
import EventForm from './components/EventForm.jsx';
import EventList from './components/EventList.jsx';
import HomePanel from './components/HomePanel.jsx';
import Navbar from './components/Navbar.jsx';

const statusTabs = ['All', 'Todo', 'In Progress', 'Done'];

export default function App() {
  const [events, setEvents] = useState(getSavedEvents);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('taskFiveEvents', JSON.stringify(events));
  }, [events]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === 'All' || event.status === tab;
    return matchesSearch && matchesTab;
  });

  const addEvent = event => {
    setEvents([...events, { id: crypto.randomUUID(), ...event }]);
  };

  const updateEvent = updatedEvent => {
    const nextEvents = events.map(event => (
      event.id === updatedEvent.id ? updatedEvent : event
    ));

    setEvents(nextEvents);
    setEditingEvent(null);
  };

  const toggleSelected = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleAllVisible = () => {
    const visibleIds = filteredEvents.map(event => event.id);
    const allSelected = visibleIds.every(id => selectedIds.includes(id));
    const selectedHiddenIds = selectedIds.filter(id => !visibleIds.includes(id));

    setSelectedIds(allSelected ? selectedHiddenIds : [...selectedHiddenIds, ...visibleIds]);
  };

  const deleteSelected = () => {
    setEvents(events.filter(event => !selectedIds.includes(event.id)));
    setSelectedIds([]);
  };

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
                <button
                  className="danger-soft"
                  disabled={!selectedIds.length}
                  onClick={deleteSelected}
                >
                  Delete Selected
                </button>
              </div>

              <EventForm onAdd={addEvent} />
              <EventList
                events={filteredEvents}
                selectedIds={selectedIds}
                onEdit={setEditingEvent}
                onToggleAll={toggleAllVisible}
                onToggleSelected={toggleSelected}
              />
            </section>
          )}
        </main>
      </div>

      {editingEvent && (
        <EditForm
          event={editingEvent}
          onCancel={() => setEditingEvent(null)}
          onSave={updateEvent}
        />
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
