import useForm from "../utils/useForm";
import useToggle from "../utils/useToggle";
import TextField from "./TextField";

export default function TransferMoneyForm({ onSubmit }) {
  const [formdata, setField] = useForm({
    accountNo: "",
    amount: "",
    accountName: "",
  });

  const { isOpen, toggle } = useToggle();
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formdata);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        required
        label="Account Number"
        name="accountNo"
        value={formdata.accountNo}
        onChange={(value) => setField("accountNo", value)}
      />

      <div>
        <TextField
          required
          label="Amount"
          name="amount"
          value={formdata.amount}
          onChange={(value) => setField("amount", value)}
        />
        {[500, 1_000, 5_000, 10_000, 20_000].map((v) => (
          <button
            type="button"
            style={{ margin: 10 }}
            onClick={() => setField("amount", v)}
          >
            {v}
          </button>
        ))}
      </div>

      <div>
        <p>is this an access bank account no?</p>
      </div>
      <div>
        <p>Save account no?</p>
        <input type="checkbox" checked={isOpen} onChange={toggle} />
      </div>
      {isOpen && (
        <TextField
          required
          label="Account Name"
          name="accountName"
          value={formdata.accountName}
          onChange={(value) => setField("accountName", value)}
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
