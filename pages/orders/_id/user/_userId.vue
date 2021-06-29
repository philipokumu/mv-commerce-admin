<template>
  <div>
    <title-bar page-title="View Order" back />
    <div v-if="busy" class="p-4">
      <spinner color="secondary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="order && order.data">
        <header class="bg-white shadow-md">
          <div class="container mx-auto py-4 px-4 md:px-8">
            <p class="text-2xl font-semibold">
              {{ order.data.attributes.order_number }}
            </p>
          </div>
        </header>
        <div class="container mx-auto py-4 px-4 md:px-8">
          <div class="w-full shadow-md rounded overflow-x-auto">
            <table class="w-full divide-y">
              <thead class="bg-gray-100 text-gray-500">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Product Name
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
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                  >
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y">
                <tr
                  v-for="(product, index) in order.data.attributes.cartProducts
                    .data"
                  :key="index"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                        <img
                          :src="
                            product.data.attributes.productDetails.data
                              .attributes.cover_image.data.attributes.path
                          "
                          :alt="
                            product.data.attributes.productDetails.data
                              .attributes.preserve_name
                          "
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <p>
                        {{
                          product.data.attributes.productDetails.data.attributes
                            .preserve_name
                        }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{
                        product.data.attributes.productDetails.data.attributes
                          .currency
                      }}
                      {{
                        product.data.attributes.productDetails.data.attributes
                          .product_price
                      }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ product.data.attributes.quantity }}
                    </p>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <p>
                      {{ product.data.attributes.currency }}
                      {{ product.data.attributes.total_price }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default {
  components: { TitleBar, Spinner },
  computed: {
    ...mapGetters({
      order: 'orders/order',
      busy: 'orders/busy'
    })
  },
  created() {
    this.getOrder({
      orderId: this.$route.params.id,
      userId: this.$route.params.userId
    });
  },
  methods: {
    ...mapActions({
      getOrder: 'orders/view'
    })
  }
};
</script>
