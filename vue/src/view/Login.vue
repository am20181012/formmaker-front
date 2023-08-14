<template>
  <div>

    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight from-violet-600 to-rose-600 bg-gradient-to-r bg-clip-text text-transparent">
      Prijavi se na svoj nalog
    </h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      Ili
      {{ ' ' }}
      <router-link :to="{name: 'Register'}" class="font-medium text-indigo-600 hover:text-indigo-500">
        se besplatno registruj
      </router-link>
    </p>

  </div>


  <form class="mt-8 space-y-6" @submit="login">

    <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 text-white rounded">
      {{ errorMsg }}
      <span @click="errorMsg=''" 
      class="w-8 h-8 flex items-center justify-center rounded-full transitio-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </span>
    </div>

    <input type="hidden" name="remember" value="true" />

    <div class="-space-y-px rounded-md shadow-sm">

      <!--Email-->
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required=""
          v-model="user.email"
          class="relative block w-full appearance-none rounded-none rounded-t-md 
                 border border-violet-400 shadow-sm shadow-violet-400 px-3 py-2 text-gray-900 
                 placeholder-gray-500 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Email adresa" />
      </div>

      <!--Password-->
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required=""
          v-model="user.password"
          class="relative block w-full appearance-none rounded-none rounded-b-md 
                 border border-violet-400 shadow-sm shadow-violet-400 px-3 py-2 text-gray-900 
                 placeholder-gray-500 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Lozinka" />
      </div>
    </div>

    <div>
      <button type="submit"
        class="group relative flex w-full justify-center rounded-md border border-transparent shadow-md shadow-violet-600
               bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 py-2 px-4
                text-sm font-medium text-white hover:bg-indigo-700">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Prijavi se
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/20/solid';
import store from '../store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const user = {
  email: '',
  password: '',
  remeber: false
}

let errorMsg = ref('');

function login(ev) {
  ev.preventDefault();

  store.dispatch('login', user)
    .then((res) => {
      router.push({
        name: 'Dashboard'
      })
      console.log(res)
      console.log("store")
      console.log(store.state.user.data)
    })
    .catch(err => {
      errorMsg.value = err.response.data.message
    })
}
</script>