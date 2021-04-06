const inputStyle = {
  border: "none",
  borderBottom: "1px solid #ddd",
  padding: "4px 0",
};
export default function TextField({
  type = "text",
  label,
  id,
  value,
  onChange,
  ...props
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
      }}
    >
      <label
        style={{
          textTransform: "uppercase",
          marginBottom: 5,
          fontSize: 14,
          color: "#999",
        }}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...props}
        id={id}
        style={inputStyle}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
