<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import TextInput from "@/Components/TextInput.vue";

</script>

<template>
    <Head title="Weather" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Weather</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="float-left w-50">
                        <div class="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                            <span>Location: </span><span class="font-bold">Current Location</span><span class="font-bold"><button type="submit" class="btn btn-outline-primary">Add to Favourites</button></span>
                        </div>
                        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="float-left w-50">
                                <div class="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                    <span class="font-bold">Favourites List:</span>
                                </div>
                            </div>
                            <div class="float-right w-50">
                                <div class="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                                    <text-input class="p-2" placeholder="Search Location...." v-on:keyup="console.log('test')" modelValue=""></text-input>

                                    <div class="p-2">
                                        Search above for your required location and select.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="float-right w-50">
                        <div class="border-gray-400 overflow-hidden shadow-sm sm:rounded-lg p-2 m-2">
                            <span class="font-bold">Weather info:</span>

                        </div>
                    </div>
                </div>




            </div>

        </div>
    </AuthenticatedLayout>
</template>

