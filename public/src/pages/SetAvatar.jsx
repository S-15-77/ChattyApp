
import React, {useEffect, useState}from 'react';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import loader from "../assets/loader.gif";
import {setAvatarRoute} from "../utils/APIRoutes";
import { Buffer } from 'buffer';

function SetAvatar() {
    const api = `https://api.multiavatar.com/123456789`;
    const navigate = useNavigate();
    const [avatars,setAvatars] =  useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position : "bottom-right",
        autoClose : 5000,
        pauseOnHover : true,
        draggable : true,
        theme : "dark",
    };
    useEffect( () => {
        if(!localStorage.getItem("Chatty-user")){
            navigate("/login");
        }
    },[])
    const setProfilePic = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please Select an Avatar",toastOptions);
        }
        else{
            const user = await JSON.parse(localStorage.getItem("Chatty-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image : avatars[selectedAvatar], 
            });
            console.log(data);
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("Chatty-user",JSON.stringify(user));
                navigate("/");
            }
            else{
                toast.error("Error in Setting Profile Picture",toastOptions);
            
            }
        }
    };
    useEffect( () => 
    { 
        getAvatars();
     },[]);
    const getAvatars = async() =>{
        const data = [];
        for (let i = 0;i<4;i++){
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`

            );
            const buffer =  new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setLoading(false);
    }
    
  return (
    <>

        {
            loading ? <Container>
                <img src={loader} alt="loader" className='loader'/>
            </Container> : (
        <Container>
            <div className="titler-container">
                <h1>
                    Pick an Avatar
                </h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return(
                            <div className={`avatar ${selectedAvatar === index?"selected":""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt ="" onClick={() => setSelectedAvatar(index)}></img>
                            </div>
                        )
                    })
                }
            </div>
            <button className='submit-btn' onClick={setProfilePic}>Set as Profile Picture</button>
            <ToastContainer/>
        </Container>
        )}
    </>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background: #131324;
    height: 100vh;
    width: 100vw;

    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border : 0.4rem solid transparent;
            padding: 0.5rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
            
        }
        
    }
    .submit-btn{
        background-color : #997af0;
        color : white;
        padding : 1rem 2rem;
        border : none;
        font-weight : bold;
        cursor : pointer;
        border-radius : 0.4rem;
        font-size : 1rem;
        text-transform : uppercase;
        transition 0.5s ease-in-out;
        &:hover{
            background-color : #4e0eff;
        }
    }

    `;
export default SetAvatar;
