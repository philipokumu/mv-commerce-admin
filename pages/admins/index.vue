<template>
  <div class="py-4 px-4 md:px-8">
    <div v-if="busy">
      <div
        class="clone mb-4 relative h-12 rounded-lg bg-gray-100 overflow-hidden"
      ></div>
      <div class="clone mb-4 relative bg-gray-100 rounded-lg overflow-hidden">
        <div class="h-12 border-b border-white"></div>
        <div class="h-12"></div>
        <div class="h-12"></div>
      </div>
      <div
        class="clone mb-4 relative h-12 rounded-lg bg-gray-100 overflow-hidden"
      ></div>
    </div>
    <div v-else>
      <div v-if="admins && admins.length > 0">
        <div class="mb-4 flex items-center justify-end">
          <nuxt-link
            to="/admins/new"
            class="py-2 px-4 flex items-center bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          >
            <span class="mr-1 h-6 w-6 block">
              <add-icon />
            </span>
            Add New
          </nuxt-link>
        </div>
        <div class="w-full shadow-md rounded overflow-x-auto">
          <table class="w-full divide-y">
            <thead class="bg-gray-100 text-gray-500">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-normal uppercase tracking-wider whitespace-nowrap"
                >
                  Rank
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y">
              <tr v-for="(admin, index) in admins" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <p>{{ admin.data.attributes.admin_name }}</p>
                  <p class="text-sm text-gray-500">
                    {{ admin.data.attributes.preserve_email }}
                  </p>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>{{ admin.data.attributes.admin_phone }}</p>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap">
                  <p>{{ admin.data.attributes.rank }}</p>
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap text-right">
                  <nuxt-link
                    :to="`/admins/${admin.data.admin_id}/edit`"
                    class="ml-2 inline-block text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  >
                    Edit
                  </nuxt-link>
                  <button
                    class="ml-2 inline-block focus:outline-none"
                    :class="{
                      'text-red-500 hover:text-red-600 focus:text-red-600': !busy,
                      'text-gray-500 pointer-events-none': busy
                    }"
                    :disabled="busy"
                    @click="deleteAdmin(admin.data.admin_id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <div class="mb-4">
          <div class="mb-2 mx-auto h-24 w-24 text-gray-300"><staff-icon /></div>
          <p class="text-center font-poppins text-2xl font-semibold">
            No admins yet.
          </p>
        </div>
        <nuxt-link
          to="/admins/new"
          class="py-3 px-6 flex items-center bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
        >
          <span class="mr-1 h-6 w-6 block">
            <add-icon />
          </span>
          Add New
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddIcon from '@/components/Icons/AddIcon.vue';
import StaffIcon from '@/components/Icons/StaffIcon.vue';

export default {
  components: { AddIcon, StaffIcon },
  layout: 'dashboard',
  middleware: 'adminRank',
  computed: {
    ...mapGetters({
      busy: 'admins/busy',
      admins: 'admins/admins'
    })
  },
  mounted() {
    this.closeSidebar();
  },
  created() {
    this.getAdmins();
  },
  methods: {
    ...mapActions({
      closeSidebar: 'closeSidebar',
      getAdmins: 'admins/get',
      deleteAdmin: 'admins/delete'
    })
  }
};
</script>
