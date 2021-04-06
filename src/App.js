import "./globalStyle";
import * as React from "react";
import Create from "./components/Create";
import Saved from "./components/Saved";
import Header from "./components/Header";
import Tab from "./components/Tab";
import CodeModal from "./components/CodeModal";

const initialState = {
  activeTab: 0,
  step: 0,
  code: null,
  selectedBank: null,
  selectedTransaction: "",
};

function calculateUSSDCode(bank, transaction, formdata) {
  return "*909#";
}

function reducer(state, { type, ...action }) {
  if (type === "setBank") {
    return {
      ...state,
      step: state.step + 1,
      selectedBank: action.bank,
    };
  }
  if (type === "setTab") {
    return {
      ...state,
      activeTab: action.tab,
    };
  }
  if (type === "setTransaction") {
    return {
      ...state,
      selectedTransaction: action.transaction,
    };
  }
  if (type === "prevStep") {
    if (state.step === 1) {
      // reset selected bank
      return {
        ...state,
        step: state.step - 1,
        selectedBank: null,
      };
    }
    return {
      ...state,
      step: state.step - 1,
    };
  }
  if (type === "nextStep") {
    return {
      ...state,
      step: state.step + 1,
    };
  }
  if (type === "renderCode") {
    const code = calculateUSSDCode(
      state.selectedBank,
      state.selectedTransaction,
      action.formdata
    );
    return {
      ...state,
      code,
    };
  }
  if (type === "clearCode") {
    return {
      ...state,
      code: null,
    };
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { activeTab, selectedBank, step, code } = state;

  const clearCode = () => dispatch({ type: "clearCode" });

  return (
    <div>
      <Header
        activeTab={activeTab}
        step={step}
        selectedBank={selectedBank}
        dispatch={dispatch}
      />
      <main>
        <Tab active={state.activeTab === 0}>
          <Create state={state} dispatch={dispatch} />
        </Tab>
        <Tab active={state.activeTab === 1}>
          <Saved />
        </Tab>
      </main>
      <CodeModal show={!!code} code={code} onClose={clearCode} />
      {/* <div
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          padding: 20,
          background: "#222",
          color: "#ccc",
          transition: ".25s ease",
        }}
      >
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default App;
