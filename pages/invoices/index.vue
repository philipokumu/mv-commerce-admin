<template>
  <div>
    <div
      class="px-4 md:px-8 flex items-center bg-white shadow-md overflow-x-auto"
    >
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
        <div v-if="invoices && invoices.length > 0">
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
                    Orders
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Total Due
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
                <tr v-for="(invoice, index) in invoices" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>{{ invoice.data.attributes.invoice_number }}</p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ invoice.data.attributes.paidProducts.data.length }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ invoice.data.attributes.paidProducts.meta.currency }}
                      {{
                        invoice.data.attributes.paidProducts.meta.total_price
                      }}
                    </p>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap">
                    <p
                      class="py-1 px-2 text-xs inline-block rounded-full"
                      :class="{
                        'text-green-600 bg-green-200':
                          invoice.data.attributes.status === 'paid',
                        'text-yellow-600 bg-yellow-200':
                          invoice.data.attributes.status === 'requested'
                      }"
                    >
                      {{ invoice.data.attributes.status }}
                    </p>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap text-right">
                    <nuxt-link
                      :to="`/invoices/${invoice.data.invoice_id}`"
                      class="ml-2 inline-block text-green-500 hover:text-green-600 focus:text-green-600 focus:outline-none"
                    >
                      View
                    </nuxt-link>
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
            No invoices yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InvoiceIcon from '@/components/Icons/InvoiceIcon.vue';

export default {
  components: { InvoiceIcon },
  layout: 'dashboard',
  data() {
    return {
      invoices: null
    };
  },
  computed: {
    ...mapGetters({
      busy: 'invoices/busy',
      allInvoices: 'invoices/invoices'
    }),
    tab() {
      if (!this.$route.query.tab) return 'requested';
      return this.$route.query.tab;
    }
  },
  watch: {
    tab: {
      immediate: true,
      handler() {
        this.getInvoices(this.tab);
      }
    },
    allInvoices() {
      this.filterInvoices(this.tab);
    }
  },
  mounted() {
    this.closeSidebar();
  },
  created() {
    this.getInvoices().then(() => this.filterInvoices(this.tab));
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar',
      getInvoices: 'invoices/get'
    }),
    filterInvoices(status) {
      let invoices;

      if (!this.allInvoices) return;

      switch (status) {
        case 'requested':
          invoices = this.allInvoices.filter(
            inv => inv.data.attributes.status === 'requested'
          );
          break;

        case 'paid':
          invoices = this.allInvoices.filter(
            inv => inv.data.attributes.status === 'paid'
          );
          break;

        default:
          invoices = this.allInvoices;
          break;
      }

      return (this.invoices = invoices);
    }
  }
};
</script>
