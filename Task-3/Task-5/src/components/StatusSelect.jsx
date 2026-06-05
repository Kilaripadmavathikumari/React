export default function StatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value)}>
      <option>Todo</option>
      <option>In Progress</option>
      <option>Done</option>
    </select>
  );
}
