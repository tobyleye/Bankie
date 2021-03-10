import { css } from "./theme";

const globalStyle = css.global({
  "*": {
    border: "none",
    outline: "none",
    margin: 0,
    padding: 0,
  },
  html: {
    fontSize: "62.5%",
  },
  body: {
    fontSize: "1.6rem",
  },
});

export { globalStyle };
