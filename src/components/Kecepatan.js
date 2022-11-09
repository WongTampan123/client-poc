import React,{useState, useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:5000/')

function Kecepatan() {
    const [kecepatan, setKecepatan] = useState(0)

    useEffect(function() {
        // const interval = setInterval(()=>{
        //     axios.get('http://localhost:5000/data-kecepatan').then((response)=>{
        //         const dataKecepatan = response.data.kecepatan

        //         setKecepatan(dataKecepatan>80? 80:dataKecepatan)
        //     })
        // }, 100)
        // return () => clearInterval(interval)
        socket.on('data-kecepatan', (data)=>{
            const dataKecepatan = data.kecepatan

            setKecepatan(dataKecepatan>80? 80:dataKecepatan)
        })

    },[socket])

    return(
        <div className="container-div kecepatan">
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <div style={{width: '100px', textAlign: 'right'}} className="text-normal">
                    <h1 style={{color: 'white', margin: '0'}}>{kecepatan}</h1>
                </div>
                <h3 className="text-normal">Km/h</h3>
            </div>
        </div>        
    )
}

export default Kecepatan