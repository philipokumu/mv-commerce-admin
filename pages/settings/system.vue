<template>
  <div class="px-4 md:px-8 overflow-hidden">
    <p class="py-2 text-2xl font-poppins border-b">System Settings</p>
    <form
      autocomplete="off"
      class="my-4 md:flex items-center justify-between"
      @submit.prevent="submitForm"
    >
      <label for="taxPercentage" class="leading-8"> Tax percentage </label>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4">
          <input
            id="taxPercentage"
            v-model="data.value"
            placeholder="16.0"
            type="number"
            class="py-3 px-6 h-10 border ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500': serverErrors && serverErrors.value
            }"
            required
            @keyup="assignName"
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.value">
              {{ serverErrors.value }}
            </span>
          </div>
        </div>
        <button
          class="py-2 px-4 col-span-2 text-white shadow-md transition rounded focus:outline-none"
          :disabled="busy || !ready"
          :class="{
            'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': ready,
            'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !ready,
            'pointer-events-none': busy || !ready
          }"
        >
          <span v-if="!busy"> Save </span>
          <spinner v-else class="mx-auto" />
        </button>
      </div>
    </form>
    <form
      autocomplete="off"
      class="mb-4 md:flex items-center justify-between"
      @submit.prevent="submitForm"
    >
      <label for="defaultCurrency" class="leading-8"> Default Currency </label>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4">
          <input
            id="defaultCurrency"
            v-model="data.value"
            placeholder="KSH"
            type="text"
            class="py-3 px-6 h-10 border ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500': serverErrors && serverErrors.value
            }"
            required
            @keyup="assignName"
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.value">
              {{ serverErrors.value }}
            </span>
          </div>
        </div>
        <button
          class="py-2 px-4 col-span-2 text-white shadow-md transition rounded focus:outline-none"
          :disabled="busy || !ready"
          :class="{
            'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': ready,
            'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !ready,
            'pointer-events-none': busy || !ready
          }"
        >
          <span v-if="!busy"> Save </span>
          <spinner v-else class="mx-auto" />
        </button>
      </div>
    </form>
    <form
      autocomplete="off"
      class="mb-4 md:flex items-center justify-between"
      @submit.prevent="submitForm"
    >
      <label for="administrationPercentage" class="leading-8">
        Administration Percentage
      </label>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4">
          <input
            id="administrationPercentage"
            v-model="data.value"
            placeholder="5.0"
            type="number"
            class="py-3 px-6 h-10 border ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500': serverErrors && serverErrors.value
            }"
            required
            @keyup="assignName"
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.value">
              {{ serverErrors.value }}
            </span>
          </div>
        </div>
        <button
          class="py-2 px-4 col-span-2 text-white shadow-md transition rounded focus:outline-none"
          :disabled="busy || !ready"
          :class="{
            'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': ready,
            'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !ready,
            'pointer-events-none': busy || !ready
          }"
        >
          <span v-if="!busy"> Save </span>
          <spinner v-else class="mx-auto" />
        </button>
      </div>
    </form>
    <form
      autocomplete="off"
      class="mb-4 md:flex items-center justify-between"
      @submit.prevent="submitForm"
    >
      <label for="minCartLimit" class="leading-8"> Minimum cart Limit </label>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4">
          <input
            id="minCartLimit"
            v-model="data.value"
            placeholder="100000.0"
            type="number"
            class="py-3 px-6 h-10 border ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{
              'border-red-500': serverErrors && serverErrors.value
            }"
            required
            @keyup="assignName"
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.value">
              {{ serverErrors.value }}
            </span>
          </div>
        </div>
        <button
          class="py-2 px-4 col-span-2 text-white shadow-md transition rounded focus:outline-none"
          :disabled="busy || !ready"
          :class="{
            'bg-secondary-600 hover:bg-secondary-700 focus:bg-secondary-700': ready,
            'bg-gray-500 hover:bg-gray-700 focus:bg-gray-700': !ready,
            'pointer-events-none': busy || !ready
          }"
        >
          <span v-if="!busy"> Save </span>
          <spinner v-else class="mx-auto" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  components: { Spinner },
  layout: 'settings',
  data() {
    return {
      ready: false,
      data: {
        name: null,
        value: null
      }
    };
  },
  methods: {
    submitForm() {
      // eslint-disable-next-line no-console
      console.log('Coming soon');
    }
  }
};
</script>
