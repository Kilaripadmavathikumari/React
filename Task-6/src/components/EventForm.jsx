import { useState } from 'react';
import StatusSelect from './StatusSelect.jsx';

export default function EventForm({ onAdd }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Todo');
  const [error, setError] = useState('');

  const submit = event => {
    event.preventDefault();

    if (!name.trim()) {
      setName('');
      setError('Please enter an event name.');
      return;
    }

    onAdd({ name: name.trim(), status });
    setName('');
    setStatus('Todo');
    setError('');
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}

      <form className="event-form" onSubmit={submit}>
        <input
          placeholder="Enter event name"
          value={name}
          onChange={event => {
            setName(event.target.value);
            setError('');
          }}
        />
        <StatusSelect value={status} onChange={setStatus} />
        <button className="primary">Add Event</button>
      </form>
    </>
  );
}
