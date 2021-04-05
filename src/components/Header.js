export default function Header({ step, activeTab, selectedBank, dispatch }) {
  const getStyle = (tab) => {
    return activeTab === tab
      ? {
          fontSize: 18,
        }
      : {};
  };
  return (
    <header style={{ padding: "20px 10px", textAlign: "center" }}>
      {selectedBank ? (
        <div>{selectedBank.name}</div>
      ) : (
        <div>
          <h1>Bankie</h1>
          <h3>Generate and save USSD code for your bank without stress </h3>
        </div>
      )}

      <nav style={{ width: "100%" }}>
        {step > 0 ? (
          <button onClick={() => dispatch({ type: "prevStep" })}>back</button>
        ) : (
          <button
            style={getStyle(0)}
            onClick={() => dispatch({ type: "setTab", tab: 0 })}
          >
            create
          </button>
        )}

        <button
          style={getStyle(1)}
          onClick={() => dispatch({ type: "setTab", tab: 1 })}
        >
          saved
        </button>
      </nav>
    </header>
  );
}
