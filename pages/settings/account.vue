<template>
  <div class="px-4 md:px-8 overflow-hidden">
    <div class="mb-4">
      <p class="py-2 text-2xl font-poppins border-b">Change Username</p>
      <form autocomplete="off" class="mt-4" @submit.prevent="">
        <div class="mb-4">
          <label for="email" class="block leading-8"> Email </label>
          <input
            id="email"
            :value="$auth.user.attributes.preserve_email"
            type="email"
            class="py-3 px-6 border block w-full rounded focus:outline-none"
            readonly
          />
        </div>
      </form>
    </div>
    <div>
      <p class="py-2 text-2xl font-poppins text-red-500 border-b">
        Danger Zone
      </p>
      <div class="mt-4">
        <p class="mb-2 text-sm">
          Proceed with caution! This will delete all the data associated with
          your accounnt. This cannot be undone.
        </p>
        <button
          class="py-3 px-6 block w-full font-poppins bg-gray-600 text-white shadow-md hover:bg-gray-700 focus:bg-gray-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
          @click="deleteAccount"
        >
          <span v-if="!busy"> Delete Account </span>
          <spinner v-else class="mx-auto" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { Spinner },
  layout: 'settings',
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  methods: {
    ...mapActions({
      deleteAccount: 'authentication/delete'
    })
  }
};
</script>
