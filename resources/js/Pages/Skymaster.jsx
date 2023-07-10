import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import Button from "bootstrap/js/src/button.js";
import {ButtonPlugin} from "bootstrap-vue";
import React, {useEffect, useState} from 'react';
import Checkbox from "@/Components/Checkbox.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SM_Content from '@/Layouts/Skymaster/SkymasterLayout';
import SkymasterLayout from "@/Layouts/Skymaster/SkymasterLayout";

export default function Skymaster({ auth, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Skymaster DB</h2>}
        >
            <Head title="Skymaster DB" />
            <SkymasterLayout auth={auth} data={data}></SkymasterLayout>
        </AuthenticatedLayout>
    );
}
