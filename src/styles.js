import { createGlobalStyle, css } from 'styled-components';


export const Normalize = createGlobalStyle`
* {
  font-family: 'Lato', sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
`;

export const center = css`
display: flex;
align-items: center;
justify-content: center;
`;