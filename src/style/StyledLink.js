import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
    color: #FFFFFF;
    font-family: Lato;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    text-decoration: none;
    padding-bottom:3px;
    border-bottom:solid #FFFFFF 1px;
    @media(max-width:450px){
        font-size:17px;
        margin-top:10px;
    }
`;

export default StyledLink