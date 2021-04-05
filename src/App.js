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
  selectedBank: null,
  selectedTransaction: "",
};

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
      step: state.step + 1,
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
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { activeTab, selectedBank, step } = state;
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
      <CodeModal show={false} onClose={() => {}} />
    </div>
  );
}

export default App;
