<template>
  <div>
    <title-bar page-title="New Sub Category" back />
    <div class="container mx-auto">
      <form
        autocomplete="off"
        class="py-4 px-4 md:px-8"
        @submit.prevent="submitForm"
      >
        <file-input
          :current-photo="currentPhoto"
          class="mb-4"
          @imageLoaded="setImage"
        />
        <div class="mb-4">
          <label for="name" class="block leading-8"> Name </label>
          <input
            id="name"
            v-model="data.name"
            type="text"
            class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
            :class="{ 'border-red-500': serverErrors && serverErrors.name }"
            required
          />
          <div class="text-sm text-red-500">
            <span v-if="serverErrors && serverErrors.name">
              {{ serverErrors.name[0] }}
            </span>
          </div>
        </div>
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Update Sub Category </span>
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
import FileInput from '@/components/Form/FileInput.vue';

export default {
  components: { TitleBar, Spinner, FileInput },
  data() {
    return {
      data: {
        parent_category_id: null,
        level: 'sub',
        image: null,
        name: null,
        active: 'active'
      },
      currentPhoto: null
    };
  },
  computed: {
    ...mapGetters({
      category: 'categories/category',
      subCategory: 'subCategories/subCategory',
      busy: 'subCategories/busy',
      serverErrors: 'subCategories/errors'
    })
  },
  created() {
    this.clearServerErrors();
    this.fillForm();
  },
  methods: {
    ...mapActions({
      getCategory: 'categories/view',
      getSubCategory: 'subCategories/view',
      update: 'subCategories/update',
      clearServerErrors: 'subCategories/clearErrors'
    }),
    async fillForm() {
      await this.getCategory(this.$route.params.slug);
      await this.getSubCategory({
        subCategorySlug: this.$route.params.subCategorySlug,
        categorySlug: this.$route.params.slug
      });

      // this.data.parent_category_id = this.category.data.product_category_id;
      this.data.parent_category_id = this.subCategory.data.attributes.parent_category_id;
      this.data.name = this.subCategory.data.attributes.name;
      this.currentPhoto = this.subCategory.data.attributes.subCategoryImage.data.attributes.path;
    },
    setImage(image) {
      this.data.image = image;
    },
    submitForm() {
      /* eslint-disable no-console */
      this.clearServerErrors();
      const data = new FormData();

      for (const key in this.data) {
        if (Object.hasOwnProperty.call(this.data, key)) {
          data.append(key, this.data[key]);
        }
      }

      console.log(this.data);

      this.update({
        categorySlug: this.category.data.attributes.slug,
        data
      });
    }
  }
};
</script>
