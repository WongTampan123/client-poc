import React, {useState, useEffect} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io.connect('http://localhost:5000/')

function Meteran(prop) {
    const [panjangTempMotor, setPanjangTempMotor] = useState(0)
    const [panjangTempBatere, setPanjangTempBatere] = useState(0)
    var stylePanjang = [
        {
            width: panjangTempMotor+'px'
        },
        {
            width: panjangTempBatere+'px'
        }
    ]

    useEffect(function() {
        // const interval = setInterval(()=>{
        //     axios.get('http://localhost:5000/data-meteran').then((response)=>{
        //         console.log(response.data)
        //         const tempMotor = hitungPanjangMeteran(response.data.tempMotor>60? 60:response.data.tempMotor)
        //         const tempBatere = hitungPanjangMeteran(response.data.tempBatere>60? 60:response.data.tempBatere)

        //         setPanjangTempMotor(tempMotor)
        //         setPanjangTempBatere(tempBatere)

        //         stylePanjang[0].width=panjangTempMotor+'px'
        //         stylePanjang[1].width=panjangTempBatere+'px'
        //     })
        // }, 100)
        // return () => clearInterval(interval)
        socket.on("data-meteran", data => {
            const tempMotor = hitungPanjangMeteran(data.temp_motor>60? 60:data.temp_motor)
            const tempBatere = hitungPanjangMeteran(data.temp_batere>60? 60:data.temp_batere)

            setPanjangTempMotor(tempMotor)
            setPanjangTempBatere(tempBatere)

            stylePanjang[0].width=panjangTempMotor+'px'
            stylePanjang[1].width=panjangTempBatere+'px'
        })
    },[socket])

    function hitungPanjangMeteran(isi){
        const panjangMeteran = (329*isi)/60

        return panjangMeteran
    }  


    // Buat ngitung panjang meteran = (329*x)/60

    return(
        <div className='container-div meteran' style={{marginBottom: '0px'}}>
            <div style={{marginBottom: '10px'}}>
            <div>
                <p style={{textAlign: 'center'}}>{(panjangTempBatere*60)/329} C</p>
            </div>
            <img src='./img/meteran.png'></img>
            <div className='bar-temp-baterai' style={stylePanjang[1]}></div>
            <div style={{display: 'fblock'}}>
                <div style={{textAlign: "center"}}>
                    <p className='text-meteran' style={{marginRight: '92px',marginLeft: '10px'}}>0.0</p>
                    <p className='text-meteran'>TEMP BATERAI</p>
                    <p className='text-meteran' style={{marginLeft: '101px'}}>60</p>
                </div>                
            </div>
            </div>
            <div style={{marginTop: '33px'}}>
            <div>
                <p style={{textAlign: 'center'}}>{(panjangTempMotor*60)/329} C</p>
            </div>
            <img src='./img/meteran.png'></img>
            <div className='bar-temp-baterai' style={stylePanjang[0]}></div>
            <div style={{display: 'fblock'}}>
                <div style={{textAlign: "center"}}>
                    <p className='text-meteran' style={{marginRight: '92px',marginLeft: '10px'}}>0.0</p>
                    <p className='text-meteran'>TEMP MOTOR</p>
                    <p className='text-meteran' style={{marginLeft: '101px'}}>60</p>
                </div>                
            </div>
            </div>
        </div>
    )
}

export default Meteran