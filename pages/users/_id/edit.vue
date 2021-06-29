<template>
  <div>
    <title-bar page-title="Edit User" back />
    <div v-if="user" class="container mx-auto">
      <form
        autocomplete="off"
        class="py-4 px-4 md:px-8"
        @submit.prevent="submitForm"
      >
        <div class="mb-4">
          <label for="email" class="block leading-8"> Email </label>
          <p class="text-sm">Cannot change username.</p>
          <input
            id="email"
            :value="user.data.attributes.preserve_email"
            type="email"
            class="py-3 px-6 border block w-full rounded focus:outline-none"
            requied
            readonly
          />
        </div>
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
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max text-white shadow-md transition rounded focus:outline-none"
          :disabled="busy || !changed"
          :class="{
            'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': changed,
            'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !changed,
            'pointer-events-none': busy || !changed
          }"
        >
          <span v-if="!busy"> Update User </span>
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
      changed: false,
      data: {
        id: null,
        active: null,
        name: null
      }
    };
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
      busy: 'users/busy',
      serverErrors: 'users/errors'
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
  created() {
    this.fillForm();
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      getUser: 'users/view',
      update: 'users/update',
      clearServerErrors: 'users/clearErrors'
    }),
    fillForm() {
      this.getUser(this.$route.params.id).then(() => {
        this.data.id = this.user.data.user_id;
        this.data.active = this.user.data.attributes.active;
        this.data.name = this.user.data.attributes.user_name;
        this.listenChanges();
      });
    },
    listenChanges() {
      if (
        this.data.name === this.user.data.attributes.user_name &&
        this.data.phone === this.user.data.attributes.user_phone
      ) {
        return (this.changed = false);
      }

      this.changed = true;
    },
    submitForm() {
      this.clearServerErrors();

      this.update(this.data).then(() => {
        if (this.serverErrors) return;

        for (const key in this.data) {
          this.data[key] = null;
        }
      });
    }
  }
};
</script>
