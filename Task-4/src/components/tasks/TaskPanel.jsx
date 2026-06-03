import EventForm from './EventForm.jsx';
import EventTable from './EventTable.jsx';
import SearchBar from './SearchBar.jsx';
import StatusTabs from './StatusTabs.jsx';

export default function TaskPanel({
  events,
  search,
  tab,
  selectedIds,
  onSearchChange,
  onTabChange,
  onAdd,
  onDeleteSelected,
  onToggleSelected,
  onToggleAll,
  onEdit,
}) {
  return (
    <section className="task-panel">
      <div className="panel-header">
        <h1>Events</h1>
        <StatusTabs active={tab} onChange={onTabChange} />
      </div>

      <div className="panel-tools">
        <SearchBar value={search} onChange={onSearchChange} />
        <button
          className="danger-soft"
          disabled={!selectedIds.length}
          onClick={onDeleteSelected}
        >
          Delete Selected
        </button>
      </div>

      <EventForm onAdd={onAdd} />

      <EventTable
        events={events}
        selectedIds={selectedIds}
        onToggleSelected={onToggleSelected}
        onToggleAll={onToggleAll}
        onEdit={onEdit}
      />
    </section>
  );
}
