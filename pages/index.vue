<template>
  <div class="py-4 px-4 md:px-8 min-h-screen">
    <div class="mb-4 py-2 px-4 bg-white shadow-md rounded">
      <div class="py-2 flex items-center justify-between">
        <p class="text-lg font-semibold">Daily insights</p>
      </div>
      <line-chart v-if="loaded" :data="lineChartData" :options="options" />
    </div>
    <div class="md:grid grid-cols-2 gap-4">
      <div class="mb-4 md:mb-0 w-full bg-white shadow-md rounded">
        <div class="py-2 px-4">
          <p class="font-semibold">Popular products by amount paid</p>
        </div>
        <div class="w-full overflow-x-auto">
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
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y">
              <tr v-for="(product, index) in popularByAmount" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                      <img
                        :src="
                          product.data.attributes.cover_image.data.attributes
                            .path
                        "
                        :alt="product.data.attributes.preserve_name"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <nuxt-link
                      :to="`/products/${product.data.attributes.slug}/seller/${product.data.attributes.seller_id}`"
                      class="hover:underline"
                    >
                      {{ product.data.attributes.preserve_name }}
                    </nuxt-link>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>
                    {{ product.data.attributes.currency }}
                    {{ product.meta.paid_amount_sum }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb-4 md:mb-0 w-full bg-white shadow-md rounded">
        <div class="py-2 px-4">
          <p class="font-semibold">Popular products by orders</p>
        </div>
        <div class="w-full overflow-x-auto">
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
                  Orders
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y">
              <tr v-for="(product, index) in popularByQuantity" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                      <img
                        :src="
                          product.data.attributes.cover_image.data.attributes
                            .path
                        "
                        :alt="product.data.attributes.preserve_name"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <nuxt-link
                      :to="`/products/${product.data.attributes.slug}/seller/${product.data.attributes.seller_id}`"
                      class="hover:underline"
                    >
                      {{ product.data.attributes.preserve_name }}
                    </nuxt-link>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>
                    {{ product.meta.paid_order_count }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb-4 md:mb-0 w-full bg-white shadow-md rounded">
        <div class="py-2 px-4">
          <p class="font-semibold">Popular products by quantity ordered</p>
        </div>
        <div class="w-full overflow-x-auto">
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
                  Quantity
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                >
                  Unit
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y">
              <tr v-for="(product, index) in popularByOrder" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                      <img
                        :src="
                          product.data.attributes.cover_image.data.attributes
                            .path
                        "
                        :alt="product.data.attributes.preserve_name"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <nuxt-link
                      :to="`/products/${product.data.attributes.slug}/seller/${product.data.attributes.seller_id}`"
                      class="hover:underline"
                    >
                      {{ product.data.attributes.preserve_name }}
                    </nuxt-link>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>
                    {{ product.meta.paid_quantity_sum }}
                  </p>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>{{ product.data.attributes.product_unit }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb-4 md:mb-0 w-full bg-white shadow-md rounded">
        <div class="py-2 px-4">
          <p class="font-semibold">Popular seller by number of products</p>
        </div>
        <div class="w-full overflow-x-auto">
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
                  Sold Products
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y">
              <tr
                v-for="(seller, index) in popularSellerByProduct"
                :key="index"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <nuxt-link
                    :to="`/sellers/${seller.data.seller_id}`"
                    class="hover:underline"
                  >
                    {{ seller.data.attributes.seller_name }}
                  </nuxt-link>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p>{{ seller.meta.sold_products }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/Charts/LineChart.vue';

export default {
  components: {
    LineChart
  },
  layout: 'dashboard',
  data() {
    return {
      loaded: false,
      lineChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Total revenue in Ksh',
            borderColor: '#A855F7',
            fill: false
          },
          {
            data: [],
            label: 'Total seller revenue in Ksh',
            borderColor: '#DB748E',
            fill: false
          },
          {
            data: [],
            label: 'Total administration revenue in Ksh',
            borderColor: '#74DB79',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D'
                }
              },
              gridLines: {
                borderDash: [8, 4],
                color: '#F3F4F6'
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                borderDash: [8, 4],
                color: '#F3F4F6',
                ticks: {}
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      orders: 'insights/orders/orders',
      popularByAmount: 'insights/popularProducts/popularByAmount',
      popularByQuantity: 'insights/popularProducts/popularByQuantity',
      popularByOrder: 'insights/popularProducts/popularByOrder',
      popularSellerByProduct: 'insights/popularProducts/popularSellerByProduct'
    })
  },
  mounted() {
    this.closeSidebar();
    this.getChartData();
  },
  created() {
    this.getPopularProducts('amount');
    this.getPopularProducts('quantity');
    this.getPopularProducts('order');
    this.getPopularProducts('seller');
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar',
      getOrdersInsights: 'insights/orders/get',
      getPopularProducts: 'insights/popularProducts/get'
    }),
    async getChartData() {
      await this.getOrdersInsights();

      for (let i = 0; i < this.orders.length; i++) {
        const orderDateLabel = this.orders[i].paid_at;
        const orderTotalAmount = this.orders[i].total_amount;
        const orderSellerAmount = this.orders[i].seller_amount;
        const orderAdminAmount = this.orders[i].administration_amount;
        this.lineChartData.labels.push(orderDateLabel);
        this.lineChartData.datasets[0].data.push(orderTotalAmount);
        this.lineChartData.datasets[1].data.push(orderSellerAmount);
        this.lineChartData.datasets[2].data.push(orderAdminAmount);
      }
      this.loaded = true;
    }
  }
};
</script>
