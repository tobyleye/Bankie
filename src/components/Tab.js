export default function Tab({ active, children }) {
  return <div style={{ display: active ? "block" : "none" }}>{children}</div>;
}
