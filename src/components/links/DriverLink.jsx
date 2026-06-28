// Links a driver name to their detail page. Falls back to plain text when no
// driverRef is available (e.g. LEFT JOIN winner with no result yet).
export default function DriverLink({ name, driverRef }) {
  if (!driverRef) {
    return <span>{name}</span>;
  }

  return (
    <a
      href={`/drivers/${driverRef}`}
      className="text-blue-600 hover:text-blue-800 hover:underline"
    >
      {name}
    </a>
  );
}
