
export default function WeatherDisplay(incomingData) {
 console.log('Weather DISPLAY DATA::',incomingData.weatherData)
    return (
        <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2 flex-wrap">
            <div className="font-bold">Information:</div>
            {typeof incomingData.weatherData !== 'undefined' &&
                <ul>
                    {Object.keys(incomingData.weatherData).map((value, index) => {
                        let data = Object.values(incomingData.weatherData)[index];
                        if(typeof data !== 'object') {
                            return  <li key={index}>{value} {data}</li>
                        }
                    })}
                </ul>
            }

            {typeof incomingData.weatherData.weather !== 'undefined' &&
                <div>
                    <div className="font-bold">Weather:</div>
                    <ul>

                        <li>{incomingData.weatherData.weather[0].description}</li>


                    </ul>
                </div>
            }
        </div>
    );
};
