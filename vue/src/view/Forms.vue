<template>
    <PageComponent>
      <template v-slot:header>

        <!--container for title & add button-->
        <div class="flex justify-between items-center">
          <!--title-->
          <h1 class="text-3xl font-bold from-purple-500 to-indigo-700 bg-gradient-to-r bg-clip-text text-transparent">Testovi</h1>

          <input type="text" v-model="searchOption" placeholder="pretraga..." class="py-2 px-3 rounded-3xl" />

          <!--Add buttin-->
          <!-- text-white bg-gradient-to-r from-green-600 to-emerald-600 -->
          <router-link :to="{ name: 'FormCreate' }"
                        class="py-2 px-3 from-green-500 to-emerald-600 bg-gradient-to-r bg-clip-text text-transparent border border-emerald-400 rounded-md hover:border-emerald-700">
            <!--Add Icon (+)-->
            <svg xmlns="http://www.w3.org/2000/svg" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor" 
                 class="w-4 h-4 -mt-1 inline-block text-green-500">
                    <path stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Kreiraj test
          </router-link>
        </div>

      </template>

      <!--list of forms-->
      <div v-if="forms.loading" class="flex justify-center">Loading...</div>
      <div v-else-if="forms.data.length === 0" class="flex justify-center">Trenutno nema testova</div>
      <div v-else>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <!--iterate through forms-->
          <FormListItem v-for="(form, i) in forms.data" 
                        :key="form.id" 
                        :form="form"
                        class="border border-purple-600 shadow-lg shadow-purple-600 rounded-3xl text-black opacity-0 animate-fade-in-down"
                        :style="{animationDelay: `${i * 0.1}s`}"
                        @delete="deleteForm(form)"/>              
        </div>
      </div>
    </PageComponent>
</template>
  
  <script setup>
    import PageComponent from '../components/PageComponent.vue';
    import store from '../store';
    import { computed, ref, watch } from 'vue';
    import FormListItem from '../components/FormListItem.vue';

    const forms = computed(() => store.state.forms);
    let searchOption = ref(null);

    watch(
      () => store.state.forms,
      (newVal, oldVal) => {
        forms = newVal;
      }
    );

    watch(searchOption, () => {
      store.dispatch("getFormsViaParams", searchOption.value);
    });

    store.dispatch('getForms')

    function deleteForm(form) {
      if(confirm(`Are you sure?`)) {
        store.dispatch('deleteForm', form.id).then( () => {
          store.dispatch('getForms')
        });
      }
    }
  </script>