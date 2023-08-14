<template>
  <div class="">

    <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight from-violet-600 to-rose-600 bg-gradient-to-r bg-clip-text text-transparent">
      Registruj se besplatno
    </h2>

    <p class="mt-2 text-center text-sm text-gray-600">
      Ili
      {{ ' ' }}
      <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">
        prijavi se na svoj nalog
      </router-link>
    </p>

  </div>

  <form class="mt-8 space-y-6" @submit="register">

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

      <!--First name-->
      <div>
        <label for="first_name" class="sr-only">First name</label>
        <input id="first_name" name="first_name" type="text" autocomplete="name" required=""
          v-model="user.first_name"
          class="relative block w-full appearance-none rounded-none rounded-t-md 
                 border border-violet-400 shadow-sm shadow-violet-400
                 px-3 py-2 text-gray-900 placeholder-gray-500
                focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Ime" />
      </div>

      <!--Last name-->
      <div>
        <label for="last_name" class="sr-only">Last name</label>
        <input id="last_name" name="last_name" type="text" autocomplete="name" required=""
          v-model="user.last_name"
          class="relative block w-full appearance-none rounded-none border 
                 border-violet-400 shadow-sm shadow-violet-400 px-3 py-2 
                 text-gray-900 placeholder-gray-500 
                 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Prezime" />
      </div>

      <!--Email-->
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required=""
          v-model="user.email"
          class="relative block w-full appearance-none rounded-none 
                 border border-violet-400 shadow-sm shadow-violet-400 px-3 py-2 
                 text-gray-900 placeholder-gray-500 
                 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Email adresa" />
      </div>

      <!--Password-->
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required=""
          v-model="user.password"
          class="relative block w-full appearance-none rounded-none 
                 border border-violet-400 shadow-sm shadow-violet-400 px-3 py-2
                 text-gray-900 placeholder-gray-500 
                 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Lozinka" />
      </div>

      <!--Password Confirmation-->
      <div>
        <label for="password-confirmation" class="sr-only">Password Confirmation</label>
        <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required=""
          v-model="user.password_confirmation"
          class="relative block w-full appearance-none rounded-none rounded-b-md 
                 border border-violet-400 shadow-sm shadow-violet-400 px-3 py-2
                 text-gray-900 placeholder-gray-500 
                 focus:z-10 focus:border-violet-400 sm:text-sm"
          placeholder="Potvrda lozinke" />
      </div>
    </div>


    <div>
      <button type="submit"
        class="group relative flex w-full justify-center rounded-md border border-transparent shadow-md shadow-violet-600
              bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 py-2 px-4 text-sm font-medium text-white">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Registracija
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
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  let errorMsg = ref('');

  function register(event) {
    event.preventDefault();

    store
      .dispatch('register', user)
      .then((res) => {
        console.log(res)
        router.push({
          name: 'Dashboard'
        })
      })
      .catch(err => {
      errorMsg.value = err.response.data.message
    })
  }
</script>
