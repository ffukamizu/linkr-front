import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import { center } from '../style/utils';
import SendImg from '../assets/cil_send.svg'

export function Comments(){
    const { session } = useContext(SessionContext);
    const [inputComment, setInputComment] = useState('')

    function handleInput(e){
        setInputComment(e.target.value)
        console.log(e.target.value)
    }
    
    function postComment(){
        alert(`Postei o comment ${inputComment}`)
    }
    
    function handleKeyDown(e){
        if(e.key === 'Enter'){
            postComment()
        }
    }
    return(
        <SCCommsBox>
            {/*Aqui fazer o map de comentários */}
            <SCInsertCommBox>
                <SCUserPic src={`${session.photo}`}/>
                <SCCommInputBox>
                    <SCCommInput onKeyDown={handleKeyDown} name='inputComment' value={inputComment} onChange={handleInput} placeholder='write a comment...'/>
                    <SCSendImg src={SendImg} onClick={postComment}/>
                </SCCommInputBox>
            </SCInsertCommBox>
        </SCCommsBox>
    )
}

const SCSendImg = styled.img`
    height:16px;
    width:16px;
    margin-right:12px;
`

const SCCommInput = styled.input`
    box-sizing:border-box;
    display:flex;
    justify-content:flex-end;
    padding-left:15px;
    align-items:center;
    width: 482px;
    height: 39px; 
    border-radius: 8px;
    background-color:#252525;
    border:none;
    outline: none;
    color: white;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.7px;

    &::placeholder{
        color: #575757;
        font-family: Lato;
        font-size: 14px;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.7px;
    }
`

const SCCommInputBox = styled.div`
    box-sizing:border-box;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding: 0;
    width: 510px;
    height: 39px; 
    border-radius: 8px;
    background-color:#252525;
    border:none;
`

const SCUserPic = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 304px; 
`

const SCInsertCommBox = styled.div`
    box-sizing:border-box;
    width:100%;
    height:85px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:14px;
`

const SCCommsBox = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: flex-start;
  width:100%;
  height:100%;
  padding: 0 20px;
` 