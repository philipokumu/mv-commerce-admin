<template>
  <div>
    <title-bar page-title="New Category" back />
    <div class="container mx-auto">
      <form
        autocomplete="off"
        class="py-4 px-4 md:px-8"
        @submit.prevent="submitForm"
      >
        <div class="mb-4">
          <label for="name" class="block leading-8"> Name </label>
          <input
            id="name"
            v-model="data.name"
            type="text"
            class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{ 'border-red-500': serverErrors && serverErrors.name }"
            required
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.name">
              {{ serverErrors.name }}
            </span>
          </div>
        </div>
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Save Category </span>
          <spinner v-else class="mx-auto" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { TitleBar, Spinner },
  data() {
    return {
      data: {
        name: null,
        level: 'top',
        active: 'active'
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'categories/busy',
      serverErrors: 'categories/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      create: 'categories/create',
      clearServerErrors: 'categories/clearErrors'
    }),
    submitForm() {
      this.clearServerErrors();

      this.create(this.data).then(() => {
        if (this.serverErrors) return;

        for (const key in this.data) {
          this.data[key] = null;
        }
      });
    }
  }
};
</script>
