import React, {useState, useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:5000/')

function OdoDanTrip(prop){
    const [kecepatan, setKecepatan] = useState(0)
    const [jarak, setJarak] = useState(0)

    useEffect(function() {
        socket.on('data-kecepatan', data=>{
            setKecepatan(data.kecepatan)
        })
        if(prop.nama==="TRIP"){
            socket.on('data-reset-trip', data=>{
              if(data.TRIP===true){
                setJarak(0.00)
              }
            })
        }
        const interval = setInterval(()=>{
            const tempJarak = (Number(kecepatan)/3600).toFixed(2)
            setJarak(parseFloat(jarak)+parseFloat(tempJarak))
            console.log(tempJarak)
        },1000)
        return () => clearInterval(interval) 
    },[socket,prop,kecepatan,jarak])


    return(
        <div className="container-div odo-dan-trip">
            <div style={{display: 'flex'}}>
                <p style={{color: '#3c3c3c'}}>{prop.nama}</p>
                <p style={{marginLeft: '5px', textAlign: 'left'}}>{jarak.toFixed(2)} km</p>
            </div>                     
        </div>
    )
}

export default OdoDanTrip;