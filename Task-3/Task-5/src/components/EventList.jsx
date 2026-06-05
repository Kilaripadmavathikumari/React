const columns = ['select', 'key', 'name', 'status', 'actions'];
const headings = ['Key', 'Name', 'Status', 'Actions'];

export default function EventList({
  events,
  selectedIds,
  onEdit,
  onToggleAll,
  onToggleSelected,
}) {
  const allSelected = events.length > 0
    && events.every(event => selectedIds.includes(event.id));

  return (
    <div className="table-card">
      <table>
        <colgroup>
          {columns.map(column => <col className={`${column}-col`} key={column} />)}
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
            {headings.map(heading => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>

        <tbody>
          {events.length ? (
            events.map((event, index) => (
              <tr key={event.id}>
                <td>
                  <input
                    className="row-check"
                    type="checkbox"
                    checked={selectedIds.includes(event.id)}
                    onChange={() => onToggleSelected(event.id)}
                    aria-label={`Select ${event.name}`}
                  />
                </td>
                <td className="key-cell">{index + 1}</td>
                <td className="name-cell">{event.name}</td>
                <td className="status-cell">
                  <span className={`badge ${getStatusClass(event.status)}`}>
                    {event.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button onClick={() => onEdit(event)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-row" colSpan="5">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-');
}
