import { useState } from 'react';
import StatusSelect from './StatusSelect.jsx';

export default function EditForm({ event, onCancel, onSave }) {
  const [name, setName] = useState(event.name);
  const [status, setStatus] = useState(event.status);
  const [error, setError] = useState('');

  const submit = submitEvent => {
    submitEvent.preventDefault();

    if (!name.trim()) {
      setName('');
      setError('Please enter an event name.');
      return;
    }

    onSave({ ...event, name: name.trim(), status });
  };

  const changeName = inputEvent => {
    setName(inputEvent.target.value.trim() ? inputEvent.target.value : '');
    setError('');
  };

  return (
    <div className="modal-backdrop">
      <form className="edit-card" onSubmit={submit}>
        <h2>Edit Event</h2>
        {error && <p className="error-message">{error}</p>}

        <input value={name} onChange={changeName} />

        <StatusSelect value={status} onChange={setStatus} />
        <div className="edit-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}
