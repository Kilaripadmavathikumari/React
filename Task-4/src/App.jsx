import { useEffect, useState } from 'react';
import './App.css';
import EditForm from './components/EditForm.jsx';
import EventForm from './components/EventForm.jsx';
import EventList from './components/EventList.jsx';
import HomePanel from './components/HomePanel.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

export default function App() {
  const [events, setEvents] = useState(getSavedEvents);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState('home');
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('eventTasks', JSON.stringify(events));
  }, [events]);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
    && (tab === 'All' || event.status === tab)
  );

  const addEvent = event =>
    setEvents([...events, { id: crypto.randomUUID(), ...event }]);

  const updateEvent = updatedEvent => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setEditingEvent(null);
  };

  const toggleSelected = id =>
    setSelectedIds(selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    );

  const toggleAllVisible = () => {
    const visibleIds = filteredEvents.map(event => event.id);
    const allSelected = visibleIds.every(id => selectedIds.includes(id));
    const hiddenIds = selectedIds.filter(id => !visibleIds.includes(id));

    setSelectedIds(allSelected ? hiddenIds : [...hiddenIds, ...visibleIds]);
  };

  const deleteSelected = () => {
    setEvents(events.filter(event => !selectedIds.includes(event.id)));
    setSelectedIds([]);
  };

  return (
    <div className="app-page">
      <Navbar onHome={() => setPage('home')} />

      <div className="app-shell">
        <Sidebar page={page} totalEvents={events.length} onPageChange={setPage} />

        <main className={page === 'tasks' ? 'main-content tasks-view' : 'main-content'}>
          {page === 'home' ? (
            <HomePanel total={events.length} />
          ) : (
            <section className="task-panel">
              <div className="panel-header">
                <h1>Events</h1>
                <StatusTabs active={tab} onChange={setTab} />
              </div>

              <div className="panel-tools">
                <input
                  className="search"
                  placeholder="Search event"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
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
                onToggleSelected={toggleSelected}
                onToggleAll={toggleAllVisible}
                onEdit={setEditingEvent}
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

function StatusTabs({ active, onChange }) {
  const tabs = ['All', 'Todo', 'Done', 'In Progress'];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={active === tab ? 'tab active' : 'tab'}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function getSavedEvents() {
  return JSON.parse(localStorage.getItem('eventTasks')) || [];
}
