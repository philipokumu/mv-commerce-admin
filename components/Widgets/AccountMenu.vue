<template>
  <div class="relative">
    <button
      ref="menuToggle"
      class="flex items-center text-left select-none ring-primary-500 focus:ring-2 transition rounded-full focus:outline-none overflow-hidden"
      @click.stop="toggleMenu"
    >
      <div
        class="lg:mr-2 h-10 w-10 flex-shrink-0 text-xl font-semibold font-poppins grid place-items-center text-white bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full shadow overflow-hidden"
      >
        <p>{{ generateAvatar($auth.user.attributes.admin_name) }}</p>
      </div>
      <div class="hidden md:block leading-4">
        <p class="font-semibold">
          {{ $auth.user.attributes.admin_name }}
        </p>
        <p class="text-sm">{{ $auth.user.attributes.preserve_email }}</p>
      </div>
      <div class="hidden h-6 w-6 md:grid place-items-center">
        <chevron-down-icon />
      </div>
    </button>
    <menu
      class="m-0 p-0 absolute top-full right-0 z-10 transform translate-y-2 origin-top-right transition-all bg-white shadow-md rounded overflow-hidden"
      :class="{
        'scale-50 opacity-0 invisible': !open,
        'scale-100 opacity-100 visible': open
      }"
    >
      <ul>
        <li class="md:hidden">
          <div class="py-2 px-4 whitespace-nowrap border-b">
            <p>{{ $auth.user.attributes.admin_name }}</p>
            <p class="text-sm text-gray-500">
              {{ $auth.user.attributes.preserve_email }}
            </p>
          </div>
        </li>
        <li>
          <nuxt-link
            to="/settings/profile"
            class="py-2 px-4 flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap focus:outline-none"
          >
            <div class="mr-2 h-8 w-8 grid place-items-center">
              <div class="w-2/3 h-2/3">
                <user-icon />
              </div>
            </div>
            Manage Account
          </nuxt-link>
        </li>
        <li>
          <button
            class="py-2 px-4 w-full flex items-center hover:bg-gray-50 focus:bg-gray-50 transition whitespace-nowrap focus:outline-none"
            @click="logout"
          >
            <div class="mr-2 h-8 w-8 grid place-items-center">
              <div class="w-2/3 h-2/3">
                <logout-icon />
              </div>
            </div>
            Logout
          </button>
        </li>
      </ul>
    </menu>
  </div>
</template>

<script>
import ChevronDownIcon from '../Icons/ChevronDownIcon.vue';
import LogoutIcon from '../Icons/LogoutIcon.vue';
import UserIcon from '../Icons/UserIcon.vue';

export default {
  name: 'AccountMenu',
  components: {
    ChevronDownIcon,
    LogoutIcon,
    UserIcon
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    generateAvatar(name) {
      const avatar = name.charAt(0);
      return avatar;
    },
    toggleMenu() {
      this.open = !this.open;

      window.onclick = () => {
        this.open = false;
      };
    },
    logout() {
      return this.$auth.logout();
    }
  }
};
</script>
