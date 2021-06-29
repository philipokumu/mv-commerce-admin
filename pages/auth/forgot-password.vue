<template>
  <div
    class="py-4 px-4 md:px-8 min-h-screen flex flex-col items-center justify-between"
  >
    <div></div>
    <div class="max-w-sm w-full">
      <div class="mb-3">
        <logo />
      </div>
      <div class="mb-6">
        <p class="text-sm">
          An email with a reset password link will be sent to you.
        </p>
      </div>
      <form autocomplete="off" class="w-full" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="email" class="block leading-8"> Email </label>
          <input
            id="email"
            v-model="data.email"
            type="email"
            class="py-3 px-6 border block w-full ring-primary-600 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500':
                errors.email || (serverErrors && serverErrors.email)
            }"
            required
          />
          <div class="text-sm text-red-500">
            <span v-if="errors.email">{{ errors.email }}</span>
            <span v-if="serverErrors && serverErrors.email">
              {{ serverErrors.email[0] }}
            </span>
          </div>
        </div>
        <button
          class="my-6 py-3 px-6 block w-full bg-primary-600 text-white shadow-md hover:bg-primary-700 focus:bg-primary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Proceed </span>
          <spinner v-else class="mx-auto" />
        </button>
        <nuxt-link
          to="/auth/login"
          class="mt-2 block text-sm text-center text-blue-700 hover:text-blue-900 focus:text-blue-900 transition focus:outline-none"
        >
          Back to login
        </nuxt-link>
      </form>
    </div>
    <p class="text-sm text-gray-500">&copy; 2021 Multiccommerce Admin Center</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';
import Logo from '@/components/Icons/Logo.vue';

export default {
  auth: 'guest',
  components: { Spinner, Logo },
  layout: 'auth',
  data() {
    return {
      data: {
        email: null
      },
      errors: {
        email: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy',
      serverErrors: 'authentication/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      requestReset: 'authentication/requestPasswordReset',
      clearServerErrors: 'authentication/clearErrors'
    }),
    clearErrors() {
      for (const error in this.errors) {
        this.errors[error] = null;
      }
      this.clearServerErrors();
    },
    validate() {
      let valid = true;
      const re = /\S+@\S+\.\S+/;
      this.clearErrors();

      if (!re.test(this.data.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      // eslint-disable-next-line no-console
      console.log('Coming soon');

      const valid = this.validate();

      if (!valid) return;

      this.requestReset(this.data);
    }
  }
};
</script>
