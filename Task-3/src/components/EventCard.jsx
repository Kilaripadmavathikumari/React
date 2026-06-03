function EventCard({ event, onEdit, onDelete }) {
  return (
    <article className="event">
      <span>{event.name}</span>
      <div>
        <button className="edit" onClick={() => onEdit(event)}>Edit</button>
        <button className="delete" onClick={() => onDelete(event.id)}>Delete</button>
      </div>
    </article>
  )
}

export default EventCard
