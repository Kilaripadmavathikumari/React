export default function EventRow({ event, index, isSelected, onToggleSelected, onEdit }) {
  return (
    <tr>
      <td>
        <input
          className="row-check"
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelected(event.id)}
        />
      </td>

      <td className="key-cell">{index + 1}</td>
      <td className="name-cell">{event.name}</td>

      <td className="status-cell">
        <span className={`badge ${event.status.toLowerCase().replaceAll(' ', '-')}`}>
          {event.status}
        </span>
      </td>

      <td className="actions-cell">
        <div className="actions">
          <button onClick={() => onEdit(event)}>Edit</button>
        </div>
      </td>
    </tr>
  );
}
