import { Home,Cancel } from "@material-ui/icons";
import { useState,useRef } from 'react';
import axios from "axios";
import "./register.css";

export  default  function Register({setShowRegister})
{
    const [congrats,setCongrats] =useState(false);
    const [error,setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,


        };


        try{
            await axios.post("/users/register",newUser);
            setError(false);
            setCongrats(true);
        }catch(err){
            setError(true);
        }
    };
    return (
        <div className="registerContainer">
            <div className="logo">
                <Home/>
                ErkinSahMekanDegerlendirme
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Kullanıcı Adı" ref={nameRef}/>
                <input type="email" placeholder="Email" ref={emailRef}/>
                <input type="password" placeholder="Şifre" ref={passwordRef}/>
                <button className="registerBtn">Kaydol</button>
                {congrats && (
                <span className="congrats">Hosgeldiniz</span>
                 ) } {error && (
                
                <span className="notsuccessfull">Lutfen tekrar deneyiniz</span> )}
            </form>
            <Cancel className="signupClose" onClick={()=>setShowRegister(false)}/>
        </div>
    )
}

