"use client"

import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import Routing from '../components/routing'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from 'axios'

const Map = () => {

  const [lat, setLat]  = useState(0)
  const [long, setLong] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [dest, setDest] = useState([])
  const id = localStorage.getItem('id')

  useEffect(()=>{
    axios.get('http://localhost:8080/v1/users/getAll')
    .then((res)=>{
      setAllUsers(res.data.users)
    })
    .catch((err)=>{
      console.log(err)
    })
    navigator.geolocation.getCurrentPosition(success, error)
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude)
      setLong(longitude)
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
  },[])

  console.log(dest)

  useEffect(()=>{
    if(lat>0 && long>0){
      axios.put("http://localhost:8080/v1/users/patch",{
        id:id,
        lat:lat.toString(),
        long:long.toString()
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },[lat, long])

  return (
    <div>
      {
        dest.length>0 &&
      <button onClick={()=>{setDest([])}} className="absolute top-4 left-20 bg-red-400 px-5 py-2  rounded-lg text-white z-50">
        Exit Navigation
      </button>
      }
      { (lat>0 && long>0) &&
    <MapContainer className='z-40 py-96' center={[lat,long]} zoom={14} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
          <TileLayer
    attribution='© <a href="https://stadiamaps.com/">Stadia Maps</>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a > contributors'
    url = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    />
    {
      allUsers.map((m)=>{
        return(
          <Marker
          position={[parseFloat(m?.lat), parseFloat(m?.long)]}
          riseOnHover
          eventHandlers={{
            click: (e) => {
              setDest([m.lat, m.long]) // will print 'FooBar' in console
            },
          }}
          >
          <Popup >
            {m.name}
          </Popup>
          </Marker>
        );
      })
    }

    <Routing sourceCity={[lat, long]} destinationCity={dest}></Routing>
      {/* <Marker 
      position={[lat,long]}
      draggable={true}
      animate={true}
      >
        <Popup>
          Hey ! you found me
        </Popup>
        <Routing sourceCity={[lat, long]} ></Routing>
      </Marker> */}
    </MapContainer>
    }
    </div>
  )
}

export default Map