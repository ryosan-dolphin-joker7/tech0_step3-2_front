/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';

export default function MaterialBasic() {
  const font = css`
      text-transform: none;
  `;
  return (
    <>
    <Button variant="text">Text</Button>
    <Button variant="contained">Contained</Button>
    <Button variant="outlined">Outlined</Button>

    {/* <Button variant="text" color="secondary">Text</Button>
    <Button variant="contained" color="secondary">Contained</Button>
    <Button variant="outlined" color="secondary">Outlined</Button> */}

    {/* <Button variant="text" css={font}>Text</Button>
    <Button variant="contained" css={font}>Contained</Button>
    <Button variant="outlined" css={font}>Outlined</Button> */}
    </>
  );
}