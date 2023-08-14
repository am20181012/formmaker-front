<template>
    <PageComponent title="Pocetna">
        <div v-if="loading" class="flex justify-center">Trenutno nema unetih testova</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700 mt-8">

            <div class="border-2 border-violet-600 rounded-3xl
                        font-semibold from-violet-400 via-violet-600 to-indigo-600 bg-gradient-to-r bg-clip-text text-transparent      
                        md:shadow p-3 text-center flex flex-col animate-fade-in-down order-1 lg:order-2" 
                 style="animation-delay: 0.1s">
                    <h3 class="text-4xl">Ukupno testvova</h3>
                    <div class="text-9xl flex-1 flex items-center justify-center">{{ data.numberOfForms ? data.numberOfForms : "0" }}</div>
                    <!-- <h3 class="text-2xl font-semibold">Total Forms</h3>
                    <div class="text-8xl flex-1 flex items-center justify-center font-semibold">{{ data.numberOfForms ? data.numberOfForms : "0" }}</div> -->
                </div>
                <!-- bg-gradient-to-bl from-lime-500 via-lime-300 to-white text-rose-400 -->
            <div class="border-2 border-blue-600 rounded-3xl 
                        font-semibold from-sky-600 via-blue-600 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent
                        shadow-md p-3 text-center flex flex-col animate-fade-in-down order-2 lg:order-4" 
                 style="animation-delay: 0.2s">
                <h3 class="text-4xl font-semibold">Ukupno odgovora</h3>
                <div class="text-9xl font-semibold flex-1 flex items-center justify-center">{{ data.numberOfAnswers ? data.numberOfAnswers : "0" }}</div>
            </div>
            <!-- bg-gradient-to-tr from-lime-500 via-lime-300 to-white -->
            <div class="border-2 border-fuchsia-600 rounded-3xl 
                        row-span-2 animate-fade-in-down order-3 lg:order-1 shadow-md p-4">
                <h3 class="flex justify-center text-3xl font-semibold from-pink-600 via-fuchia-600 to-fuchsia-700 bg-gradient-to-r bg-clip-text text-transparent mb-3">Poslednje izmene</h3>
                <img v-if="data.latestForm.image_url" :src="data.latestForm.image_url" class="w-[240px] mx-auto mb-3" alt=""/>
                <span v-else
                      class="flex items-center justify-center w-[240px] mx-auto mb-3 overflow-hidden bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke-width="1.5" 
                      stroke="currentColor" 
                      class="text-gray-300">
                        <path stroke-linecap="round" 
                              stroke-linejoin="round" 
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                </span>
                <h3 class="flex justify-center font-bold from-pink-600 via-fuchia-600 to-fuchsia-700 bg-gradient-to-r bg-clip-text text-transparent text-2xl text-center mb-3">{{ data.latestForm.title ? data.latestForm.title : "There is no form yet"}}</h3>
                <div class="flex justify-between text-md mb-3">
                    <div>Datum izmene:</div>
                    <div>{{ data.latestForm.latest_update }}</div>
                </div>
                <div class="flex justify-between text-md mb-3">
                    <div>Datum isteka:</div>
                    <div>{{ data.latestForm.expire_date }}</div>
                </div>
                <div class="flex justify-between text-md mb-3">
                    <div>Broj pitanja:</div>
                    <div>{{ data.latestForm.questions ? data.latestForm.questions.length : "0" }}</div>
                </div>
                <div class="flex justify-between text-md mb-3">
                    <div>Broj odgovora:</div>
                    <div>{{ data.latestForm.answers ? data.latestForm.answers.length : "0"}}</div>
                </div>
                <div class="flex justify-center">
                    <router-link :to="{ name: 'FormView', params: {id: data.latestForm.id}}" 
                                 class="flex py-2 px-4 text-sm rounded-md border border-fuchsia-600 shadow-sm shadow-fuchsia-600
                                 hover:border-none hover:bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:text-white 
                                 transition-colors">
                                 <svg xmlns="http://www.w3.org/2000/svg" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke-width="1.5" 
                                      stroke="currentColor" 
                                      class="h-5 w-5 mr-2">
                                    <path stroke-linecap="round" 
                                          stroke-linejoin="round" 
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>                                  
                        Izmeni
                    </router-link>
                    <!-- <button class="flex py-2 px-4 border border-transparent text-sm rounded-md 
                            text-idigo-500 hover:bg-indigo-700 hover:text-white transition-colors 
                            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                 fill="none" 
                                 viewBox="0 0 24 24" 
                                 stroke-width="1.5" 
                                 stroke="currentColor" 
                                 class="w-5 h-5 mr-2">
                                <path stroke-linecap="round" 
                                      stroke-linejoin="round" 
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" 
                                      stroke-linejoin="round" 
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              
                        View Answers
                    </button> -->
                </div>
            </div>

            <div class="border-2 border-rose-600
                        rounded-3xl row-span-2 animate-fade-in-down order-4 lg:order-3 shadow-md p-3" 
                 style="animation-delay: 0.3s">
                 
                    <div class="flex justify-center items-center mb-3 px-2">
                        <h3 class="text-3xl font-semibold from-rose-600 to-rose-700 bg-gradient-to-r bg-clip-text text-transparent">Odgovori</h3>
                    </div>
                    <div class="overflow-y-scroll" style="height: 50vh;">
                        
                            <div v-for="form of data.forms">
                                <a href="#" 
                                   v-for="answer of form.answers" 
                                   :key="answer.id"
                                   class="block p-2 hover:border border-rose-600 rounded-3xl">
                                   <div class="grid grid-cols-4 gap-4">
                                    <div>
                                        <img v-if="form.image_url" :src="form.image_url" class="w-[50px] mx-auto" alt=""/>
                                        <span v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                 fill="none" 
                                                 viewBox="0 0 24 24" 
                                                 stroke-width="1.5" 
                                                 stroke="currentColor" 
                                                 class="w-[50px] mx-auto text-rose-600">
                                                <path stroke-linecap="round" 
                                                      stroke-linejoin="round" 
                                                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="col-span-3">
                                        <div class="font-semibold">{{ form.title }}</div>
                                        <small>Vreme:
                                            <i class="font-semibold">{{ answer.createdAt }}</i>
                                        </small>
                                    </div>
                                </div>
                                </a>
                            </div>
                        
                    </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch('getDashboardData');

</script>

<style scoped>
</style>