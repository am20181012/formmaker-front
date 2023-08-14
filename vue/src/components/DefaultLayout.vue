<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <!-- <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" />
            </div> -->

            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                  active-class="border-2 border-blue-600 text-white" :class="[
                    item.current
                      ? ''
                      : 'text-white hover:border-2 border-blue-600',
                    'px-3 py-2 rounded-md text-sm font-medium'
                  ]">{{ item.name }}</router-link>
              </div>
            </div>

          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full text-sm focus:outline-none">
                    <span class="sr-only">Open user menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="white" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                    <a @click="logout" :class="[
                      'block px-4 py-2 text-sm text-black cursor-pointer'
                    ]">Odjavi se</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">

        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" :to="item.to" active-class="border-2 border-blue-600 text-white"
            :class="[
              this.$route.name === item.to.name
                ? ''
                : 'text-white hover:border-2 border-blue-600',
              'block px-3 py-2 rounded-md text-base font-medium'
            ]">{{ item.name }}</router-link>
        </div>

        <div class="border-t border-white pt-4 pb-3">
          <!-- <div class="flex items-center px-5">
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.firstName }} {{ user.lastName }}</div>
              <div class="text-sm font-medium leading-none text-white">{{ user.email }}</div>
            </div>

          </div> -->
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton as="a" @click="logout"
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:border-2 border-blue-600 cursor-pointer">
              Odjavi se</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>

    <Notification />
  </div>
</template>
  
<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Notification from './Notification.vue';

const navigation = [
  { name: 'Pocetna', to: { name: 'Dashboard' } },
  { name: 'testovi', to: { name: 'Forms' } }
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    Notification
  },
  setup() {

    const store = useStore();
    const router = useRouter();

    function logout() {
      store.commit('logout');
      router.push({
        name: 'Login'
      });
    }

    return {
      //user: computed(() => store.state.user.data),
      navigation,
      logout
    }
  }
}

</script>