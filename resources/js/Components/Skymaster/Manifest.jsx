import React, {Component, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Diary from "@/Components/Skymaster/Dairy.jsx";
import Jumpers from "@/Components/Skymaster/Jumpers.jsx";
import Sales from "@/Components/Skymaster/Sales.jsx";

export default function Manifest({ props }) {
    const lifts = [
        {
            order: 1,
            participants: [
                {
                    name: 'Joe Blogs',
                    weight: 79,
                },
                {
                    name: 'Peter Blogs',
                    weight: 87,
                },
            ]
        },
        {
            order: 2,
            participants: [
                {
                    name: 'Joe Notblogs',
                    weight: 79,
                },
                {
                    name: 'Peter Notblogs',
                    weight: 87,
                },
            ]
        },
    ]

    return (
        <div className="row p-2">
            {typeof lifts !== 'undefined' && lifts.length > 0 &&
                <Tabs defaultIndex={0} className={ 'bg-white rounded container-fluid' } >
                    <TabList>
                        {
                            lifts.map(
                                (value, index) => (
                                    <Tab value={index} key={'lift-'+index}>
                                        {value.order}
                                    </Tab>
                                )
                            )
                        }
                    </TabList>

                    {
                        lifts.map(
                            (value, index) => (
                                <TabPanel value={ 'tp-lift-'+index }>
                                    <div className="col-sm-auto container-fluid">
                                        {
                                            value.participants.map(
                                                (participant, innerindex) => (
                                                    <div className="row p-2" key={'p-'+index+'-'+innerindex}>{ participant.name }</div>
                                                )
                                            )
                                        }
                                    </div>
                                </TabPanel>
                            )
                        )
                    }

                </Tabs>
            }
    </div>
    )
}
