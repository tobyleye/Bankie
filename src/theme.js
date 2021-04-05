import { createStyled } from "@stitches/react";

export const { styled, css } = createStyled({
  utils: {
    mt: (config) => (value) => ({
      marginTop: value,
    }),
  },
});
