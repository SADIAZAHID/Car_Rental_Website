import './RouteLine.css';

export default function RouteLine({ label }) {
  return (
    <div className="route-line" role="separator">
      <span className="route-line__dashes" aria-hidden="true" />
      {label && <span className="route-line__label">{label}</span>}
      <span className="route-line__dashes" aria-hidden="true" />
    </div>
  );
}