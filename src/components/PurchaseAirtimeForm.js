import useForm from "../utils/useForm";
import TextField from "./TextField";

export default function PurchaseAirtimeForm({ onSubmit }) {
  const [formdata, setField] = useForm({
    amount: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formdata);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <TextField
          required
          label="Amount to send"
          name="amount"
          value={formdata.amount}
          onChange={(value) => setField("amount", value)}
        />
        {[100, 200, 500, 1000, 2_000, 5_000].map((v) => (
          <button
            type="button"
            style={{ margin: 10 }}
            onClick={() => setField("amount", v)}
          >
            {v}
          </button>
        ))}
      </div>
      <button type="submit">Generate Code</button>
    </form>
  );
}
