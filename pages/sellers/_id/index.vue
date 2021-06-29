<template>
  <div>
    <title-bar page-title="View Seller" back />
    <div v-if="sellersBusy" class="p-4">
      <spinner color="secondary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="seller">
        <header class="bg-white shadow-md">
          <div class="container mx-auto">
            <div class="py-4 px-4 md:px-8 flex items-center">
              <div
                class="mr-2 h-10 w-10 text-xl text-white font-semibold font-poppins grid place-items-center bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full"
              >
                {{ generateAvatar(seller.data.attributes.seller_name) }}
              </div>
              <div class="leading-4">
                <p class="font-semibold">
                  {{ seller.data.attributes.seller_name }}
                </p>
                <p class="text-sm">
                  {{ seller.data.attributes.preserve_email }}
                </p>
              </div>
            </div>
            <div class="px-4 md:px-8 flex items-center overflow-x-auto">
              <nuxt-link
                to="?tab=products"
                class="py-2 px-4 transition focus:outline-none"
                :class="{
                  'hover:text-primary-500 focus:text-primary-500':
                    tab !== 'products',
                  ' text-primary-500 border-b-2 border-primary-500':
                    tab === 'products'
                }"
              >
                Products
              </nuxt-link>
              <nuxt-link
                to="?tab=invoices"
                class="py-2 px-4 transition focus:outline-none"
                :class="{
                  'hover:text-primary-500 focus:text-primary-500':
                    tab !== 'invoices',
                  ' text-primary-500 border-b-2 border-primary-500':
                    tab === 'invoices'
                }"
              >
                Invoices
              </nuxt-link>
              <nuxt-link
                to="?tab=payment-details"
                class="py-2 px-4 transition focus:outline-none"
                :class="{
                  'hover:text-primary-500 focus:text-primary-500':
                    tab !== 'payment-details',
                  ' text-primary-500 border-b-2 border-primary-500':
                    tab === 'payment-details'
                }"
              >
                Payment Details
              </nuxt-link>
            </div>
          </div>
        </header>
        <div v-show="tab === 'products'">
          <div v-if="productsBusy" class="p-4">
            <spinner color="secondary" class="mx-auto" />
          </div>
          <div v-else class="container mx-auto py-4 px-4 md:px-8">
            <div
              v-if="sellerProducts && sellerProducts.length > 0"
              class="w-full shadow-md rounded overflow-x-auto"
            >
              <table class="w-full divide-y">
                <thead class="bg-gray-100 text-gray-500">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                    >
                      Unit
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
                  <tr v-for="(product, index) in sellerProducts" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                          <img
                            :src="
                              product.data.attributes.cover_image.data
                                .attributes.path
                            "
                            :alt="product.data.attributes.preserve_name"
                            class="h-full w-full object-cover"
                          />
                        </div>
                        <p>
                          {{ product.data.attributes.preserve_name }}
                        </p>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm whitespace-nowrap">
                      <p>
                        {{ product.data.attributes.currency }}
                        {{ product.data.attributes.product_price }}
                      </p>
                    </td>
                    <td class="px-6 py-4 text-sm whitespace-nowrap">
                      <p>{{ product.data.attributes.product_unit }}</p>
                    </td>
                    <td class="px-6 py-4 text-sm whitespace-nowrap">
                      <p
                        class="py-1 px-2 text-xs inline-block rounded-full"
                        :class="{
                          'text-green-600 bg-green-200':
                            product.data.attributes.active === 'active',
                          'text-red-600 bg-red-200':
                            product.data.attributes.active === 'inactive'
                        }"
                      >
                        {{ product.data.attributes.active }}
                      </p>
                    </td>
                    <td class="px-6 py-4 text-sm whitespace-nowrap text-right">
                      <nuxt-link
                        :to="`/products/${product.data.attributes.slug}/seller/${product.data.attributes.seller_id}`"
                        class="ml-2 inline-block text-green-500 hover:text-green-600 focus:text-green-600 focus:outline-none"
                      >
                        View
                      </nuxt-link>
                      <nuxt-link
                        :to="`/products/${product.data.attributes.slug}/seller/${product.data.attributes.seller_id}/edit`"
                        class="ml-2 inline-block text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                      >
                        Edit
                      </nuxt-link>
                      <button
                        class="ml-2 inline-block text-red-500 hover:text-red-600 focus:text-red-600 focus:outline-none"
                        @click="deleteProduct(product.data.attributes.slug)"
                      >
                        Delete
                      </button>
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
                No products yet.
              </p>
            </div>
          </div>
        </div>
        <div v-show="tab === 'invoices'">
          <div v-if="invoicesBusy" class="p-4">
            <spinner color="secondary" class="mx-auto" />
          </div>
          <div v-else class="container mx-auto py-4 px-4 md:px-8">
            <div v-if="sellerInvoices && sellerInvoices.length > 0">
              <div class="w-full shadow-md rounded overflow-x-auto">
                <table class="w-full divide-y">
                  <thead class="bg-gray-100 text-gray-500">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                      >
                        Invoice Number
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
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                      >
                        Total Due
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y">
                    <tr v-for="(invoice, index) in sellerInvoices" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>{{ invoice.data.attributes.invoice_number }}</p>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>
                          {{ invoice.data.attributes.paidProducts.data.length }}
                        </p>
                      </td>
                      <td class="px-6 py-4 text-sm whitespace-nowrap">
                        <p
                          class="py-1 px-2 text-xs inline-block rounded-full"
                          :class="{
                            'text-green-600 bg-green-200':
                              invoice.data.attributes.status === 'completed',
                            'text-yellow-600 bg-yellow-200':
                              invoice.data.attributes.status === 'requested'
                          }"
                        >
                          {{ invoice.data.attributes.status }}
                        </p>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>
                          {{
                            invoice.data.attributes.paidProducts.meta.currency
                          }}
                          {{
                            invoice.data.attributes.paidProducts.meta
                              .total_price
                          }}
                        </p>
                      </td>
                      <td
                        class="px-6 py-4 text-sm whitespace-nowrap text-right"
                      >
                        <nuxt-link
                          :to="`/invoices/${invoice.data.invoice_id}`"
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
                No unpaid invoices.
              </p>
            </div>
          </div>
        </div>
        <div v-show="tab === 'payment-details'">
          <div v-if="sellersBusy" class="p-41">
            <spinner color="secondary" class="mx-auto" />
          </div>
          <div v-else class="container mx-auto py-4 px-4 md:px-8">
            <div
              v-if="
                seller && seller.data.attributes.paymentDetails.data.length > 0
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
                        Payment Mode
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                      >
                        Account
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y">
                    <tr
                      v-for="(detail, index) in seller.data.attributes
                        .paymentDetails.data"
                      :key="index"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>{{ detail.data.attributes.payment_mode }}</p>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>
                          {{ detail.data.attributes.account }}
                        </p>
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
                No payment details.
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
      seller: 'sellers/seller',
      sellerProducts: 'products/sellerProducts',
      sellerInvoices: 'invoices/sellerInvoices',
      sellersBusy: 'sellers/busy',
      productsBusy: 'products/busy',
      invoicesBusy: 'invoices/busy'
    }),
    tab() {
      if (!this.$route.query.tab) return 'products';
      return this.$route.query.tab;
    }
  },
  created() {
    this.getSellerInfo();
  },
  methods: {
    ...mapActions({
      getSeller: 'sellers/view',
      getSellerProducts: 'products/getBySeller',
      getSellerInvoices: 'invoices/getBySeller',
      deleteProduct: 'products/delete'
    }),
    async getSellerInfo() {
      await this.getSeller(this.$route.params.id);
      await this.getSellerProducts(this.$route.params.id);
      await this.getSellerInvoices(this.$route.params.id);
    },
    generateAvatar(name) {
      const avatar = name.charAt(0);
      return avatar;
    }
  }
};
</script>
