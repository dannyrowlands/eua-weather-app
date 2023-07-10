import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import Button from "bootstrap/js/src/button.js";
import {ButtonPlugin} from "bootstrap-vue";
import React, {useEffect, useState} from 'react';
import Checkbox from "@/Components/Checkbox.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WeatherDisplay from "@/Components/WeatherDisplay.jsx";


export default function Weather({ auth, data }) {

    const [weatherData, setWeatherData] = useState(data.weather)
    const [cityName, setCityName] = useState(data.locationName)
    const [favouriteList, setFavouriteList] = useState(data.favouriteList)
    const [emailState, setEmailState] = useState(data.emailState)
    const [tabIndex, setTabIndex] = useState(0)
    const [dayList, setDayList] = useState([])

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    };

    useEffect(() => {
        getDays()
        getList()
    }, []);

    function getDays()
    {
        if(typeof weatherData.daily !== 'undefined') {
            const dayArray = []
            weatherData.daily.map(
                data => (
                    dayArray.push(new Date(data.dt).toLocaleDateString('en-UK', {
                        weekday: 'short'
                    }))
                ))
            setDayList(dayArray)
        }
    }

    function getList()
    {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.get('api/favourites?user_id='+auth.user.id, null, config)
            .then(response => {
                setFavouriteList(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const city = formData.get('city')

        axios.get('api/weather/'+city, formData, config)
            .then(response => {
                setCityName(city)
                setWeatherData(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addFavourite(event) {
        // Prevent default behavior
        event.preventDefault();
        const formData = new FormData(event.target)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('api/favourite', formData, config)
            .then(response => {
                getList()
            })
            .catch(error => {
                console.log(error)
            });
    }

    function handleToggleEmail() {

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        let params = {
            new_state: !emailState,
            user_id: auth.user.id
        }

        axios.post('api/email-toggle', params, config)
            .then(response => {
                setEmailState(!emailState)
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Forecast</h2>}
        >
            <Head title="Forecast" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg row">
                        <div className="col-sm p-2">
                            <div className="row border-gray-400 overflow-hidden shadow-sm sm:rounded-lg m-2 p-2">
                                <div className="col-sm font-bold"></div>
                                <div className="col-sm h3">{capitalizeFirst(cityName)}</div>
                                <div className="font-bold col-sm">
                                    <form onSubmit={addFavourite}>
                                        <input type="hidden" name="favourite" value={cityName}/>
                                        <input type="hidden" name="user_id" value={auth.user.id}/>
                                        <input type="submit" className="btn btn-outline-primary" value="Add to Favourites"/>
                                    </form>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                <div className="">
                                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                        <div className="font-bold w-100">Favourites</div>
                                        <div className="sm:max-w-sm row">


                                                {Object.keys(favouriteList).map((value, index) => {
                                                    let listValues = Object.values(favouriteList)[value];

                                                        return  <div className="col-sm" key={listValues['id']}>
                                                            <form onSubmit={handleSubmit}>
                                                                <input type="hidden" name="city" value={listValues['data']}></input>
                                                                <input type="submit" className="btn btn-outline-primary m-2" value={capitalizeFirst(listValues['data'])}/>
                                                            </form>
                                                        </div>

                                                })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                    <form onSubmit={handleSubmit}>
                                        <TextInput className={'p-2'} placeholder="Search Location...." name={'city'}></TextInput>
                                        <input type="submit" className="btn btn-outline-primary m-2" value="Get Weather"/>
                                    </form>
                                    <div>
                                        Enter name above for your required location.
                                    </div>
                                </div>

                                <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg m-2 flex-wrap row">
                                    <div className="col-sm">Receive daily email forecasts.</div>
                                    <div className="col-sm">
                                        <Checkbox checked={emailState} onChange={handleToggleEmail}></Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="row p-2">
                                {typeof weatherData.daily !== 'undefined' && dayList.length > 0 &&
                                    <Tabs defaultIndex={0} onSelect={(index, last, event ) => setTabIndex(event.target.value)}>
                                        <TabList>
                                            {
                                                dayList.map(
                                                    (value, index) => (
                                                            <Tab value={index} key={index}>
                                                                {index === 0 ? 'Today' : value}
                                                            </Tab>
                                                    )
                                                )
                                            }
                                        </TabList>
                                        <TabPanel>
                                            <WeatherDisplay tabId={1} weatherData={weatherData.daily[0]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={2} weatherData={weatherData.daily[1]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={3} weatherData={weatherData.daily[2]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={4} weatherData={weatherData.daily[3]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={5} weatherData={weatherData.daily[4]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={6} weatherData={weatherData.daily[5]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={7} weatherData={weatherData.daily[6]}></WeatherDisplay>
                                        </TabPanel>
                                        <TabPanel>
                                            <WeatherDisplay tabId={8} weatherData={weatherData.daily[7]}></WeatherDisplay>
                                        </TabPanel>
                                    </Tabs>
                                }
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
