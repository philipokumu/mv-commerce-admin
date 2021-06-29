<template>
  <div>
    <div
      class="px-4 md:px-8 flex items-center bg-white shadow-md overflow-x-auto"
    >
      <nuxt-link
        to="?tab=all"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'all',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'all'
        }"
      >
        All
      </nuxt-link>
      <nuxt-link
        to="?tab=paid"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'paid',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'paid'
        }"
      >
        Paid
      </nuxt-link>
      <nuxt-link
        to="?tab=unpaid"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'unpaid',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'unpaid'
        }"
      >
        Unpaid
      </nuxt-link>
    </div>
    <div class="py-4 px-4 md:px-8">
      <div v-if="busy">
        <div
          class="clone mb-4 relative h-12 rounded-lg bg-gray-100 overflow-hidden"
        ></div>
        <div class="clone mb-4 relative bg-gray-100 rounded-lg overflow-hidden">
          <div class="h-12 border-b border-white"></div>
          <div class="h-12"></div>
          <div class="h-12"></div>
        </div>
        <div
          class="clone mb-4 relative h-12 rounded-lg bg-gray-100 overflow-hidden"
        ></div>
      </div>
      <div v-else>
        <div v-if="filteredOrders && filteredOrders.length > 0">
          <div class="w-full shadow-md rounded overflow-x-auto">
            <table class="w-full divide-y">
              <thead class="bg-gray-100 text-gray-500">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Order Number
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Products
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y">
                <tr v-for="(order, index) in filteredOrders" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>{{ order.data.attributes.order_number }}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>{{ order.data.attributes.cartProducts.data.length }}</p>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap">
                    <p
                      class="py-1 px-2 text-xs inline-block rounded-full"
                      :class="{
                        'text-green-600 bg-green-200':
                          order.data.attributes.status === 'paid',
                        'text-red-600 bg-red-200':
                          order.data.attributes.status === 'unpaid'
                      }"
                    >
                      {{ order.data.attributes.status }}
                    </p>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap text-right">
                    <nuxt-link
                      :to="`/orders/${order.data.order_id}/user/${order.data.attributes.user_id}`"
                      class="ml-2 inline-block text-green-500 hover:text-green-600 focus:text-green-600 focus:outline-none"
                    >
                      View
                    </nuxt-link>
                    <button
                      class="ml-2 inline-block text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
                      @click="deleteOrder(order.data.order_id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center">
          <div class="mb-2 mx-auto h-24 w-24 text-gray-300"><truck-icon /></div>
          <p class="text-center font-poppins text-2xl font-semibold">
            No orders yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TruckIcon from '@/components/Icons/TruckIcon.vue';

export default {
  components: { TruckIcon },
  layout: 'dashboard',
  data() {
    return {
      filteredOrders: null
    };
  },
  computed: {
    ...mapGetters({
      busy: 'orders/busy',
      orders: 'orders/orders'
    }),
    tab() {
      if (!this.$route.query.tab) return 'all';
      return this.$route.query.tab;
    }
  },
  watch: {
    tab: {
      immediate: true,
      handler() {
        this.filterOrders(this.tab);
      }
    },
    orders() {
      this.filterOrders(this.tab);
    }
  },
  mounted() {
    this.closeSidebar();
  },
  created() {
    this.getOrders().then(() => this.filterOrders(this.tab));
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar',
      getOrders: 'orders/get',
      deleteOrder: 'orders/delete'
    }),
    filterOrders(status) {
      let orders;

      if (!this.orders) return;

      switch (status) {
        case 'all':
          orders = this.orders;
          break;

        case 'paid':
          orders = this.orders.filter(
            order => order.data.attributes.status === 'paid'
          );
          break;

        case 'unpaid':
          orders = this.orders.filter(
            order => order.data.attributes.status === 'unpaid'
          );
          break;

        default:
          orders = this.orders;
          break;
      }

      return (this.filteredOrders = orders);
    }
  }
};
</script>
