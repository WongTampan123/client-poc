import React,{useState, useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:5000/')

function Bar() {
    const [persenBatere, setPersenBatere] = useState(76)
    const [persenSuhu, setPersenSuhu] = useState(76)
    var style=[
        {
            marginTop: persenBatere+'vh',
            marginLeft: '112px'
        },
        {
            marginTop: persenSuhu+'vh',
            marginLeft: '1090px'
        }
    ]

    useEffect(function() {
        // const interval = setInterval(()=>{
        //     axios.get('http://localhost:5000/data-bar').then((response)=>{
        //         console.log(response.data)
        //         const batere = hitungBar(response.data.persenBatere)
        //         const suhuLingkungan = hitungBar(response.data.suhuLingkungan)

        //         setPersenBatere(batere)
        //         setPersenSuhu(suhuLingkungan)

        //         style[0].marginTop=persenBatere+'vh'
        //         style[1].marginTop=persenSuhu+'vh'
        //     })
        // }, 100)
        // return () => clearInterval(interval)
        socket.on('data-bar', data => {
            const batere = hitungBar(data.persen_batere)
            const persenSuhuLingkungan = hitungBar((100*data.suhu_lingkungan)/60)

            console.log(persenSuhuLingkungan)
            setPersenBatere(batere)
            setPersenSuhu(persenSuhuLingkungan)

            console.log(persenSuhuLingkungan)
            style[0].marginTop=persenBatere+'vh'
            style[1].marginTop=persenSuhu+'vh'
        })
    },[socket])

    function hitungBar(persen){
        if(persen>85.7){
            return 57
        } else if(persen > 71.4 && persen <= 85.7 ){
            return 60
        } else if(persen > 57.1 && persen <= 71.4 ){
            return 63
        } else if(persen > 42.8 && persen <= 57.1 ){
            return 66
        } else if(persen > 28.5 && persen <= 42.8 ){
            return 69
        } else if(persen > 14.2 && persen <= 28.5 ){
            return 73
        } else if(persen <= 14.2){
            return 76
        } else {
            return 76
        }
    }


    return(
        <div style={{display: 'flex', width: '100%', height: '100%'}}>
        <div className='container-div bar' style={style[0]}>
        </div>
        <div className='container-div bar' style={style[1]}>
        </div>
        </div>
    )
}

export default Bar