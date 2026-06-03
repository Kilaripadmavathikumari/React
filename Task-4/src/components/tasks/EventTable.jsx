import EventRow from './EventRow.jsx';

const columns = ['select', 'key', 'name', 'status', 'actions'];
const headings = ['', 'Key', 'Name', 'Status', 'Actions'];

export default function EventTable({
  events,
  selectedIds,
  onToggleSelected,
  onToggleAll,
  onEdit,
}) {
  const allSelected = events.length > 0
    && events.every(event => selectedIds.includes(event.id));

  return (
    <div className="table-card">
      <table>
        <colgroup>
          {columns.map(column => <col key={column} className={`${column}-col`} />)}
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
            {headings.slice(1).map(heading => <th key={heading}>{heading}</th>)}
          </tr>
        </thead>

        <tbody>
          {events.length ? (
            events.map((event, index) => (
              <EventRow
                key={event.id}
                event={event}
                index={index}
                isSelected={selectedIds.includes(event.id)}
                onToggleSelected={onToggleSelected}
                onEdit={onEdit}
              />
            ))
          ) : (
            <tr>
              <td className="empty-row" colSpan="5">No events yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
