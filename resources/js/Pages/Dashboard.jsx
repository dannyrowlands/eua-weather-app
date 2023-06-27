import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import Button from "bootstrap/js/src/button.js";
import {ButtonPlugin} from "bootstrap-vue";
import React, {useEffect, useState} from 'react';


export default function Dashboard({ auth, data }) {
console.log('DATA::',data)
    const [weatherData, setWeatherData] = useState(data.weather);
    const [cityName, setCityName] = useState(data.locationName);
    const [favouriteList, setFavouriteList] = useState(data.favouriteList);

    useEffect(() => {
        console.log("loaded");
        getList()
    }, []);

    function getList()
    {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.get('api/favourites?user_id='+data.userId, null, config)
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Weather</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="float-left w-50">
                            <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                <div className="float-left w-25 p-2 m-2">Location: </div>
                                <div className="font-bold float-left w-25 p-2 m-2">{cityName}</div>
                                <div className="font-bold float-right w-25 p-2 m-2">
                                    <form onSubmit={addFavourite}>
                                        <input type="hidden" name="favourite" value={cityName}/>
                                        <input type="hidden" name="user_id" value={data.userId}/>
                                        <input type="submit" className="btn btn-outline-primary m-2" value="Add to Favourites"/>
                                    </form>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                <div className="">
                                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                        <div className="font-bold w-100">Favourites List:</div>
                                        <div className="sm:max-w-sm">

                                            <ul>
                                                {Object.keys(favouriteList).map((value, index) => {
                                                    let listValues = Object.values(favouriteList)[value];

                                                        return  <li key={index}>{listValues['data']}</li>

                                                })}
                                            </ul>
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
                                        <div className="p-2">
                                            Search above for your required location and select.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-50 float-right p-2">
                            <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2 flex-wrap">
                                <div className="font-bold">Information:</div>
                                {typeof weatherData.current !== 'undefined' &&
                                    <ul>
                                        {Object.keys(weatherData.current).map((value, index) => {
                                            let data = Object.values(weatherData.current)[index];
                                            if(typeof data !== 'object') {
                                                return  <li key={index}>{value} {data}</li>
                                            }
                                        })}
                                    </ul>
                                }







                                {typeof weatherData.current !== 'undefined' && typeof weatherData.current.weather !== 'undefined' &&
                                    <div>
                                        <div className="font-bold">Weather:</div>
                                        <ul>
                                            {Object.keys(weatherData.current.weather[0]).map((value, index) => {
                                                let data = Object.values(weatherData.current.weather[0])[index];
                                                if(typeof data !== 'object') {
                                                    return <li key={index}>{value} {data}</li>
                                                }
                                            })}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </AuthenticatedLayout>
    );
}
