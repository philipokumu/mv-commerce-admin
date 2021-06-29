<template>
  <div>
    <label :for="uid" class="block leading-8"> {{ label }} </label>
    <div class="p-4 bg-white border rounded">
      <div
        ref="dropbox"
        class="w-full h-48 relative grid place-items-center border-2 border-dashed rounded overflow-hidden"
      >
        <div v-if="!loaded">
          <img
            v-if="currentPhoto"
            :src="currentPhoto"
            alt="Cover photo"
            class="h-full w-full md:w-60 object-contain"
          />
          <p v-else class="max-w-xs text-lg text-center font-semibold">
            Drag your file(.svg, .png, .jpg, .jpeg) here or click to upload.
          </p>
        </div>
        <input
          :id="uid"
          type="file"
          name="image"
          class="block h-full w-full opacity-0 absolute"
          required
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
      default: 'image'
    },
    label: {
      type: String,
      default: 'Image'
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

      const image = e.target.files[0];
      this.$emit('imageLoaded', image);
      this.loaded = true;

      this.previewImage(image);
    },
    previewImage(file) {
      const dropbox = this.$refs.dropbox;
      const reader = new FileReader();
      const image = document.createElement('img');
      image.className = 'preview-image w-full md:w-60 h-full object-contain';

      if (dropbox.contains(dropbox.querySelector('.preview-image'))) {
        dropbox.removeChild(dropbox.querySelector('.preview-image'));
        reader.abort();
      }

      reader.onload = e => {
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
      dropbox.appendChild(image);
    }
  }
};
</script>
