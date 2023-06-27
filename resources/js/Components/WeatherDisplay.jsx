import dayjs from "dayjs";
export default function WeatherDisplay(incomingData) {

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    };

    const date = new Date(incomingData.weatherData.dt)
    const sunrise = new Date(incomingData.weatherData.sunrise)
    const sunset = new Date(incomingData.weatherData.sunset)

    return (
        <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2 flex-wrap">
            <div className="font-bold">Detailed Forecast:</div>
            <div className="col-12">
                Date: {dayjs(date).format('DD-MM-YYYY')}
            </div>
            <div className="col-12">
                Sun Rise: {dayjs(sunrise).format('H:mm')}
            </div>
            <div className="col-12">
                Sun Set: {dayjs(sunset).format('H:mm')}
            </div>
            <div className="col-12">
                Temperature Day: {incomingData.weatherData.temp.day} C
            </div>
            <div className="col-12">
                Temperature Evening: {incomingData.weatherData.temp.eve} C
            </div>
            <div className="col-12">
                Pressure: {incomingData.weatherData.pressure}
            </div>
            <div className="col-12">
                Rain: {incomingData.weatherData.rain}%
            </div>
            <div className="col-6">
                Wind Speed: {incomingData.weatherData.wind_speed} mph
            </div>
            <div className="col-6">
                Wind Direction: {incomingData.weatherData.wind_deg}
            </div>
            <div className="col-6">
                Wind Gusts: {incomingData.weatherData.wind_gust} mph
            </div>
            <div className="col-6 pb-6">
                UV Index: {incomingData.weatherData.uvi}
            </div>

            {typeof incomingData.weatherData.weather !== 'undefined' &&
                <div>
                    <div className="font-bold">Outlook Summary:</div>
                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2 flex-wrap row">
                        <div className="col-12">
                            {capitalizeFirst(incomingData.weatherData.weather[0].main)}
                        </div>
                        <div className="col-12">
                            {capitalizeFirst(incomingData.weatherData.weather[0].description)}
                        </div>
                        <div className="col-4">
                            <img src={'https://openweathermap.org/img/wn/'+incomingData.weatherData.weather[0].icon+'@2x.png'}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
