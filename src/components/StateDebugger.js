export default function StateDebugger({ state }) {
  const keys = Object.keys(state);
  const renderValue = (key) => {
    const value = state[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return <StateDebugger state={value} />;
    }
    return <p>{JSON.stringify(value)}</p>;
  };
  return (
    <div>
      {keys.map((key) => (
        <details>
          <summary>{key}</summary>
          {renderValue(key)}
        </details>
      ))}
    </div>
  );
}
