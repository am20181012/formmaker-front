<template>
    <div class="py-5 px-8">
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <form @submit.prevent="submitForm" v-else class="container mx-auto">
            <div class="grid grid-cols-6 items-center rounded-2xl shadow-md shadow-violet-400 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 text-white">
                <div class="mr-4">
                    <img :src="form.image_url" alt="" />
                </div>
                <div class="col-span-5">
                    <h1 class="text-3xl mb-3 font-bold">{{ form.title }}</h1>
                    <p class="text-sm" v-html="form.description"></p>
                </div>
            </div>

            <div v-if="!form.status" class="py-8 px-6 rounded-xl border border-violet-600 shadow-md shadow-violet-600 text-black italic w-[600px] mx-auto mt-3">
                <div class="text-xl mb-3 font-semibold">Zao nam je, ali upitnik nije vise aktivan.</div>
            </div>
            <div v-else-if="form.questions.length === 0" class="py-8 px-6 rounded-xl border border-violet-600 shadow-md shadow-violet-600 text-black italic w-[600px] mx-automt-3">
                <div class="text-xl mb-3 font-semibold">Oprostite, jos uvek radimo na pripremi pitanja, vidimo se uskoro :)</div>
            </div>
            <div v-else-if="isBefore()" class="py-8 px-6 rounded-xl border border-violet-600 shadow-md shadow-violet-600 text-black italic w-[600px] mx-auto mt-3">
                <div class="text-xl mb-3 font-semibold">Zao nam je, ali vreme za popunjavanje upitnika je isteklo.</div>
            </div>

            <div v-else>
            <div v-if="formFinished"
                 class="py-8 px-6 rounded-xl border border-violet-600 shadow-md shadow-violet-600 text-black italic w-[600px] mx-auto mt-3">
                 <div class="text-xl mb-3 font-semibold">Hvala na ucescu!</div>
                 <button @click="submitAnotherResponse"
                         type="button"
                         class="inline-flex justify-center py-2 px-4 border border-violet-400 shadow-sm
                         shadow-violet-400 text-sm font-medium rounded-md text-violet-400 bg-white
                         hover:bg-gradient-to-r from-purple-500 to-indigo-700 hover:text-white">
                    Popuni ponovo
                 </button>
            </div>

            <div v-else>
                <hr class="my-3" />
                <div v-for="(question, i) of form.questions" :key="question.id">
                    <QuestionViewer v-model="answers[question.id]" :question="question" :index="i"/>
                </div>
                <button type="submit" 
                        class="inline-flex justify-center py-2 px-4 border border-violet-400 shadow-sm shadow-violet-400
                        text-sm font-medium rounded-md text-violet-400 bg-white
                        hover:bg-gradient-to-r from-purple-500 to-indigo-700 hover:text-white">
                    Potvrdi
                </button>
            </div>
        </div>
        </form>
    </div>
</template>

<script setup>
    import QuestionViewer from '../components/viewer/QuestionViewer.vue';
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();
    const loading = computed(() => store.state.currentForm.loading);
    const form = computed(() => store.state.currentForm.data);
    const formFinished = ref(false);
    const answers = ref({});

    //let before = (new Date().getTime()) - (new Date(form.value.expire_date).getTime())

   // console.log("BEFOREE")
   // console.log(isBefore())

    store.dispatch('getFormBySlug', route.params.slug);

    function submitForm() {
        //console.log(JSON.stringify(answers.value, undefined, 2));

        let ans = JSON.parse(JSON.stringify(answers.value, undefined, 2));
        console.log(ans)
    
        let answers2 = Object.entries(ans).map( (a) => {
            const [key, value] = a;
            let properties = {
                "uuid": key,
                "answer": value
            }
            return properties;
        });

        console.log("odgovori")
        console.log(answers2)

        store.dispatch('saveFormAnswer', {
            formId: form.value.id,
            answers: answers2
        }).then( (res) => {
            if(res.status === 200) {
                formFinished.value = true;
            }
        })
    }

    function submitAnotherResponse() {
        answers.value = {};
        formFinished.value = false;
    }

    function isBefore() {
        console.log("isBefore")
        console.log((new Date().getTime()) - (new Date(form.value.expire_date).getTime()))
        return ((new Date().getTime()) - (new Date(form.value.expire_date).getTime())) > 0;
    }
</script>

<style></style>