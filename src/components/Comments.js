import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import SendImg from '../assets/cil_send.svg'
import { postComment } from '../services/apiPost';

export function Comments({ id , comments , setComments}){
    const { session } = useContext(SessionContext);
    const [inputComment, setInputComment] = useState('')

    function handleInput(e){
        setInputComment(e.target.value)
        console.log(e.target.value)
    }
    
    function handlePostComm(){
        const commObj = {
            comment: inputComment,
            postId: id
        }
        postComment(session.token, commObj)
            .then((res) => {
                console.log(res)
                setComments(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        setInputComment("")
    }

    function handleKeyDown(e){
        if(e.key === 'Enter'){
            handlePostComm()
        }
    }
    return(
        <SCCommsBox data-test="comment-box">
            {comments.map((c) => 
            <SCCommentBox data-test="comment">
                <SCUserPic src={c.photo}/>
                <SCCommentContent>
                    <SCUserName>{c.name}</SCUserName>
                    <SCCommentText>{c.comment}</SCCommentText>
                </SCCommentContent>
            </SCCommentBox>
            )}
            {/*Aqui fazer o map de comentários */}
            <SCInsertCommBox>
                <SCUserPic src={`${session.photo}`}/>
                <SCCommInputBox>
                    <SCCommInput data-test="comment-input" onKeyDown={handleKeyDown} name='inputComment' value={inputComment} onChange={handleInput} placeholder='write a comment...'/>
                    <SCSendImg data-test="comment-submit" src={SendImg} onClick={handlePostComm}/>
                </SCCommInputBox>
            </SCInsertCommBox>
        </SCCommsBox>
    )
}

const SCCommentText = styled.p`
    color: #ACACAC;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal; 
`

const SCUserName = styled.p`
    color: #F3F3F3;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
    margin-bottom: 3px;
`

const SCCommentContent = styled.div`
    box-sizing:border-box;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:right;
    align-items:start;
`

const SCCommentBox = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:flex-start;
    align-items:top;
    border-bottom:1px solid #353535;
    padding:15px 0px;
`

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
    margin-right:14px;
`

const SCInsertCommBox = styled.div`
    box-sizing:border-box;
    width:100%;
    height:85px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
`

const SCCommsBox = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: flex-start;
  width:100%;
  height:100%;
  padding: 0 20px;
` 