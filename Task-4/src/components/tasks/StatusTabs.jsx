const tabs = ['All', 'Todo', 'Done', 'In Progress'];

export default function StatusTabs({ active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={active === tab ? 'tab active' : 'tab'}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
