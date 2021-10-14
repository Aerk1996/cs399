import { useState,useEffect } from 'react';
//import ReactMapGL from 'react-map-gl';
import ReactMapGL, {Marker,Popup} from 'react-map-gl';

import { Home,Star} from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins,setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace]=useState(null);
  const [title, setTitle]=useState(null);
  const [desc, setDesc]=useState(null);
  
  const [star, setStar] = useState(0);
  
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude:  38.9637,
    longitude: 35.2433,
    zoom: 5
  });
  const [showRegister,setShowRegister]=useState(false);
  const [showLogin,setShowLogin]=useState(false);

  useEffect(()=>{
    const getPins = async ()=>{
      try{
        const res = await axios.get("/pins");
        setPins(res.data);

      }catch(err){
        console.log(err);
      }
    };
    getPins();
  },[]);

  const handleMarkerClick = (id,lat,lon)=>{
    setCurrentPlaceId(id);
    setViewport({...viewport,latitude:lat,longitude:lon});
  };
  const handleAddClick = (e) =>{
      const [lon,lat] = e.lngLat;
      setNewPlace({
        lat,
        lon,
      })
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPin = {
      username:currentUsername,
      title,
      desc,
      rating:star,
      lat:newPlace.lat,
      lon:newPlace.lon,
    }
      try{
        const  res = await axios.post("/pins",newPin);
        setPins([...pins, res.data]);
        setNewPlace(null);
      }catch(err){
        console.log(err);
      }



  };

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
  return (
    <div className="App">
        <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/erkinsah/cku5bgjp82fwb18p3cgw7y2by"
      onDblClick = {handleAddClick}
      transitionDuration="220"
    >
   {pins.map(p=>(

   <>
  <Marker
       latitude={p.lat} 
       longitude={p.lon} 
       offsetLeft={-viewport.zoom*2}
       offsetTop={-viewport.zoom*4}
    >
       <Home style={{fontSize:viewport.zoom*4,color:p.username===currentUsername? "tomato" :"slateblue",cursor:"pointer"}}
       onClick = {()=>handleMarkerClick(p._id,p.lat,p.lon)}
       />
      </Marker>
      {p._id === currentPlaceId && (
        <Popup
          key = {p._id}
          latitude={p.lat}
          longitude={p.lon}
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setCurrentPlaceId(null)}
          anchor="bottom" 
          >
          <div className="card">
            <label>Mekan</label>
            <h4 className="place">{p.title}</h4>
            <label>Yorum</label>
            <p className="desc">{p.desc}</p>
            <label>Puanlama</label>
            <div className="stars">
              {Array(p.rating).fill(<Star className="star"/>)}
              
            </div>
            <label>Bilgi</label>
            <span className = "username">Ekleyen <b>{p.username}</b></span>
            <span className = "date">{format(p.createdAt)}</span>

          </div>
      </Popup> 
      )}
      </>
   ))}
   {newPlace && (
   <Popup
          latitude={newPlace.lat}
          longitude={newPlace.lon}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom" 
          onClose={()=>setNewPlace(null)}
   >
     <div>
       <form onSubmit={handleSubmit}>
         <label>Mekan</label>
         <input placeholder="Mekan ismi ekleyin" onChange={(e)=>setTitle(e.target.value)}/>
         <label>Yorum</label>
         <textarea placeholder="Mekandan bahsedin" onChange={(e)=>setDesc(e.target.value)}/>
         <label>Puanlama</label>
         <select onChange={(e)=>setStar(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
         </select>
         <button className ="submitButton" type="submit">Yer Ekle</button>
       </form>
     </div>
   </Popup> )}
   {currentUsername ?(<button className="button logout" onClick={handleLogout}>Çıkış</button>
   ):(
   <div className="buttons">
   <button className="button login" onClick = {()=>setShowLogin(true)}>Giriş</button>
   <button className="button register" onClick = {()=> setShowRegister(true)}>Kaydol</button>
   </div>)}
   
   {showRegister &&(
     <Register  setShowRegister={setShowRegister} />
   )}
   {showLogin && (
     <Login setShowLogin={setShowLogin}
     setCurrentUsername={setCurrentUsername}
     myStorage={myStorage} />
   )}
    </ReactMapGL>
    </div>
  );
}

export default App;
