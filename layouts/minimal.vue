<template>
  <div
    class="font-sourcesans min-h-screen bg-gray-50 text-gray-800 lg:grid grid-cols-12"
  >
    <div class="col-span-3 2xl:col-span-2">
      <sidebar />
    </div>
    <div class="col-span-9 2xl:col-span-10">
      <overlay />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Navigation/Sidebar.vue';
import Overlay from '@/components/Widgets/Overlay.vue';

export default {
  components: {
    Sidebar,
    Overlay
  }
};
</script>
