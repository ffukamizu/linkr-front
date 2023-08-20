import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
    }

    body{
        background-color:#333333;
        height:100%;
    }
`

export default GlobalStyle