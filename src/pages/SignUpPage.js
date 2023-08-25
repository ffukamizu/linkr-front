import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../components/Logo";
import apiAuth from "../services/apiAuth";
import StyledLink from "../style/StyledLink";
import StyledLoginButton from "../style/StyledLoginButton";
import StyledLoginInput from "../style/StyledLoginInput";

export default function SigUpPage(){
    const navigate = useNavigate()
    const [waitAPI , setWaitAPI] = useState(false)
    const [form, setForm] = useState({email:"",password:"",name:"",photo:""})
    
    function handleForm(e){
        setForm({...form,[e.target.name]: e.target.value})
    }
    
    function handleSignUp(e){
        e.preventDefault()
        if(form.email === "" || form.password === "" || form.name === "" || form.photo === "") return alert("Por favor, preencha todos os campos")
        setWaitAPI(true)
        apiAuth.signUp(form)
            .then(res =>{
                console.log(res)
                setWaitAPI(false)
                navigate("/")
            })
            .catch(err =>{
                console.log(err)
                if(err.response.request.status === 409) alert("E-mail já cadastrado")
                setWaitAPI(false)
            })
        //navigate("/")
    }
    return (
        <SCPageContentBox>
            <Logo/>
            <SCStyledForm onSubmit={handleSignUp}>
                <StyledLoginInput data-test="email" name="email" placeholder="e-mail" onChange={handleForm} value={form.email}/>
                <StyledLoginInput data-test="password" name="password" placeholder="password" onChange={handleForm} value={form.password}/>
                <StyledLoginInput data-test="username" name="name" placeholder="username" onChange={handleForm} value={form.name}/>
                <StyledLoginInput data-test="picture-url" name="photo" placeholder="picture url" onChange={handleForm}  value={form.photo}/>
                <StyledLoginButton data-test="sign-up-btn" disabled={waitAPI} type="submit">Sign Up</StyledLoginButton>
                <StyledLink data-test="login-link" to={"/"}>Switch back to log in</StyledLink>
            </SCStyledForm>
        </SCPageContentBox>
    )
}

const SCPageContentBox = styled.div`
    display:flex;
    width:100%;
    height:100%;
    @media(max-width:450px) {
        flex-direction:column
  }
`;

const SCStyledForm = styled.form`
    display:flex;
    flex-direction:column;
    width:38%;
    margin-top:274px;
    align-items: center;
    gap:14px;
    @media(max-width:450px){
        width:100%;
        margin:0;
        padding-top:40px;
        gap:10px;
    }

`;