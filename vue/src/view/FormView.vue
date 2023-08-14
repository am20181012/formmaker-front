<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent">{{ route.params.id ? model.title : "Kreiranje testa" }}</h1>
                <button v-if="route.params.id"
                        type="button"
                        @click="deleteForm()"
                        class="py-2 px-3 border border-red-400 from-rose-600 to-red-800 bg-gradient-to-r bg-clip-text text-transparent rounded-md hover:border-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             stroke-width="1.5" 
                             stroke="currentColor" 
                             class="w-5 h-5 -mt-1 inline-block text-rose-600">
                            <path stroke-linecap="round" 
                                  stroke-linejoin="round" 
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Izbrisi test
                </button>
            </div>
        </template>

        <div v-if="loadingFleg" class="flex justify-center">Loading...</div>
        <form @submit.prevent="saveForm" class="animate-fade-in-down border border-violet-400 shadow-md shadow-violet-400">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <!--Image-->
                    <div>
                        <label class="block text-sm font-medium text-black">Slika</label>
                        <div class="mt-1 flex items-center">
                            <img v-if="model.image_url"
                                 :src="model.image_url"
                                 :alt="model.title"
                                 class="w-64 h-48 object-cover"/>
                            <span v-else
                                  class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden">
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                       fill="none" 
                                       viewBox="0 0 24 24" 
                                       stroke-width="1.5" 
                                       stroke="currentColor" 
                                       class="h-[80%] w-[80%] text-violet-400">
                                       <path stroke-linecap="round" 
                                             stroke-linejoin="round" 
                                             d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                  </svg>
                            </span>
                            <button type="button" 
                                    class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-violet-400 rounded-md
                                      shadow-sm shadow-violet-400 text-sm leading-4 font-medium text-violet-600 hover:bg-gradient-to-r from-purple-500 to-indigo-700 hover:text-white focus:outline-none
                                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <input type="file"
                                           @change="onImageChoose"
                                           class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"/>
                                Postavi
                            </button>
                        </div>
                    </div>

                    <!--Title-->
                    <div>
                        <label for="title" class="block text-sm font-medium text-black">Naslov</label>
                        <input type="text" name="title" id="title" v-model="model.title" autocomplete="form_title"
                               class="mt-1 focus:border-violet-400 block w-full shadow-sm shadow-violet-400
                                      sm:text-sm border-violet-400 rounded-md" />
                    </div>

                    <!--Description-->
                    <div>
                        <label for="about" class="block text-sm font-medium text-black">Opis</label>
                        <div class="mt-1">
                            <textarea id="description" name="description" rows="3" v-model="model.description" 
                                      autocomplete="form_title" class="shadow-sm
                                      focus:border-violet-400 mt-1 block w-full shadow-sm shadow-violet-400 
                                      sm:text-sm border border-violet-400 rounded-md" 
                                      placeholder="Describe your form" />
                        </div>
                    </div>

                    <!--Expire Date-->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-black">Datum isteka</label>
                        <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date"
                               class="mt-1  focus:border-violet-400 block w-full shadow-sm shadow-violet-400
                                      sm:text-sm border-violet-400 rounded-md" />
                    </div>

                    <!--Status-->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="status" name="status" type="checkbox" v-model="model.status"
                                   class="h-4 w-4 focus:ring-violet-600 text-violet-600 border-violet-400 rounded"/>
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-black">Aktivna</label>
                        </div>
                    </div>

                </div>

                <!--Questions-->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent flex items-center justify-between">
                        Pitanja

                        <!--button for new question-->
                        <button type="button" @click="addQuestion()" 
                                class="flex items-center border border-transparent text-sm from-sky-600 via-blue-600 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent py-1 px-4 rounded-sm hover:border-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                     fill="none" 
                                     viewBox="0 0 24 24" 
                                     stroke-width="1.5" 
                                     stroke="currentColor" 
                                     class="w-6 h-6 text-sky-600">
                                    <path stroke-linecap="round" 
                                          stroke-linejoin="round"
                                           d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                            Dodaj pitanje
                        </button>
                    </h3>

                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        Trenutno nema kreiranih pitanja
                    </div>
                    <div v-for="(question, index) in model.questions" :key="question.id">
                        <QuestionEditor :question="question" 
                                        :index="index" 
                                        @change="questionChange"
                                        @addQuestion="addQuestion"
                                        @deleteQuestion="deleteQuestion"/>
                    </div>

                </div>

                <!--Foother of the form-->
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" 
                            class="inline-flex hustify-center py-2 px-4 border border-violet-400 shadow-sm shadow-violet-400 text-sm
                               font-medium rounded-md text-violet-600 hover:bg-gradient-to-r from-purple-500 to-indigo-700 hover:text-white">
                        Sacuvaj
                    </button>
                </div>

            </div>
        </form>
    </PageComponent>
</template>

<script setup>
    import PageComponent from '../components/PageComponent.vue';
    import store from '../store';
    import { ref, watch, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import QuestionEditor from '../components/editor/QuestionEditor.vue';
    import { v4 as uuidv4 } from 'uuid';

    const router = useRouter();

    const route = useRoute();

    const loadingFleg = computed( () => store.state.currentForm.loading );

    let model = ref({
        title: "",
        status: false,
        description: null,
        image: null,
        expire_date: null,
        questions: [],
        user_id: null
    });

    watch(
        () => store.state.currentForm.data,
        (newVal, oldVal) => {
            model.value = {
                ...JSON.parse(JSON.stringify(newVal)),
               // status: newVal.status !== "draft"
            }
        }
    );

    if(route.params.id) {
        store.dispatch('getForm', route.params.id);
    }

    function onImageChoose(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // the field to send on backend and apply validations
            model.value.image = reader.result;
            // the field to dispaly here
            model.value.image_url = reader.result;
        };
        reader.readAsDataURL(file);
        console.log(model.value)
    }

    function addQuestion(index) {
        const newQuestion = {
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {}
        };

        model.value.questions.splice(index, 0, newQuestion);
    }

    function deleteQuestion(question) {
        model.value.questions = model.value.questions.filter( (q) => q.id !== question.id);
    }

    function questionChange(question) {
        model.value.questions = model.value.questions.map( (q) => {
            if(q.id === question.id) {
                return JSON.parse(JSON.stringify(question));
            }
            return q;
        });
    }

    function saveForm() {
        store.dispatch("saveForm", model.value).then( ({ data }) => {
            store.commit( 'notify', {
                type: 'success',
                message: 'Test je uspesno sacuvan'
            });
            // console.log("Data------")
            // console.log(data)
            router.push({
                name: "FormView",
                params: {id: data.id}
            })
        }).catch(err => {
            console.log(err)
            store.commit('notify', {
                type: 'error',
                message: err.response.data.message
            });
        });
    }

    function deleteForm() {
        if(confirm(`Are you sure?`)) {
            store.dispatch("deleteForm", model.value.id).then( () => {
                router.push({
                    name: "Forms"
                });
            });
        }
    }

</script>