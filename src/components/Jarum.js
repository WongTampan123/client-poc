import React,{useState, useEffect} from "react";
import axios from "axios";

function Jarum() {
    const [sudutJarum, setSudutJarum] = useState(90)
    const styleJarum = {
        transform: `rotate(${sudutJarum}deg)`
    }

    useEffect(function() {
        const interval = setInterval(()=>{
            axios.get('http://localhost:5000/data-kecepatan').then((response)=>{
                const updateSudut = hitungSudutJarum(response.data.kecepatan)

                setSudutJarum(updateSudut)
                styleJarum.transform=`rotate(${sudutJarum}deg)`
            })
        }, 100)
        return () => clearInterval(interval)
    },[])

    function hitungSudutJarum(prop){
        let hasil = (prop*210)/800
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