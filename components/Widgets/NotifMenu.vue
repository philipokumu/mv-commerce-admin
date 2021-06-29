<template>
  <div class="relative">
    <button
      class="h-10 w-10 grid place-items-center ring-primary-500 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 transition rounded-full focus:outline-none"
      @click.stop="toggleMenu"
    >
      <div class="h-2/3 w-2/3">
        <bell-icon />
      </div>
    </button>
    <div
      class="absolute top-full right-0 z-10 transform translate-y-2 origin-top-right transition-all bg-white shadow-md rounded overflow-hidden"
      :class="{
        'scale-50 opacity-0 invisible': !open,
        'scale-100 opacity-100 visible': open
      }"
    >
      <ul v-if="notifications" class="divide-y">
        <li>
          <nuxt-link
            to="#"
            class="py-2 px-4 block rounded hover:bg-gray-50 focus:bg-gray-50 transition focus:outline-none"
          >
            <p class="mb-1 font-semibold whitespace-nowrap">
              Lorem ipsum dolor sit.
            </p>
            <p class="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatem, illum.
            </p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="#"
            class="py-2 px-4 block rounded hover:bg-gray-50 focus:bg-gray-50 transition focus:outline-none"
          >
            <p class="mb-1 font-semibold whitespace-nowrap">
              Lorem ipsum dolor sit.
            </p>
            <p class="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatem, illum.
            </p>
          </nuxt-link>
        </li>
      </ul>
      <div class="p-4">
        <p class="whitespace-nowrap">No new notifications.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BellIcon from '../Icons/BellIcon.vue';

export default {
  name: 'AccountMenu',
  components: {
    BellIcon
  },
  data() {
    return {
      open: false,
      notifications: false
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;

      window.onclick = () => {
        this.open = false;
      };
    }
  }
};
</script>
