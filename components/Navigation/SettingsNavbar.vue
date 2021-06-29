<template>
  <div class="sticky top-20 left-0 shadow-md bg-white overflow-hidden">
    <ul class="flex items-center text-gray-400 overflow-x-auto">
      <li>
        <nuxt-link
          to="/settings/profile"
          class="py-4 px-4 md:px-8 whitespace-nowrap block hover:text-primary-500 focus:text-primary-500 transition focus:outline-none"
          :class="{
            'text-primary-500 border-b-2 border-primary-500':
              $route.name === 'settings-profile'
          }"
        >
          Edit Profile
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/settings/account"
          class="py-4 px-4 md:px-8 whitespace-nowrap block hover:text-primary-500 focus:text-primary-500 transition focus:outline-none"
          :class="{
            'text-primary-500 border-b-2 border-primary-500':
              $route.name === 'settings-account'
          }"
        >
          Account
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/settings/password"
          class="py-4 px-4 md:px-8 whitespace-nowrap block hover:text-primary-500 focus:text-primary-500 transition focus:outline-none"
          :class="{
            'text-primary-500 border-b-2 border-primary-500':
              $route.name === 'settings-password'
          }"
        >
          Change Password
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/settings/system"
          class="py-4 px-4 md:px-8 whitespace-nowrap block hover:text-primary-500 focus:text-primary-500 transition focus:outline-none"
          :class="{
            'text-primary-500 border-b-2 border-primary-500':
              $route.name === 'settings-system'
          }"
        >
          System
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SettingsSidebar'
};
</script>
