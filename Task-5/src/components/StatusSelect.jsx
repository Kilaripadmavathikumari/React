export const statuses = ['Todo', 'In Progress', 'Done'];

export default function StatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value)}>
      {statuses.map(status => <option key={status}>{status}</option>)}
    </select>
  );
}
