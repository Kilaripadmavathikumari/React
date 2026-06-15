import { CloseIcon, DeleteIcon, EditIcon } from './EventIcons';

export default function EventBulkActions({ count, onClear, onDelete, onEdit }) {
  const taskText = count === 1 ? 'task' : 'tasks';

  return (
    <div className="bulk-action-popover">
      <button className="bulk-close" type="button" onClick={onClear} aria-label="Clear selected events">
        <CloseIcon />
      </button>
      <span className="bulk-count">{count} {taskText} selected</span>
      <span className="bulk-divider" />
      <button className="bulk-action" type="button" onClick={onEdit}>
        <EditIcon className="edit-icon" />
        Edit
      </button>
      <span className="bulk-divider" />
      <button className="bulk-action" type="button" onClick={onDelete}>
        <DeleteIcon className="delete-icon" />
        Delete
      </button>
    </div>
  );
}
