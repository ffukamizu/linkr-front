import React, { useState } from "react";
import { styled } from "styled-components";
import Logo from "../components/Logo";
import StyledLink from "../style/StyledLink";
import StyledLoginInput from "../style/StyledLoginInput";
import StyledLoginButton from "../style/StyledLoginButton";
import { useNavigate } from "react-router-dom";
import apiAuth from "../services/apiAuth";

export default function SigUpPage(){
    const navigate = useNavigate()
    const [waitAPI , setWaitAPI] = useState(false)
    const [form, setForm] = useState({email:"",password:"",name:"",photo:""})
    
    function handleForm(e){
        setForm({...form,[e.target.name]: e.target.value})
        console.log(form)
    }
    
    function handleSignUp(e){
        e.preventDefault()
        console.log("oi")
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
                <StyledLoginInput name="email" placeholder="e-mail" onChange={handleForm} value={form.email}/>
                <StyledLoginInput name="password" placeholder="password" onChange={handleForm} value={form.password}/>
                <StyledLoginInput name="name" placeholder="username" onChange={handleForm} value={form.name}/>
                <StyledLoginInput name="photo" placeholder="picture url" onChange={handleForm}  value={form.photo}/>
                <StyledLoginButton disabled={waitAPI} type="submit">Sign Up</StyledLoginButton>
                <StyledLink to={"/"}>Switch back to log in</StyledLink>
            </SCStyledForm>
        </SCPageContentBox>
    )
}

const SCPageContentBox = styled.div`
    display:flex;
    width:100%;
    height:100%;
`;

const SCStyledForm = styled.form`
    display:flex;
    flex-direction:column;
    width:38%;
    margin-top:274px;
    align-items: center;
    gap:14px;

`;