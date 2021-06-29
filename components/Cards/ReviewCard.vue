<template>
  <article class="relative bg-white rounded shadow overflow-hidden">
    <header class="py-2 px-4">
      <nuxt-link
        :to="`/products/${review.data.attributes.product_slug}/seller/${review.data.attributes.product_seller_id}`"
        class="text-2xl font-semibold hover:underline"
        title="View product"
      >
        {{ review.data.attributes.product_name }}
      </nuxt-link>
      <p class="text-sm text-gray-500">
        {{ formatTime(review.data.attributes.created_at) }}
      </p>
      <p
        class="mt-1 py-1 px-2 text-xs inline-block rounded-full"
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
    </header>
    <div class="py-2 px-4">
      <div class="mb-2 flex items-center text-gray-300">
        <div
          class="h-4 w-4"
          :class="{ 'text-yellow-400': review.data.attributes.rating >= 1 }"
        >
          <star-icon />
        </div>
        <div
          class="h-4 w-4"
          :class="{ 'text-yellow-400': review.data.attributes.rating >= 2 }"
        >
          <star-icon />
        </div>
        <div
          class="h-4 w-4"
          :class="{ 'text-yellow-400': review.data.attributes.rating >= 3 }"
        >
          <star-icon />
        </div>
        <div
          class="h-4 w-4"
          :class="{ 'text-yellow-400': review.data.attributes.rating >= 4 }"
        >
          <star-icon />
        </div>
        <div
          class="h-4 w-4"
          :class="{ 'text-yellow-400': review.data.attributes.rating >= 5 }"
        >
          <star-icon />
        </div>
      </div>
      <p class="text-sm">{{ trimReview(review.data.attributes.review) }}</p>
    </div>
    <footer
      class="sticky top-full grid"
      :class="{
        'grid-cols-3': review.data.attributes.reviewAction === 'pending',
        'grid-cols-2': review.data.attributes.reviewAction === 'rejected',
        'grid-cols-1': review.data.attributes.reviewAction === 'approved'
      }"
    >
      <button
        v-if="
          review.data.attributes.reviewAction === 'pending' ||
          review.data.attributes.reviewAction === 'rejected'
        "
        class="p-2 grid place-items-center text-white bg-green-500 hover:bg-green-600 focus:bg-green-600 transition focus:outline-none"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
        title="Approve"
        @click="
          updateStatus({
            productSlug: review.data.attributes.product_slug,
            reviewId: review.data.product_review_id,
            status: { reviewAction: 'approved' }
          })
        "
      >
        <div v-if="!busy" class="h-6 w-6">
          <check-circle-icon />
        </div>
        <spinner v-else />
      </button>
      <button
        v-if="review.data.attributes.reviewAction === 'pending'"
        class="p-2 grid place-items-center text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 transition focus:outline-none"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
        title="Reject"
        @click="
          updateStatus({
            productSlug: review.data.attributes.product_slug,
            reviewId: review.data.product_review_id,
            status: { reviewAction: 'rejected' }
          })
        "
      >
        <div v-if="!busy" class="h-6 w-6">
          <close-icon />
        </div>
        <spinner v-else />
      </button>
      <button
        class="p-2 grid place-items-center text-white bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 transition focus:outline-none"
        :class="{ 'pointer-events-none': busy }"
        :disabled="busy"
        title="Delete"
        @click="
          deleteReview({
            productSlug: review.data.attributes.product_slug,
            reviewId: review.data.product_review_id
          })
        "
      >
        <div v-if="!busy" class="h-6 w-6">
          <delete-icon />
        </div>
        <spinner v-else />
      </button>
    </footer>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import CheckCircleIcon from '../Icons/CheckCircleIcon.vue';
import DeleteIcon from '../Icons/DeleteIcon.vue';
import StarIcon from '../Icons/StarIcon.vue';
import CloseIcon from '../Icons/CloseIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'ReviewCard',
  components: {
    StarIcon,
    DeleteIcon,
    CheckCircleIcon,
    CloseIcon,
    Spinner
  },
  props: {
    review: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      busy: 'productReviews/busy'
    })
  },
  methods: {
    ...mapActions({
      updateStatus: 'productReviews/updateStatus',
      deleteReview: 'productReviews/delete'
    }),
    formatTime(time) {
      return moment(time).format('MMM Do YY');
    },
    trimReview(review) {
      const maxLength = 100;
      let trimmedDesc;

      if (review.length > maxLength) {
        trimmedDesc = `${review.substring(0, maxLength)}...`;
      } else {
        trimmedDesc = review;
      }

      return trimmedDesc;
    }
  }
};
</script>
