export default function AdminLogo() {
  return (
    <svg
      style={{
        width: "30%",
      }}
      viewBox="0 0 300 150"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="50" />
      <rect x="154" width="46" height="46" />
      <rect x="300" width="150" height="50" transform="rotate(90 300 0)" />
      <rect x="150" y="50" width="150" height="50" />
      <rect x="100" width="150" height="50" transform="rotate(90 100 0)" />
    </svg>
  );
}
