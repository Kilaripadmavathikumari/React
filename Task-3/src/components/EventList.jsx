import EventCard from './EventCard.jsx'

function EventList({ events, onEdit, onDelete }) {
  if (!events.length) return <p className="empty">No events added yet.</p>

  return (
    <div className="list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default EventList
