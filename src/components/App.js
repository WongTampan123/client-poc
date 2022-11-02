import React from 'react';
import Kecepatan from './Kecepatan';
import JamDanSuhu from './JamDanSuhu';
import OdoDanTrip from './OdoDanTrip';
import Lampu from './Lampu';
import Meteran from './Meteran';
import Bar from './Bar';
import Jarum from './Jarum';

function App() {

    return(
        <div>
            <div className='bg-image'>            
            </div>
            <Kecepatan />
            <JamDanSuhu />
            <OdoDanTrip nama={"TRIP"} angka={"0004.8"} />
            <div style={{marginLeft:'175px'}}>
                <OdoDanTrip nama={"ODO"} angka={"0004.8"} />
            </div>     
            <Lampu />
            <Meteran />
            <Bar />
            <Jarum />
        </div>
        
    )
}

export default App