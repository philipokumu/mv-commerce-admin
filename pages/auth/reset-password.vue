<template>
  <div
    class="py-4 px-4 md:px-8 min-h-screen flex flex-col items-center justify-between"
  >
    <div></div>
    <div class="max-w-sm w-full">
      <div class="mb-6">
        <logo />
      </div>
      <form autocomplete="off" class="w-full" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="password" class="block leading-8"> Password </label>
          <input
            id="password"
            v-model="data.password"
            type="password"
            class="py-3 px-6 border block w-full ring-primary-600 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500': serverErrors && serverErrors.password
            }"
            required
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.password">
              {{ serverErrors.password[0] }}
            </span>
          </div>
        </div>
        <div class="mb-4">
          <label for="passwordConfirmation" class="block leading-8">
            Confirm Password
          </label>
          <input
            id="passwordConfirmation"
            v-model="data.password_confirmation"
            type="password"
            class="py-3 px-6 border block w-full ring-primary-600 focus:ring-2 transition rounded focus:outline-none"
            required
          />
        </div>
        <button
          class="my-6 py-3 px-6 block w-full bg-primary-600 text-white shadow-md hover:bg-primary-700 focus:bg-primary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Reset </span>
          <spinner v-else class="mx-auto" />
        </button>
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
        token: this.$route.query.token,
        email: this.$route.query.email,
        password: null,
        password_confirmation: null
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
      resetPassword: 'authentication/resetPassword',
      clearServerErrors: 'authentication/clearErrors'
    }),
    submitForm() {
      // eslint-disable-next-line no-console
      this.clearServerErrors();

      this.resetPassword(this.data);
    }
  }
};
</script>
