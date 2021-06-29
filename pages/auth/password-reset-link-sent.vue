<template>
  <div class="container mx-auto px-8 py-4">
    <div class="mx-auto max-w-sm">
      The password reset link has been sent to your email
      <div class="text-sm text-red-500"></div>
      <nuxt-link
        to="/"
        class="block text-sm text-center text-blue-500 hover:text-blue-600 focus:text-blue-600 transition outline-none"
        >Back to login page</nuxt-link
      >
    </div>
  </div>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'auth'
};
</script>
