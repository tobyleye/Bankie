import Slider from "./Slider";
import banks from "../banks.json";
import TransferMoneyForm from "./TransferMoneyForm";
import PurchaseAirtimeForm from "./PurchaseAirtimeForm";
import TransferAirtimeForm from "./TransferAirtimeForm";

const forms = {
  "transfer money": TransferMoneyForm,
  "send airtime": TransferAirtimeForm,
  "purchase airtime": PurchaseAirtimeForm,
};

const formsLabel = Object.keys(forms);

export default function Create({ state, dispatch }) {
  const { selectedBank, selectedTransaction } = state;

  const Form = forms[selectedTransaction];

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
        {selectedBank &&
          selectedBank.transaction_menu.map((tx) => (
            <div
              style={{ padding: 10 }}
              onClick={() => {
                dispatch({ type: "setTransaction", transaction: tx });
                if (formsLabel.includes(tx)) {
                  dispatch({ type: "nextStep" });
                } else {
                  dispatch({ type: "renderCode" });
                }
              }}
            >
              {tx}
            </div>
          ))}
      </div>

      <div>
        {Form && (
          <Form
            key={state.step}
            onSubmit={(data) => {
              dispatch({ type: "renderCode", formdata: data });
            }}
          />
        )}
      </div>
    </Slider>
  );
}
