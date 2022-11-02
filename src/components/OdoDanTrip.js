import React, {useState, useEffect} from "react";
import axios from "axios";

function OdoDanTrip(prop){
    const [jarak, setJarak] = useState(0)

    useEffect(function() {
        const interval = setInterval(()=>{
            axios.get('http://localhost:5000/data-odo-trip').then((response)=>{
                console.log(response.data)
                
                if(prop.nama==="ODO"){
                    setJarak(response.data.ODO)
                } else {
                    setJarak(response.data.TRIP)
                }
            })
        }, 10000)
        return () => clearInterval(interval)
    },[])


    return(
        <div className="container-div odo-dan-trip">
            <div style={{display: 'flex'}}>
                <p style={{color: '#3c3c3c'}}>{prop.nama}</p>
                <p style={{marginLeft: '5px', textAlign: 'left'}}>{jarak} km</p>
            </div>                     
        </div>
    )
}

export default OdoDanTrip;