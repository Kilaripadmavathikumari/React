const columns = ['select', 'key', 'name', 'status'];
const headings = ['Key', 'Name', 'Status'];
const icons = {
  close: ['m6 6 12 12M18 6 6 18'],
  edit: ['m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z', 'm14 7 3 3'],
  delete: ['M4 7h16', 'M10 11v6M14 11v6', 'm6 7 1 13h10l1-13', 'M9 7V4h6v3'],
};

export default function EventList({
  events,
  selectedIds,
  onClearSelected,
  onDeleteSelected,
  onEdit,
  onToggleAll,
  onToggleSelected,
}) {
  const allSelected = events.length > 0
    && events.every(event => selectedIds.includes(event.id));
  const selectedCount = selectedIds.length;
  const editSelected = () => {
    const firstSelected = events.find(event => selectedIds.includes(event.id));
    if (firstSelected) {
      onEdit(firstSelected);
      onClearSelected();
    }
  };

  return (
    <div className="table-card">
      <table>
        <colgroup>{columns.map(column => <col className={`${column}-col`} key={column} />)}</colgroup>

        <thead>
          <tr>
            <th>
              <input
                className="row-check"
                type="checkbox"
                checked={allSelected}
                disabled={!events.length}
                onChange={onToggleAll}
                aria-label="Select all visible events"
              />
            </th>
            {headings.map(heading => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>

        <tbody>
          {events.length ? (
            events.map((event, index) => (
              <tr key={event.id}>
                <td>
                  <div className="row-action-wrap">
                    <button
                      className={`row-check row-check-button ${selectedIds.includes(event.id) ? 'selected' : ''}`}
                      type="button"
                      onClick={() => onToggleSelected(event.id)}
                      aria-label={`Select ${event.name}`}
                    />
                  </div>
                </td>
                <td className="key-cell">{index + 1}</td>
                <td className="name-cell">{event.name}</td>
                <td className="status-cell">
                  <span className={`badge ${getStatusClass(event.status)}`}>{event.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr><td className="empty-row" colSpan="4">No events found</td></tr>
          )}
        </tbody>
      </table>

      {selectedCount > 0 && (
        <div className="bulk-action-popover">
          <button className="bulk-close" type="button" onClick={onClearSelected} aria-label="Clear selected events">
            <Icon name="close" />
          </button>
          <span className="bulk-count">
            {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'} selected
          </span>
          <span className="bulk-divider" />
          <button className="bulk-action" type="button" onClick={editSelected}>
            <Icon className="edit-icon" name="edit" />
            Edit
          </button>
          <span className="bulk-divider" />
          <button className="bulk-action" type="button" onClick={onDeleteSelected}>
            <Icon className="delete-icon" name="delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function Icon({ className, name }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name].map(path => <path d={path} key={path} />)}
    </svg>
  );
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-');
}
