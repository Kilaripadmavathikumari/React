function EventForm({ name, isEditing, onChange, onSave, onCancel }) {
  return (
    <div className="form">
      <input
        value={name}
        placeholder="Enter event name"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSave()}
      />
      <button onClick={onSave}>{isEditing ? 'Update' : 'Add Event'}</button>
      {isEditing && <button className="secondary" onClick={onCancel}>Cancel</button>}
    </div>
  )
}

export default EventForm
