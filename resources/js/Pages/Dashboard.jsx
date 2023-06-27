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


export default function Dashboard({ auth, data }) {
console.log('DATA::',data.weather.daily[1])
    const [weatherData, setWeatherData] = useState(data.weather);
    const [cityName, setCityName] = useState(data.locationName);
    const [favouriteList, setFavouriteList] = useState(data.favouriteList);
    const [emailState, setEmailState] = useState(data.emailState);
    const [tabIndex, setTabIndex] = useState(0)

    const dayList = []

    data.weather.daily.map(
        data => (
            dayList.push(new Date(data.dt).toLocaleDateString('en-UK', {
                weekday: 'short'
            }))
        ))

    useEffect(() => {
        console.log("loaded");
        getList()
    }, []);

    useEffect(() => {
        console.log("tabIndex changed");
    }, [tabIndex]);

    function getList()
    {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.get('api/favourites?user_id='+auth.user.id, null, config)
            .then(response => {
                console.log('FAVOURITES LIST::',response.data)
                setFavouriteList(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        const formData = new FormData(event.target);
        console.log(formData.get('city'))
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const city = formData.get('city')

        axios.get('api/weather/'+city, formData, config)
            .then(response => {
                console.log(response.data)
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
        console.log('ADD FAVOURITE')
        const formData = new FormData(event.target);
        console.log(formData.get('favourite'))
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('api/favourite', formData, config)
            .then(response => {
                getList();
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleToggleEmail() {
        console.log('handleToggleEmail')

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        let params = {
            new_state: !emailState,
            user_id: auth.user.id
        }
console.log('PARAMS',params)
        axios.post('api/email-toggle', params, config)
            .then(response => {
                console.log(response.data)
                setEmailState(!emailState)
            })
            .catch(error => {
                console.log(error);
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
                        <div className="col-6 p-2">
                            <div className="row border-gray-400 overflow-hidden shadow-sm sm:rounded-lg m-2 p-2 col-12">
                                <div className="col-4 font-bold">Location: </div>
                                <div className="col-4">{cityName}</div>
                                <div className="font-bold col-4">
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
                                        <div className="font-bold w-100">Favourites:</div>
                                        <div className="sm:max-w-sm row">


                                                {Object.keys(favouriteList).map((value, index) => {
                                                    let listValues = Object.values(favouriteList)[value];

                                                        return  <div className="col-4" key={listValues['id']}>
                                                            <form onSubmit={handleSubmit}>
                                                                <input type="hidden" name="city" value={listValues['data']}></input>
                                                                <input type="submit" className="btn btn-outline-primary m-2" value={listValues['data']}/>
                                                            </form>
                                                        </div>

                                                })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                        <form onSubmit={handleSubmit}>
                                            <TextInput className="p-2" placeholder="Search Location...." name="city"></TextInput>
                                            <input type="submit" className="btn btn-outline-primary m-2" value="Get Weather"/>
                                        </form>
                                        <div>
                                            Search above for your required location and select.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-50 col-6">
                            <div className="col-12 row">
                                <Tabs defaultIndex={0} onSelect={(index, last, event ) => console.log(event.target.value)}>
                                    <TabList>
                                        {
                                            dayList.map(
                                                (value, index) => (
                                                        <Tab value={index} key={index}>
                                                            {value}
                                                        </Tab>
                                                )
                                            )
                                        }
                                    </TabList>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[0]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[1]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[2]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[3]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[4]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[5]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[6]}></WeatherDisplay>
                                    </TabPanel>
                                    <TabPanel>
                                        <WeatherDisplay weatherData={data.weather.daily[7]}></WeatherDisplay>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>

                        <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2 flex-wrap row col-12">
                            <div className="col-6">Receive daily email forecasts.</div>
                            <div className="col-6">
                                <Checkbox checked={emailState} onChange={handleToggleEmail}></Checkbox>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
