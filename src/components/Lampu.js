import React,{useState, useEffect} from "react";
import axios from "axios";

function Lampu(){
    const intialLampu = [false,false,false,false,0]
    const [lampuActive, setLampuActive] = useState(intialLampu)

    useEffect(function() {
        const interval = setInterval(()=>{
            axios.get('http://localhost:5000/data-lampu').then((response)=>{
                console.log(response.data)
                var dataLampu = [...intialLampu]
                dataLampu[0] = response.data.lampuHijau2
                dataLampu[1] = response.data.lampuHijau
                dataLampu[2] = response.data.lampuBiru
                dataLampu[3] = response.data.lampuP
                dataLampu[4] = response.data.lampuSen

                setLampuActive(dataLampu)
                console.log(lampuActive)
            })
        }, 100)
        return () => clearInterval(interval)
    },[])

    return(
        <div className='container-div'>
            <div style={{display: 'flex'}} className='lampu'>
                {console.log(lampuActive[0])}
                {lampuActive[0]===true? <img src='./img/lampuHijau2.png'></img>:<img src='./img/lampuHijau2_mati.png'></img>}
                {lampuActive[1]===true? <img src='./img/lampuHijau.png'></img>:<img src='./img/lampuHijau_mati.png'></img> }
                {lampuActive[2]===true? <img src='./img/lampuBiru.png'></img>:<img src='./img/lampuBiru_mati.png'></img> }
                {lampuActive[3]===true? <img src='./img/lampuP.png'></img>:<img src='./img/lampuP_mati.png'></img> }                
            </div>
            <div style={{display: 'flex'}} className='lampu-sen'>
                {lampuActive[4]===1? <img src='./img/lampuSen.png'></img>:<img src='./img/lampuSen_mati.png'></img>}
                {lampuActive[4]===2? <img src='./img/lampuSen.png' style={{transform: "scaleX(-1)", marginLeft:'10px'}}></img>:<img src='./img/lampuSen_mati.png' style={{transform: "scaleX(-1)", marginLeft:'10px'}}></img>}
            </div>
        </div>
    )
}

export default Lampu