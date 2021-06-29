<template>
  <div>
    <title-bar page-title="New User" back />
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
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block leading-8"> Email </label>
          <input
            id="email"
            v-model="data.email"
            type="email"
            class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
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
        <div class="md:grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="password" class="block leading-8"> Password </label>
            <input
              id="password"
              v-model="data.password"
              type="password"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 bg-white transition rounded focus:outline-none"
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
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 bg-white transition rounded focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Save User </span>
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
        email: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        email: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'users/busy',
      serverErrors: 'users/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      create: 'users/create',
      clearServerErrors: 'users/clearErrors'
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
      const valid = this.validate();

      if (!valid) return;

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
