<template>
  <div
    class="fixed top-0 left-0 h-screen w-screen bg-black transition-all duration-300 z-20 lg:z-30"
    :class="{
      'opacity-0 invisible': !sidebar && !active,
      'opacity-50 visible': sidebar || active
    }"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Overlay',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar'
    })
  }
};
</script>
