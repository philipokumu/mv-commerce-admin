<template>
  <div>
    <title-bar page-title="View User" back />
    <div v-if="busy" class="p-4">
      <spinner color="secondary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="user">
        <header class="bg-white shadow-md">
          <div class="container mx-auto">
            <div class="py-4 px-4 md:px-8 flex items-center">
              <div
                class="mr-2 h-10 w-10 text-xl text-white font-semibold font-poppins grid place-items-center bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full"
              >
                {{ generateAvatar(user.data.attributes.user_name) }}
              </div>
              <div class="leading-4">
                <p class="font-semibold">
                  {{ user.data.attributes.user_name }}
                </p>
                <p class="text-sm">
                  {{ user.data.attributes.preserve_email }}
                </p>
              </div>
            </div>
            <div class="px-4 md:px-8 flex items-center overflow-x-auto">
              <nuxt-link
                to="?tab=addresses"
                class="py-2 px-4 transition focus:outline-none"
                :class="{
                  ' hover:text-primary-500 focus:text-primary-500':
                    tab !== 'addresses',
                  'text-primary-500 border-b-2 border-primary-500':
                    tab === 'addresses'
                }"
              >
                Addresses
              </nuxt-link>
              <nuxt-link
                to="?tab=orders"
                class="py-2 px-4 transition focus:outline-none"
                :class="{
                  ' hover:text-primary-500 focus:text-primary-500':
                    tab !== 'orders',
                  'text-primary-500 border-b-2 border-primary-500':
                    tab === 'orders'
                }"
              >
                Orders
              </nuxt-link>
            </div>
          </div>
        </header>
        <div v-show="tab === 'addresses'">
          <div class="container mx-auto py-4 px-4 md:px-8">
            <div
              v-if="
                user.data.attributes.shippingInfo &&
                user.data.attributes.shippingInfo.data.length > 0
              "
              class="w-full shadow-md rounded overflow-x-auto"
            >
              <table class="w-full divide-y">
                <thead class="bg-gray-100 text-gray-500">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                    >
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y">
                  <tr
                    v-for="(address, index) in user.data.attributes.shippingInfo
                      .data"
                    :key="index"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <p>{{ address.data.attributes.country }}</p>
                      <p>{{ address.data.attributes.location }}</p>
                    </td>
                    <td class="px-6 py-4 text-sm whitespace-nowrap">
                      <p>
                        {{ address.data.attributes.contact }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="flex flex-col items-center justify-center">
              <div class="mb-2 mx-auto h-24 w-24 text-gray-300">
                <inventory-icon />
              </div>
              <p class="text-center font-poppins text-2xl font-semibold">
                No addresses yet.
              </p>
            </div>
          </div>
        </div>
        <div v-show="tab === 'orders'">
          <div class="container mx-auto py-4 px-4 md:px-8">
            <div
              v-if="
                user.data.attributes.orderDetails &&
                user.data.attributes.orderDetails.data.length > 0
              "
            >
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
                    <tr
                      v-for="(order, index) in user.data.attributes.orderDetails
                        .data"
                      :key="index"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>{{ order.data.attributes.order_number }}</p>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>
                          {{ order.data.attributes.cartProducts.data.length }}
                        </p>
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
                      <td
                        class="px-6 py-4 text-sm whitespace-nowrap text-right"
                      >
                        <nuxt-link
                          :to="`/orders/${order.data.order_id}/user/${order.data.attributes.user_id}`"
                          class="ml-2 inline-block text-green-500 hover:text-green-600 focus:text-green-600 focus:outline-none"
                        >
                          View
                        </nuxt-link>
                        <button
                          class="ml-2 inline-block text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
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
              <div class="mb-2 mx-auto h-24 w-24 text-gray-300">
                <invoice-icon />
              </div>
              <p class="text-center font-poppins text-2xl font-semibold">
                No orders yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import Spinner from '@/components/Widgets/Spinner.vue';
import InventoryIcon from '@/components/Icons/InventoryIcon.vue';
import InvoiceIcon from '@/components/Icons/InvoiceIcon.vue';

export default {
  components: { TitleBar, Spinner, InventoryIcon, InvoiceIcon },
  computed: {
    ...mapGetters({
      user: 'users/user',
      busy: 'users/busy'
    }),
    tab() {
      return this.$route.query.tab;
    }
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getUser: 'users/view'
    }),
    generateAvatar(name) {
      const avatar = name.charAt(0);
      return avatar;
    }
  }
};
</script>
