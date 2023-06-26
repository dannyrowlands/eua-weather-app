import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import Button from "bootstrap/js/src/button.js";
import {ButtonPlugin} from "bootstrap-vue";
import React, { useState } from 'react';


export default function Dashboard({ auth, data }) {

    const [weatherData, setWeatherData] = useState([]);

    function handleSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        const formData = new FormData(event.target);
        console.log(formData.get('city'))
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.get('api/weather/'+formData.get('city'), formData, config)
            .then(response => {
                console.log(response.data);
                setWeatherData(response.data)
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
                                <div className="font-bold float-left w-25 p-2 m-2">{data.locationName}</div>
                                <div className="font-bold float-right w-25 p-2 m-2"><button type="submit" className="btn btn-outline-primary">Add to Favourites</button></div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                <div className="">
                                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                        <div className="font-bold w-100">Favourites List:</div>
                                        <div className="sm:max-w-sm">
                                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg"className="bg-white overflow-hidden shadow-sm sm:rounded-lg"
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="">
                                    <div className="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                        <form onSubmit={handleSubmit}>
                                            <TextInput className="p-2" placeholder="Search Location...." name="city"></TextInput>
                                            <input type="submit" className="btn" value="Get Weather"/>
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
                                <div className="font-bold">Weather info:</div>
                                {typeof weatherData.current !== 'undefined' &&
                                    <ul>
                                        {Object.keys(weatherData.current).map((value, index) => {
                                            return <li key={index}>{value} {weatherData.current.value}</li>
                                        })}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </AuthenticatedLayout>
    );
}
