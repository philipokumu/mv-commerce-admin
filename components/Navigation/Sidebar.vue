<template>
  <div
    class="sidebar fixed transform lg:transform-none lg:sticky top-0 lg:top-20 h-screen w-72 lg:w-auto left-0 bg-white lg:shadow-md transition-all duration-300 z-30 lg:z-10 overflow-x-auto"
    :class="{
      '-translate-x-full ': !sidebar,
      'translate-x-0 shadow-md': sidebar
    }"
    @click.stop=""
  >
    <div
      class="px-4 md:px-8 h-20 flex items-center justify-between bg-white sticky top-0 lg:hidden"
    >
      <nuxt-link to="/" class="text-primary-500">
        <logo />
      </nuxt-link>
      <button
        class="lg:hidden h-10 w-10 grid place-items-center rounded-full ring-primary-500 hover:bg-gray-50 focus:ring-2 focus:bg-gray-50 transition focus:outline-none"
        @click="closeSidebar"
      >
        <div class="h-2/3 w-2/3">
          <close-icon />
        </div>
      </button>
    </div>
    <menu class="m-0 p-0 py-3 lg:py-0">
      <ul>
        <li>
          <nuxt-link
            to="/"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'index'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <dashboard-icon />
            </span>
            <span>Dashboard</span>
          </nuxt-link>
        </li>
        <li class="border-b">
          <p class="py-2 px-4 md:px-8 text-sm uppercase text-gray-400">
            User management
          </p>
        </li>
        <li v-if="$auth.user.attributes.rank === 'super_admin'">
          <nuxt-link
            to="/admins"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'admins'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <staff-icon />
            </span>
            <span>Admins</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/sellers"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'sellers'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <shop-icon />
            </span>
            <span>Sellers</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/users"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'users'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <users-icon />
            </span>
            <span>Users</span>
          </nuxt-link>
        </li>
        <li class="border-b">
          <p class="py-2 px-4 md:px-8 text-sm uppercase text-gray-400">
            Orders management
          </p>
        </li>
        <li>
          <nuxt-link
            to="/orders?tab=all"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'orders'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <truck-icon />
            </span>
            <span>Orders</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/invoices?tab=unpaid"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'invoices'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <invoice-icon />
            </span>
            <span>Seller Invoices</span>
          </nuxt-link>
        </li>
        <li class="border-b">
          <p class="py-2 px-4 md:px-8 text-sm uppercase text-gray-400">
            Inventory management
          </p>
        </li>
        <li>
          <nuxt-link
            to="/categories"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'categories'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <category-icon />
            </span>
            <span>Categories</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/products"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'products'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <inventory-icon />
            </span>
            <span>Products</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/product-reviews"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'product-reviews'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <review-icon />
            </span>
            <span>Product Reviews</span>
          </nuxt-link>
        </li>
        <li class="border-b">
          <p class="py-2 px-4 md:px-8 text-sm uppercase text-gray-400">
            Account management
          </p>
        </li>
        <li>
          <nuxt-link
            to="/settings/profile"
            class="py-4 px-4 md:px-8 whitespace-nowrap flex items-center border-primary-500 hover:text-primary-500 focus:text-primary-500 transition select-none focus:outline-none"
            :class="{
              'border-r-2 text-primary-500': $route.name === 'settings'
            }"
          >
            <span class="mr-3 h-6 w-6 block">
              <settings-icon />
            </span>
            <span>Settings</span>
          </nuxt-link>
        </li>
      </ul>
    </menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CategoryIcon from '../Icons/CategoryIcon.vue';
import CloseIcon from '../Icons/CloseIcon.vue';
import DashboardIcon from '../Icons/DashboardIcon.vue';
import InventoryIcon from '../Icons/InventoryIcon.vue';
import InvoiceIcon from '../Icons/InvoiceIcon.vue';
import Logo from '../Icons/Logo.vue';
import ReviewIcon from '../Icons/ReviewIcon.vue';
import SettingsIcon from '../Icons/SettingsIcon.vue';
import ShopIcon from '../Icons/ShopIcon.vue';
import StaffIcon from '../Icons/StaffIcon.vue';
import TruckIcon from '../Icons/TruckIcon.vue';
import UsersIcon from '../Icons/UsersIcon.vue';

export default {
  name: 'Sidebar',
  components: {
    Logo,
    DashboardIcon,
    UsersIcon,
    SettingsIcon,
    CloseIcon,
    StaffIcon,
    InventoryIcon,
    ShopIcon,
    TruckIcon,
    CategoryIcon,
    InvoiceIcon,
    ReviewIcon
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar'
    })
  },
  watch: {
    sidebar() {
      if (this.sidebar) {
        window.onclick = () => {
          this.closeSidebar();
        };
      }
    }
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar'
    })
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .sidebar {
    height: calc(100vh - 5rem);

    &::-webkit-scrollbar {
      width: 0.5rem;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #f3e8ff;
    }
  }
}
</style>
