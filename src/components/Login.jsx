import { Home,Cancel } from "@material-ui/icons";
import { useState,useRef } from 'react';
import axios from "axios";
import "./login.css";

export  default  function Login({setShowLogin,setCurrentUsername,myStorage})
{
    const [error,setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const user = {
            username:nameRef.current.value,
            password:passwordRef.current.value,


        };


        try{
            const res = await axios.post("/users/login",user);
            setCurrentUsername(res.data.username);
            myStorage.setItem('user', res.data.username);
            setShowLogin(false);
            
            
        }catch(err){
            setError(true);
        }
    };
    return (
        <div className="loginContainer">
            <div className="logo">
                <Home/>
                ErkinSahMekanDegerlendirme
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Kullanıcı Adı" ref={nameRef}/>
                <input type="password" placeholder="Şifre" ref={passwordRef}/>
                <button className="loginBtn">Giriş</button>
               {error && (
                
                <span className="notsuccessfull">Lutfen tekrar deneyiniz</span> )}
            </form>
            <Cancel className="loginClose" onClick={()=>setShowLogin(false)}/>
        </div>
    )
}

