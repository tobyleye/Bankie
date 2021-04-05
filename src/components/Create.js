import Slider from "./Slider";
import banks from "../banks.json";

export default function Create({ state, dispatch }) {
  return (
    <Slider active={state.step}>
      <div>
        {banks.map((bank) => (
          <div
            onClick={() => dispatch({ type: "setBank", bank })}
            style={{
              padding: "12px 10px",
              cursor: "pointer",
              borderBottom: "1px solid #fcfcfc",
            }}
          >
            {bank.name}
          </div>
        ))}
      </div>

      <div>
        {state.selectedBank &&
          state.selectedBank.transaction_menu.map((tx) => (
            <div
              style={{ padding: 10 }}
              onClick={() =>
                dispatch({ type: "setTransaction", transaction: tx })
              }
            >
              {tx}
            </div>
          ))}
      </div>

      <div>
        <form>
          <input type="text" placeholder="enter your name" />
        </form>
      </div>
    </Slider>
  );
}
