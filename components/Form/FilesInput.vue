<template>
  <div>
    <label :for="uid" class="block leading-8"> {{ label }} </label>
    <div class="p-4 bg-white border rounded">
      <div
        ref="dropbox"
        class="w-full h-48 relative flex items-center justify-center border-2 border-dashed rounded overflow-x-auto overflow-y-hidden"
      >
        <div v-if="!loaded">
          <img
            v-if="currentPhoto"
            :src="currentPhoto"
            alt="Cover photo"
            class="h-full w-full md:w-60 object-contain"
          />
          <p v-else class="max-w-xs text-lg text-center font-semibold">
            Drag your files(.svg, .png, .jpg, .jpeg) here or click to upload.
          </p>
        </div>
        <input
          :id="uid"
          type="file"
          name="images"
          class="block h-full w-full opacity-0 absolute"
          multiple
          @change="loadImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: String,
      default: 'images'
    },
    label: {
      type: String,
      default: 'Images'
    },
    currentPhoto: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  methods: {
    loadImage(e) {
      if (!e.target.files[0]) return;

      const images = e.target.files;
      this.$emit('imagesLoaded', images);
      this.loaded = true;

      this.previewImages(images);
    },
    previewImages(files) {
      const dropbox = this.$refs.dropbox;
      const currentImages = dropbox.querySelectorAll('.preview-image');

      if (dropbox.contains(currentImages[0])) {
        currentImages.forEach(img => {
          dropbox.removeChild(img);
        });
      }

      files.forEach(file => {
        const reader = new FileReader();
        const image = document.createElement('img');
        image.className =
          'preview-image mr-4 w-full md:w-60 h-full object-contain';

        reader.onload = e => {
          image.src = e.target.result;
        };

        reader.readAsDataURL(file);
        dropbox.appendChild(image);
      });
    }
  }
};
</script>
