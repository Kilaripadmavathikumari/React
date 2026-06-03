export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      placeholder="Search event"
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
}
