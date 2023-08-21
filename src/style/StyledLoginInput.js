import { styled } from "styled-components";

const StyledLoginInput = styled.input`
    box-sizing:border-box;
    width: 429px;
    height: 65px; 
    border-radius: 6px;
    background: #FFF; 
    color: #4F4F4F;
    font-family: Oswald;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
    padding:0;
    padding-left:17px;
    padding-bottom:3px;
    @media(max-width:450px){
        width:330px;
        height:55px;
        font-size:22px;
    }
`;

export default StyledLoginInput