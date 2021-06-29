<template>
  <nav
    class="px-4 h-20 md:px-8 flex items-center justify-between bg-white shadow-md sticky top-0 z-20"
  >
    <div>
      <sidebar-toggle class="lg:hidden flex-shrink-0" />
      <logo class="hidden lg:block" />
    </div>
    <!-- <div class="hidden mx-4 md:block w-full">
      <form class="px-3 w-full flex items-center" @submit.prevent="">
        <div
          class="h-8 w-8 flex-shrink-0 grid place-items-center text-gray-400 rounded-full"
        >
          <div class="h-2/3 w-2/3">
            <search-icon />
          </div>
        </div>
        <input
          type="search"
          class="p-3 block w-full bg-transparent focus:outline-none"
          placeholder="Search admins, users and products"
        />
      </form>
    </div> -->
    <div class="flex items-center">
      <div class="md:hidden">
        <nuxt-link
          to="#"
          class="h-10 w-10 grid place-items-center rounded-full ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 transition focus:outline-none"
        >
          <div class="h-2/3 w-2/3">
            <search-icon />
          </div>
        </nuxt-link>
      </div>
      <notif-menu class="mx-2 flex-shrink-0" />
      <account-menu class="flex-shrink-0" />
    </div>
  </nav>
</template>

<script>
import Logo from '../Icons/Logo.vue';
import SearchIcon from '../Icons/SearchIcon.vue';
import AccountMenu from '../Widgets/AccountMenu.vue';
import NotifMenu from '../Widgets/NotifMenu.vue';
import SidebarToggle from '../Widgets/SidebarToggle.vue';

export default {
  components: {
    AccountMenu,
    SidebarToggle,
    NotifMenu,
    SearchIcon,
    Logo
  }
};
</script>
