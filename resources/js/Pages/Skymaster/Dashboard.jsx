import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useState} from "react";
import Diary from "@/Components/Skymaster/Dairy";
import Manifest from "@/Components/Skymaster/Manifest";
import Jumpers from "@/Components/Skymaster/Jumpers";
import Sales from "@/Components/Skymaster/Sales";

export default function SkymasterLayout({ auth }) {
    const modules = [
        {
            name: 'Dairy',
        },
        {
            name: 'Manifest',
        },
        {
            name: 'Jumpers',
        },
        {
            name: 'Sales',
        },
    ]


    const [tabIndex, setTabIndex] = useState(0)

    console.log(auth)
    return (
        <div className="col-sm">
            <div className="row p-2">
                {typeof modules !== 'undefined' && modules.length > 0 &&
                    <Tabs defaultIndex={0} className={ 'bg-white rounded container-fluid' } onSelect={(index, last, event ) => setTabIndex(event.target.value)}>
                        <TabList>
                            {
                                modules.map(
                                    (value, index) => (
                                        <Tab value={index} key={index}>
                                            {modules[index].name}
                                        </Tab>
                                    )
                                )
                            }
                        </TabList>

                        <TabPanel value={ 'tp-diary' }>
                            <div className="col-sm-auto container-fluid">
                                <div className="row p-2">
                                    <Diary></Diary>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel value={ 'tp-manifest' }>
                            <div className="col-sm-auto container-fluid">
                                <div className="row p-2">
                                    <Manifest></Manifest>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel value={ 'tp-jumpers' }>
                            <div className="col-sm-auto container-fluid">
                                <div className="row p-2">
                                    <Jumpers></Jumpers>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel value={ 'tp-sales' }>
                            <div className="col-sm-auto container-fluid">
                                <div className="row p-2">
                                    <Sales></Sales>
                                </div>
                            </div>
                        </TabPanel>

                    </Tabs>
                }
            </div>
        </div>
    );
}
