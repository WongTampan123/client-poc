import React,{useEffect, useState} from "react";
import axios from "axios";

function JamDanSuhu(){
    const date = new Date()
    const [suhu, setSuhu] = useState(0)
    const [jam, setJam] = useState(date.getHours())
    const [menit, setMenit] = useState(date.getMinutes()>9? date.getMinutes():"0"+date.getMinutes())
    

    useEffect(function() {
        const interval = setInterval(()=>{
            axios.get('http://localhost:5000/data-suhu-lingkungan').then((response)=>{
                console.log(response.data)

                setSuhu(response.data.suhuLingkungan)                
            })
            const date = new Date()
            const jamSekarang = date.getHours()
            const menitSekarang = date.getMinutes()>9? date.getMinutes():"0"+date.getMinutes()
            setJam(jamSekarang)
            setMenit(menitSekarang)
            console.log(jamSekarang+":"+menitSekarang)
        }, 10000)
        return () => clearInterval(interval)
    },[])

    return(
        <div className="container-div jam-dan-suhu">
            <div style={{display: 'flex'}}>
                <p>{jam}:{menit}</p>
                <p style={{marginLeft: '100px', textAlign: 'right'}}>{suhu} C</p>
            </div>            
        </div>
    )
}

export default JamDanSuhu;