import * as React from "react";

const navItem = {
  flex: 1,
  padding: 10,
  border: "none",
};
const Header = ({ step, activeTab, selectedBank, dispatch }) => {
  const getStyle = (tab) => {
    return activeTab === tab
      ? {
          fontSize: 18,
        }
      : {};
  };
  return (
    <header
      style={{
        padding: "20px 0px 0",
        textAlign: "center",
        height: 200,
        position: "relative",
      }}
    >
      {selectedBank ? (
        <div>{selectedBank.name}</div>
      ) : (
        <div style={{ marginBottom: 10 }}>
          <h1>Bankie</h1>
          <h3>Generate and save USSD code for your bank without stress </h3>
        </div>
      )}
      <nav
        style={{
          width: "100%",
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {step > 0 ? (
          <button
            style={navItem}
            onClick={() => dispatch({ type: "prevStep" })}
          >
            back
          </button>
        ) : (
          <button
            style={{ ...getStyle(0), ...navItem }}
            onClick={() => dispatch({ type: "setTab", tab: 0 })}
          >
            create
          </button>
        )}

        <button
          style={{ ...getStyle(1), ...navItem }}
          onClick={() => dispatch({ type: "setTab", tab: 1 })}
        >
          saved
        </button>
      </nav>
    </header>
  );
};

export default Header;
