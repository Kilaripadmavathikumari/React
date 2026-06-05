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
        <colgroup>
          <col className="select-col" />
          <col className="key-col" />
          <col className="name-col" />
          <col className="status-col" />
        </colgroup>

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
            <th>Key</th>
            <th>Name</th>
            <th>Status</th>
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
                  <span className={`badge ${getStatusClass(event.status)}`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-row" colSpan="4">No events found</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedCount > 0 && (
        <div className="bulk-action-popover">
          <button
            className="bulk-close"
            type="button"
            onClick={onClearSelected}
            aria-label="Clear selected events"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
          <span className="bulk-count">
            {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'} selected
          </span>
          <span className="bulk-divider" />
          <button className="bulk-action" type="button" onClick={editSelected}>
            <svg className="edit-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
              <path d="m14 7 3 3" />
            </svg>
            Edit
          </button>
          <span className="bulk-divider" />
          <button className="bulk-action" type="button" onClick={onDeleteSelected}>
            <svg className="delete-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M10 11v6M14 11v6" />
              <path d="m6 7 1 13h10l1-13" />
              <path d="M9 7V4h6v3" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-');
}
