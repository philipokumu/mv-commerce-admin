<template>
  <div>
    <title-bar page-title="View Product" back />
    <div v-if="product" class="container mx-auto py-4 md:px-8">
      <div
        class="mb-4 p-4 md:grid grid-cols-2 gap-4 bg-white md:rounded shadow-md"
      >
        <div>
          <div
            v-if="
              product.data.attributes.productImages &&
              product.data.attributes.productImages.data.length > 0
            "
            class="mb-4 md:mb-0 flex items-center overflow-x-auto"
          >
            <div
              v-for="(image, index) in product.data.attributes.productImages
                .data"
              :key="index"
              class="mr-2 h-72 w-full min-w-full 2xl:min-w-0 max-w-md rounded overflow-hidden"
            >
              <img
                :src="image.data.attributes.path"
                :alt="product.data.attributes.preserve_name"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 class="mb-2 text-3xl font-semibold">
            {{ product.data.attributes.preserve_name }}
          </h1>
          <div class="my-2">
            <p>
              Original price: {{ product.data.attributes.currency }}
              {{ product.data.attributes.product_price }}
            </p>
            <div
              v-if="product.data.attributes.discounted_price"
              class="flex items-center"
            >
              <p class="mr-2 text-lg font-semibold">
                Selling price: {{ product.data.attributes.currency }}
                {{ product.data.attributes.discounted_price }}
              </p>
              <p class="px-1 text-sm bg-green-200 text-green-600 rounded">
                -{{ product.data.attributes.discount_percent }}%
              </p>
            </div>
            <div v-else class="flex items-center">
              <p class="mr-2 text-lg font-semibold">
                Selling price: {{ product.data.attributes.currency }}
                {{ product.data.attributes.product_price }}
              </p>
            </div>
          </div>
          <div class="md:flex items-center flex-wrap">
            <p>
              Quantity in stock:
              {{ product.data.attributes.quantity_in_stock || 'N/A' }}
            </p>
            <span class="md:mx-2 hidden md:inline-block">|</span>
            <p>
              Measuring unit:
              {{ product.data.attributes.product_unit || 'N/A' }}
            </p>
            <span class="md:mx-2 hidden md:inline-block">|</span>
            <p>
              Minimum order quantity:
              {{ product.data.attributes.minimum_order_quantity }}
            </p>
          </div>
          <hr class="my-2 border-dashed" />
          <h2 class="text-lg font-semibold">Details</h2>
          <p>{{ product.data.attributes.product_details }}</p>
        </div>
      </div>
      <div
        v-if="
          product.data.attributes.productReviews &&
          product.data.attributes.productReviews.data.length > 0
        "
        class="p-4 md:grid grid-cols-12 gap-8 bg-white rounded shadow-md"
      >
        <div
          class="mb-4 p-4 md:mb-0 col-span-4 lg:col-span-3 bg-gray-50 rounded-md"
        >
          <p class="text-5xl text-center font-semibold text-yellow-400">
            {{ product.data.attributes.productReviews.meta.review_average }}/5
          </p>
          <div class="my-2 flex items-center justify-center text-gray-400">
            <div
              class="h-5 w-5"
              :class="{
                'text-yellow-400':
                  product.data.attributes.productReviews.meta.review_average >=
                  1
              }"
            >
              <star-icon />
            </div>
            <div
              class="h-5 w-5"
              :class="{
                'text-yellow-400':
                  product.data.attributes.productReviews.meta.review_average >=
                  2
              }"
            >
              <star-icon />
            </div>
            <div
              class="h-5 w-5"
              :class="{
                'text-yellow-400':
                  product.data.attributes.productReviews.meta.review_average >=
                  3
              }"
            >
              <star-icon />
            </div>
            <div
              class="h-5 w-5"
              :class="{
                'text-yellow-400':
                  product.data.attributes.productReviews.meta.review_average >=
                  4
              }"
            >
              <star-icon />
            </div>
            <div
              class="h-5 w-5"
              :class="{
                'text-yellow-400':
                  product.data.attributes.productReviews.meta.review_average >=
                  5
              }"
            >
              <star-icon />
            </div>
          </div>
          <p class="text-lg text-center">
            {{ product.data.attributes.productReviews.meta.review_count }}
            ratings
          </p>
        </div>
        <div
          v-for="(review, index) in product.data.attributes.productReviews.data"
          :key="index"
          class="col-span-8 lg:col-span-9 divide-y"
        >
          <div>
            <div class="flex justify-between">
              <div class="flex items-center text-gray-300">
                <div
                  class="h-4 w-4"
                  :class="{
                    'text-yellow-400': review.data.attributes.rating >= 1
                  }"
                >
                  <star-icon />
                </div>
                <div
                  class="h-4 w-4"
                  :class="{
                    'text-yellow-400': review.data.attributes.rating >= 2
                  }"
                >
                  <star-icon />
                </div>
                <div
                  class="h-4 w-4"
                  :class="{
                    'text-yellow-400': review.data.attributes.rating >= 3
                  }"
                >
                  <star-icon />
                </div>
                <div
                  class="h-4 w-4"
                  :class="{
                    'text-yellow-400': review.data.attributes.rating >= 4
                  }"
                >
                  <star-icon />
                </div>
                <div
                  class="h-4 w-4"
                  :class="{
                    'text-yellow-400': review.data.attributes.rating >= 5
                  }"
                >
                  <star-icon />
                </div>
              </div>
              <div>
                <p
                  class="mt-1 py-1 px-2 text-xs rounded-full"
                  :class="{
                    'text-gray-600 bg-gray-200':
                      review.data.attributes.reviewAction === 'pending',
                    'text-green-600 bg-green-200':
                      review.data.attributes.reviewAction === 'approved',
                    'text-red-600 bg-red-200':
                      review.data.attributes.reviewAction === 'rejected'
                  }"
                >
                  {{ review.data.attributes.reviewAction }}
                </p>
              </div>
            </div>
            <p class="my-2 text-sm">{{ review.data.attributes.review }}</p>
            <div class="text-sm flex items-center justify-between">
              <p class="text-sm text-gray-500">
                {{ review.data.attributes.user_name }} &middot;
                {{ formatTime(review.data.attributes.created_at) }}
              </p>
              <p class="text-green-500 flex items-center">
                <span class="mr-1 block h-4 w-4">
                  <verified-icon />
                </span>
                Verified purchase
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
import moment from 'moment';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import StarIcon from '@/components/Icons/StarIcon.vue';
import VerifiedIcon from '@/components/Icons/VerifiedIcon.vue';

export default {
  components: { TitleBar, StarIcon, VerifiedIcon },
  computed: {
    ...mapGetters({
      product: 'products/product',
      busy: 'products/busy'
    })
  },
  created() {
    this.getProduct({
      productSlug: this.$route.params.slug,
      sellerId: this.$route.params.sellerId
    });
  },
  methods: {
    ...mapActions({
      getProduct: 'products/view'
    }),
    formatTime(time) {
      return moment(time).format('MMM Do YY');
    }
  }
};
</script>
