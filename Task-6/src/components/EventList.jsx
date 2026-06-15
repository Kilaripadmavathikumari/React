import EventBulkActions from './EventBulkActions';
const columns = ['select', 'key', 'name', 'status'];
const headings = ['Key', 'Name', 'Status'];

export default function EventList({ events, selectedIds, onClearSelected, onDeleteSelected, onEdit, onToggleAll, onToggleSelected }) {
  const allSelected = events.length > 0 && events.every(event => selectedIds.includes(event.id));
  const selectedCount = selectedIds.length;
  const editSelected = () => {
    const firstSelected = events.find(event => selectedIds.includes(event.id));
    if (firstSelected) onEdit(firstSelected);
    onClearSelected();
  };
  return (
    <div className="table-card">
      <table>
        <colgroup>{columns.map(column => <col className={`${column}-col`} key={column} />)}</colgroup>
        <thead>
          <tr>
            <th>
              <input className="row-check" type="checkbox" checked={allSelected}
                disabled={!events.length} onChange={onToggleAll} aria-label="Select all visible events" />
            </th>
            {headings.map(heading => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {events.length ? events.map((event, index) => (
            <tr key={event.id}>
              <td>
                <div className="row-action-wrap">
                  <button className={`row-check row-check-button ${selectedIds.includes(event.id) ? 'selected' : ''}`}
                    type="button" onClick={() => onToggleSelected(event.id)} aria-label={`Select ${event.name}`} />
                </div>
              </td>
              <td className="key-cell">{index + 1}</td>
              <td className="name-cell">{event.name}</td>
              <td className="status-cell">
                <span className={`badge ${event.status.toLowerCase().replaceAll(' ', '-')}`}>{event.status}</span>
              </td>
            </tr>
          )) : (
            <tr><td className="empty-row" colSpan="4">No events found</td></tr>
          )}
        </tbody>
      </table>
      {selectedCount > 0 && <EventBulkActions count={selectedCount} onClear={onClearSelected}
        onDelete={onDeleteSelected} onEdit={editSelected} />}
    </div>
  );
}
