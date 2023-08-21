import { styled } from "styled-components";

const StyledLoginButton = styled.button`
    box-sizing:border-box;
    width: 429px;
    height: 65px; 
    border-radius: 6px;
    border:none;
    background: #1877F2; 
    color:#FFFFFF;
    font-family: Oswald;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
    @media(max-width:450px){
        width:330px;
        height:55px;
        font-size:22px;
    }
`;

export default StyledLoginButton