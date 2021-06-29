<template>
  <div>
    <title-bar page-title="New Admin" back />
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
        <div class="md:grid grid-cols-2 gap-4">
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
              requied
            />
            <div class="text-sm text-red-500">
              <span v-if="errors.email">{{ errors.email }}</span>
              <span v-if="serverErrors && serverErrors.email">
                {{ serverErrors.email[0] }}
              </span>
            </div>
          </div>
          <div class="mb-4">
            <label for="phoneNumber" class="block leading-8">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              v-model="data.phone"
              type="number"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="rank" class="block leading-8"> Rank </label>
          <select
            id="rank"
            v-model="data.rank"
            type="number"
            class="py-3 px-6 bg-white border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            required
          >
            <option :value="null">Select rank</option>
            <option value="normal_admin">Normal Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        <div class="md:grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="password" class="block leading-8"> Password </label>
            <input
              id="password"
              v-model="data.password"
              type="password"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
            />
          </div>
          <div class="mb-4">
            <label for="passwordConfirmation" class="block leading-8">
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              v-model="data.password_confirmation"
              type="password"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Save Admin </span>
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
  middleware: 'adminRank',
  data() {
    return {
      data: {
        name: null,
        email: null,
        phone: null,
        rank: null,
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
      busy: 'admins/busy',
      serverErrors: 'admins/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      create: 'admins/create',
      clearServerErrors: 'admins/clearErrors'
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
