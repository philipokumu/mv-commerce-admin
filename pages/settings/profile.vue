<template>
  <div class="px-4 md:px-8 overflow-hidden">
    <p class="py-2 text-2xl font-poppins border-b">
      Update profile information
    </p>
    <form autocomplete="off" class="mt-4" @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block leading-8"> First Name </label>
        <input
          id="name"
          v-model="data.name"
          type="text"
          class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
          required
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block leading-8"> Phone Number </label>
        <input
          id="phone"
          v-model="data.phone"
          type="number"
          class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
          required
        />
      </div>
      <button
        class="mt-6 ml-auto py-3 px-6 block w-full md:w-max text-white shadow-md transition rounded focus:outline-none"
        :disabled="busy || !changed"
        :class="{
          'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': changed,
          'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !changed,
          'pointer-events-none': busy || !changed
        }"
      >
        <span v-if="!busy"> Save Changes </span>
        <spinner v-else class="mx-auto" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { Spinner },
  layout: 'settings',
  data() {
    return {
      changed: false,
      data: {
        name: this.$auth.user.attributes.admin_name,
        phone: this.$auth.user.attributes.admin_phone
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.listenChanges();
      }
    }
  },
  mounted() {
    this.closeSidebar();
    this.listenChanges();
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar',
      saveChanges: 'authentication/update'
    }),
    listenChanges() {
      if (
        this.data.name === this.$auth.user.attributes.admin_name &&
        this.data.phone === this.$auth.user.attributes.admin_phone
      ) {
        return (this.changed = false);
      }

      this.changed = true;
    },
    submitForm() {
      this.saveChanges(this.data).then(() => this.listenChanges());
    }
  }
};
</script>
