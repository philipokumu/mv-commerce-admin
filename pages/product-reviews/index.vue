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
        to="?tab=pending"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'pending',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'pending'
        }"
      >
        Pending
      </nuxt-link>
      <nuxt-link
        to="?tab=approved"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'approved',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'approved'
        }"
      >
        Approved
      </nuxt-link>
      <nuxt-link
        to="?tab=rejected"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'rejected',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'rejected'
        }"
      >
        Rejected
      </nuxt-link>
    </div>
    <div class="py-4 px-4 md:px-8">
      <div
        v-if="reviews && reviews.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <review-card
          v-for="(review, index) in reviews"
          :key="index"
          :review="review"
        />
      </div>
      <div v-else>
        <div class="mb-2 mx-auto h-24 w-24 text-gray-300">
          <review-icon />
        </div>
        <p class="text-center font-poppins text-2xl font-semibold">
          No product reviews yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ReviewCard from '@/components/Cards/ReviewCard.vue';
import ReviewIcon from '@/components/Icons/ReviewIcon.vue';

export default {
  components: { ReviewCard, ReviewIcon },
  data() {
    return {
      reviews: null
    };
  },
  computed: {
    ...mapGetters({
      allReviews: 'productReviews/reviews'
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
        this.filterReviews(this.tab);
      }
    },
    allReviews() {
      this.filterReviews(this.tab);
    }
  },
  created() {
    this.getReviews().then(() => this.filterReviews(this.tab));
  },
  methods: {
    ...mapActions({
      getReviews: 'productReviews/get'
    }),
    filterReviews(status) {
      let reviews;

      if (!this.allReviews) return;

      switch (status) {
        case 'all':
          reviews = this.allReviews.data;
          break;

        case 'pending':
          reviews = this.allReviews.data.filter(
            rev => rev.data.attributes.reviewAction === 'pending'
          );
          break;

        case 'approved':
          reviews = this.allReviews.data.filter(
            rev => rev.data.attributes.reviewAction === 'approved'
          );
          break;

        case 'rejected':
          reviews = this.allReviews.data.filter(
            rev => rev.data.attributes.reviewAction === 'rejected'
          );
          break;

        default:
          reviews = this.unpaidInvoices.data;
          break;
      }

      return (this.reviews = reviews);
    }
  }
};
</script>
