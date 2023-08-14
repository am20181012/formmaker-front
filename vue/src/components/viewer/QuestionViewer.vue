<template>
    <fieldset class="mb-4">
        <div>
            <legend class="text-base font-semibold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent">
                {{ index + 1 }}. {{ question.question }}
            </legend>
            <p class="text-gray-500 text-sm">{{ question.description }}</p>
        </div>
        <div class="mt-3">
            <!-- select -->
            <div v-if="question.type === 'select'">
                <select :value="modelValue"
                        @change="emits('update:modelValue', $event.target.value)"
                        class="mt-1 block w-full py-2 px-3 border border-violet-400 bg-white rounded-md
                        shadow-sm shadow-violet-400 focus:border-violet-400
                        sm:text-sm">
                        <option value="">Izaberi</option>
                        <option v-for="option in question.data.options" 
                                :key="option.uuid" 
                                :value="option.text">
                                {{ option.text }}
                        </option>
                </select>
            </div>

            <!-- radio -->
            <div v-else-if="question.type === 'radio'">
                <div v-for="(option, i) of question.data.options" :key="option.uuid" class="flex items-center">
                    <input :id="option.uuid"
                           :name="'question' + question.id"
                           :value="option.text"
                           @change="emits('update:modelValue', $event.target.value)"
                           type="radio" 
                           class="focus:ring-violet-500 h-4 w-4 text-violet-500 border-violet-500"/>
                    <label :for="option.uuid" 
                           class="ml-3 block text-sm font-medium text-gray-700">
                           {{ option.text }}
                    </label>
                </div>
            </div>

            <!-- checkbox -->
            <div v-else-if="question.type === 'checkbox'">
                <div v-for="(option, i) of question.data.options" :key="option.uuid" class="flex items-center">
                    <input :id="option.uuid"
                           v-model="model[option.text]"
                           @change="onCheckboxChange"
                           type="checkbox" 
                           class="focus:ring-violet-500 h-4 w-4 text-violet-500 border-violet-500 rounded" />
                    <label :for="option.uuid" 
                           class="ml-3 block text-sm font-medium text-gray-700">
                           {{ option.text }}
                    </label>
                </div>
            </div>

            <!-- text -->
            <div v-else-if="question.type === 'text'">
                <input type="text"
                       :value="modelValue"
                       @input="emits('update:modelValue', $event.target.value)"
                       class="mt-1 border border-violet-400 focus:border-violet-400 
                       block w-full shadow-sm shadow-violet-400 sm:text-sm rounded-md" />
            </div>

            <!-- textarea -->
            <div v-else-if="question.type === 'textarea'">
                <textarea :value="modelValue"
                          @input="emits('update:modelValue', $event.target.value)"
                          class="mt-1 border border-violet-400 focus:border-violet-400 
                          block w-full shadow-sm shadow-violet-400 sm:text-sm rounded-md" />
            </div>
        </div>
    </fieldset>
    <hr class="mb-4" />
</template>

<script setup>
    import { ref } from 'vue';

    const { question, index, modelValue } = defineProps({
        question: Object,
        index: Number,
        modelValue: [String, Array]
    });
    const emits = defineEmits(['update:modelValue']);

    let model;
    if(question.type === 'checkbox') {
        model = ref({});
    }

    function onCheckboxChange($event) {
        const selectedOptions = [];
        for(let text in model.value) {
            if(model.value[text]){
                selectedOptions.push(text);
            }
        }
        emits('update:modelValue', selectedOptions);
    }

</script>

<style></style>