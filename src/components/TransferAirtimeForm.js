import useForm from "../utils/useForm";
import useToggle from "../utils/useToggle";
import TextField from "./TextField";

export default function PurchaseAirtimeForm({ onSubmit }) {
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
        label="Phone Number"
        name="accountNo"
        value={formdata.accountNo}
        onChange={(value) => setField("accountNo", value)}
      />

      <div>
        <TextField
          required
          label="Amount to send"
          name="amount"
          value={formdata.amount}
          onChange={(value) => setField("amount", value)}
        />
        {[100, 500, 1000, 2_000, 5_000].map((v) => (
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
        <p>Save phone number?</p>
        <input type="checkbox" checked={isOpen} onChange={toggle} />
      </div>
      {isOpen && (
        <TextField
          required
          label="Name to save as"
          name="accountName"
          value={formdata.accountName}
          onChange={(value) => setField("accountName", value)}
        />
      )}
      <button type="submit">Generate Code</button>
    </form>
  );
}
