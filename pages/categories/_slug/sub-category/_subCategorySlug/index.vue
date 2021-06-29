<template>
  <div>
    <title-bar page-title="View Sub Category" back />
    <div v-if="busy" class="p-4">
      <spinner color="secondary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="subCategory && subCategory.data">
        <header class="bg-white shadow-md">
          <div class="container mx-auto py-4 px-4 md:px-8 flex items-center">
            <div class="mr-2 h-10 w-10 rounded overflow-hidden">
              <img
                :src="
                  subCategory.data.attributes.subCategoryImage.data.attributes
                    .path
                "
                :alt="subCategory.data.attributes.name"
                class="h-full w-full object-cover"
              />
            </div>
            <p class="text-2xl font-semibold">
              {{ subCategory.data.attributes.name }}
            </p>
          </div>
        </header>
        <div class="container mx-auto py-4 px-4 md:px-8">
          <div
            v-if="
              subCategory.data.attributes.productDetails.data &&
              subCategory.data.attributes.productDetails.data.length > 0
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
                      Reviews
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
                    v-for="(product, index) in subCategory.data.attributes
                      .productDetails.data"
                    :key="index"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <p>{{ product.data.attributes.preserve_name }}</p>
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
                      <p>
                        {{ product.data.attributes.productReviews.data.length }}
                      </p>
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
                        @focus="deleteProduct(product.data.attributes.slug)"
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
              <inventory-icon />
            </div>
            <p class="text-center font-poppins text-2xl font-semibold">
              No products yet.
            </p>
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

export default {
  components: { TitleBar, Spinner, InventoryIcon },
  computed: {
    ...mapGetters({
      subCategory: 'subCategories/subCategory',
      busy: 'subCategories/busy'
    })
  },
  created() {
    this.getSubCategory({
      categorySlug: this.$route.params.slug,
      subCategorySlug: this.$route.params.subCategorySlug
    });
  },
  methods: {
    ...mapActions({
      getSubCategory: 'subCategories/view',
      deleteProduct: 'products/delete'
    })
  }
};
</script>
