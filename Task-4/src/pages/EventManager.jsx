import { useEffect, useState } from 'react';
import HomePage from '../components/home/HomePage.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import TopNav from '../components/layout/TopNav.jsx';
import EditForm from '../components/tasks/EditForm.jsx';
import TaskPanel from '../components/tasks/TaskPanel.jsx';

export default function EventManager() {
  const [events, setEvents] = useState(getSavedEvents);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState('home');
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('eventTasks', JSON.stringify(events));
  }, [events]);

  const filteredEvents = events.filter(event => {
    const foundBySearch = event.name.toLowerCase().includes(search.toLowerCase());
    const foundByTab = tab === 'All' || event.status === tab;
    return foundBySearch && foundByTab;
  });

  const addEvent = event => {
    setEvents([...events, { id: crypto.randomUUID(), ...event }]);
  };

  const updateEvent = updatedEvent => {
    setEvents(events.map(event => (
      event.id === updatedEvent.id ? updatedEvent : event
    )));
    setEditingEvent(null);
  };

  const toggleSelected = id => {
    setSelectedIds(selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    );
  };

  const toggleAllVisible = () => {
    const visibleIds = filteredEvents.map(event => event.id);
    const allSelected = visibleIds.every(id => selectedIds.includes(id));
    const hiddenSelectedIds = selectedIds.filter(id => !visibleIds.includes(id));

    setSelectedIds(allSelected
      ? hiddenSelectedIds
      : [...hiddenSelectedIds, ...visibleIds]
    );
  };

  const deleteSelected = () => {
    setEvents(events.filter(event => !selectedIds.includes(event.id)));
    setSelectedIds([]);
  };

  return (
    <div className="app-page">
      <TopNav onHomeClick={() => setPage('home')} />

      <div className="app-shell">
        <Sidebar
          page={page}
          totalEvents={events.length}
          onPageChange={setPage}
        />

        <main className={page === 'tasks' ? 'main-content tasks-view' : 'main-content'}>
          {page === 'home' ? (
            <HomePage total={events.length} />
          ) : (
            <TaskPanel
              events={filteredEvents}
              search={search}
              tab={tab}
              selectedIds={selectedIds}
              onSearchChange={setSearch}
              onTabChange={setTab}
              onAdd={addEvent}
              onDeleteSelected={deleteSelected}
              onToggleSelected={toggleSelected}
              onToggleAll={toggleAllVisible}
              onEdit={setEditingEvent}
            />
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

function getSavedEvents() {
  return JSON.parse(localStorage.getItem('eventTasks')) || [];
}
