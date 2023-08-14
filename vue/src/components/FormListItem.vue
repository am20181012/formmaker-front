<template>
    <!-- bg-gradient-to-t from-rose-500 via-fuchsia-500 to-purple-400  -->
    <div class="flex flex-col py-4 px-6 shadow-md hover:border-2 hover:bg-gray-50 h[470px]">
             <img :src="form.image_url" alt="" class="w-full h-72 object-cover rounded-3xl"/>
             <h4 class="mt-4 text-xl font-bold">{{ form.title }}</h4>
             <div v-html="form.description" class="overflow-hidder flex-1"></div>

             <!--div for add & delete buttons-->
             <div class="flex justify-between items-center mt-3">
              <router-link :to="{ name: 'FormView', params: { id: form.id }}"
                            class="flex py-2 px-4 shadow-md shadow-violet-600 text-sm text-violet-600 rounded-md
                             hover:bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke-width="1.5" 
                     stroke="currentColor" 
                     class="w-6 h-6">
                      <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                 Izmeni
              </router-link>
              <div class="flex items-center">
                <a :href="`/view/form/${form.slug}`"
                   target="_blank"
                   class="h-8 w-8 flex items-center justify-center rounded-full mr-3 shadow-md shadow-fuchsia-600
                   border border-transparent text-sm text-fuchsia-600
                   hover:bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="w-6 h-6">
                        <path stroke-linecap="round" 
                              stroke-linejoin="round" 
                              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                   </svg>                  
                </a>
                <button v-if="form.id"
                      type="button"
                      @click="emit('delete', form)"
                      class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm
                       shadow-md shadow-rose-600 text-rose-600
                       hover:bg-gradient-to-r from-rose-600 to-red-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke-width="1.5" 
                     stroke="currentColor" 
                     class="w-6 h-6">
                  <path stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>       
              </button>
              </div>
             </div>
        </div>
</template>

<script setup>
    const { form } = defineProps({
        form: Object
    });

    const emit = defineEmits(['delete']);
</script>

<style></style>