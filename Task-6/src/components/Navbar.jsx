import { useState } from 'react';

const defaultOrganizer = {
  firstName: 'Padma',
  lastName: '',
  phone: '',
  email: '',
};

const organizerFields = [
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['phone', 'Phone number (optional)'],
  ['email', 'Email (optional)'],
];

export default function Navbar({ theme, onHome, onThemeChange }) {
  const [organizer, setOrganizer] = useState(getSavedOrganizer);
  const [draft, setDraft] = useState(organizer);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const displayName = `${organizer.firstName.split(' ')[0]} ${organizer.lastName.charAt(0)}`.trim() || 'Organizer';
  const avatarLetters = `${organizer.firstName.charAt(0)}${organizer.lastName.charAt(0)}`.toUpperCase();

  const openOrganizer = () => {
    setDraft(organizer);
    setError('');
    setIsEditing(true);
  };

  const saveOrganizer = event => {
    event.preventDefault();

    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      setError('Please enter first name and last name.');
      return;
    }

    const nextOrganizer = {
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
    };

    setOrganizer(nextOrganizer);
    localStorage.setItem('taskFiveOrganizer', JSON.stringify(nextOrganizer));
    setIsEditing(false);
  };

  const updateDraft = (field, value) => {
    setDraft({ ...draft, [field]: value });
    setError('');
  };

  return (
    <>
      <nav className="top-nav">
        <button className="nav-logo" onClick={onHome}>
          <span className="react-logo">React</span>
          <strong>EventHub</strong>
        </button>

        <div className="nav-right">
          <button className="home-button" onClick={onHome} aria-label="Home">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5.5 10.5V20h13v-9.5" />
              <path d="M9.5 20v-6h5v6" />
            </svg>
          </button>
          <button className="theme-toggle" onClick={onThemeChange}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button className="organizer-button" type="button" onClick={openOrganizer}>
            <span className="avatar">{avatarLetters || 'O'}</span>
            <span>
              {displayName}
              <small>Organizer</small>
            </span>
          </button>
        </div>
      </nav>

      {isEditing && (
        <div className="modal-backdrop organizer-backdrop">
          <form className="edit-card organizer-card" onSubmit={saveOrganizer}>
            <h2>Organizer Details</h2>
            {error && <p className="error-message">{error}</p>}

            {organizerFields.map(([field, placeholder]) => (
              <input
                key={field}
                placeholder={placeholder}
                value={draft[field]}
                onChange={event => updateDraft(field, event.target.value)}
              />
            ))}

            <div className="edit-actions">
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function getSavedOrganizer() {
  return JSON.parse(localStorage.getItem('taskFiveOrganizer')) || defaultOrganizer;
}
