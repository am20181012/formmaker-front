<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent">
            {{ index + 1 }}. {{ model.question }}
        </h3>

        <div class="flex items-center">
            <!--button for new question-->
            <button type="button" @click="addQuestion()" 
                    class="flex items-center border border-transparent text-xs py-1 px-3 mr-2 rounded-sm from-sky-600 via-blue-600 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent hover:border-blue-600">
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
                  
                Dodaj
            </button>

            <!--button to delete question-->
            <button type="button" @click="deleteQuestion()"
                    class="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 
                       hover:border-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     fill="none" viewBox="0 0 24 24" 
                     stroke-width="1.5" 
                     stroke="currentColor" 
                     class="w-6 h-6">
                    <path stroke-linecap="round" 
                          stroke-linejoin="round" 
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>      
                Obrisi
            </button>
        </div>
    </div>

    <div class="grid gap-3 grid-cols-12">
        <!--Question-->
        <div class="mt-3 col-span-9">
            <label :for="'question_text_' + model.data" class="block text-sm font-medium text-black">
                Tekst pitanja
            </label>
            <input type="text"
                   :name="'question_text_' + model.data"
                   v-model="model.question"
                   @change="dataChange"
                   :id="'question_text_' + model.data"
                   class="mt-1 focus:border-violet-400 block w-full shadow-sm shadow-violet-400 sm:text-sm 
                      border-violet-400 rounded-md"/>
        </div>

        <!--Question type-->
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-black">
                Tip pitanja
            </label>
            <select id="question_type" name="question_type" v-model="model.type" @change="typeChange"
                    class="mt-1 block w-full py-2 px-3 border border-violet-400 bg-white rounded-md shadow-sm shadow-violet-400
                       focus:outline-nonefocus:border-violet-400 sm:text-sm">
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
    </div>

    <!--Question description-->
    <div class="mt-3 col-span-9">
        <label :for="'question_description_' + model.id" class="block text-sm font-medium text-black">
            Opis pitanja
        </label>
        <textarea :name="'question_description_' + model.id"
                  v-model="model.description"
                  @change="dataChange"
                  :id="'question_description_' + model.id"
                  class="mt-1 focus:border-violet-400 block w-full shadow-sm shadow-violet-400 sm:text-sm 
                      border-violet-400 rounded-md"/>
    </div>

    <!--Data-->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm fonnt-semibold mb-1 flex justify-between items-center text-black">
                Opcije
                <!--Add new data option-->
                <button type="button"
                        @click="addOption()"
                        class="flex items-center border border-transparent text-xs py-1 px-2 rounded-sm from-sky-600 via-blue-600 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent hover:border-blue-600">
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
                          
                    Dodaj opciju
                </button>
            </h4>

            <div v-if="!model.data.options.length"
                 class="text-xs text-gray-600 text-center py-3">
                 Jos uvek nema definisanih opcija
            </div>

            <!--Option list-->
            <div v-for="(option, index) in model.data.options"
                 :key="option.uuid"
                 class="flex items-center mb-1">
                 <span class="w-6 text-sm">{{ index + 1 }}. </span>
                 <input type="text"
                        v-model="option.text"
                        @change="dataChange"
                        class="w-full rounded-sm py-1 px-2 text-xs border border-violet-400 shadow-sm shadow-violet-400 focus:border-violet-400"/>
                        
                        <!--Delete option-->
                        <button type="button"
                                @click="removeOption(option)"
                                class="h-6 w-6 rounded-full flex items-center justify-center 
                                       border border-transparent transition-colors hover:border-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                     fill="none" 
                                     viewBox="0 0 24 24" 
                                     stroke-width="1.5" 
                                     stroke="red" 
                                     class="w-6 h-6">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round" 
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>   
                        </button>    
            </div>
        </div>
    </div>

    <hr class="my-4" />

</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../../store';
import { v4 as uuidv4 } from 'uuid';

    const props = defineProps({
        question: Object,
        index: Number
    });

    const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

    const model = ref(JSON.parse(JSON.stringify(props.question)));

    const questionTypes = computed(() => store.state.questionTypes);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions() {
        return ["select", "radio", "checkbox"].includes(model.value.type);
    }

    function getOptions() {
        return model.value.data.options;
    }

    function setOptions(options) {
        model.value.data.options = options;
    }

    function addOption() {
        setOptions([
            ...getOptions(),
            { uuid: uuidv4(), text: ""}
        ]);
        dataChange();
    }

    function removeOption(option) {
        setOptions(getOptions().filter((o) => o !== option));
        dataChange();
    }

    function typeChange() {
        if(shouldHaveOptions()) {
            setOptions(getOptions() || []);
        }
        dataChange();
    }

    function dataChange() {
        const data = JSON.parse(JSON.stringify(model.value));
        if(!shouldHaveOptions()) {
            delete data.data.options;
        }
        emit("change", data);
    }

    function addQuestion() {
        emit("addQuestion", props.index + 1);
    }

    function deleteQuestion() {
        emit("deleteQuestion", props.question);
    }
</script>