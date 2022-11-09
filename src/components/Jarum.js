import React,{useState, useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:5000/')

function Jarum() {
    const [sudutJarum, setSudutJarum] = useState(90)
    var styleJarum = {
        transform: `rotate(${sudutJarum}deg)`
    }

    useEffect(function() {
        // const interval = setInterval(()=>{
        //     axios.get('http://localhost:5000/data-kecepatan').then((response)=>{
        //         const dataKecepatan = response.data.kecepatan
        //         const updateSudut = hitungSudutJarum(dataKecepatan>80? 80:dataKecepatan)

        //         setSudutJarum(updateSudut)
        //         styleJarum.transform=`rotate(${sudutJarum}deg)`
        //     })
        // }, 100)
        // return () => clearInterval(interval)

        socket.on('data-kecepatan', (data)=>{
            const dataKecepatan = data.kecepatan
            const updateSudut = hitungSudutJarum(dataKecepatan>80? 80:dataKecepatan)

            setSudutJarum(updateSudut)
            styleJarum.transform=`rotate(${sudutJarum}deg)`
        })
    },[socket])

    function hitungSudutJarum(prop){
        let hasil = (prop*210)/80
        hasil = Math.floor(hasil*100)
        hasil = 90+(hasil/100)

        return hasil
    }

    return(
        <div className="container-div jarum">
            <img src="./img/jarum.png" style={styleJarum}></img>
        </div>
    )
}

export default Jarum