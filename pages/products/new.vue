<template>
  <div>
    <title-bar page-title="New Product" back />
    <div class="container mx-auto">
      <form
        autocomplete="off"
        class="py-4 px-4 md:px-8"
        @submit.prevent="submitForm"
      >
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">Seller Information</legend>
          <div class="mb-4">
            <label for="seller" class="block leading-8">Seller</label>
            <input
              id="seller"
              list="sellersList"
              type="text"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
              @change="setSellerId"
            />
            <datalist id="sellersList" ref="sellersList">
              <option
                v-for="(seller, index) in sellers"
                :key="index"
                :data-value="seller.data.seller_id"
                :value="`${seller.data.attributes.seller_name}`"
              ></option>
            </datalist>
          </div>
        </fieldset>
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">Naming & Categorizing</legend>
          <div class="mb-4">
            <label for="name" class="block leading-8">Name</label>
            <input
              id="name"
              v-model="data.name"
              type="text"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
            />
          </div>
          <div class="md:grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="category" class="block leading-8">Category</label>
              <input
                id="category"
                list="categoriesList"
                type="text"
                class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
                required
                @change="setCategorySlug"
              />
              <datalist id="categoriesList" ref="categoriesList">
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :data-value="category.data.attributes.slug"
                  :value="`${category.data.attributes.name}`"
                ></option>
              </datalist>
            </div>
            <div class="mb-4">
              <label for="subCategory" class="block leading-8">
                Sub Category
              </label>
              <input
                id="subCategory"
                list="subCategoriesList"
                type="text"
                class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
                :class="{ 'bg-gray-50': !categorySlug }"
                :disabled="!categorySlug"
                required
                @change="setSubCategoryId"
              />
              <datalist id="subCategoriesList" ref="subCategoriesList">
                <option
                  v-for="(subCategory, index) in subCategories"
                  :key="index"
                  :data-value="subCategory.data.product_category_id"
                  :value="`${subCategory.data.attributes.name}`"
                ></option>
              </datalist>
            </div>
          </div>
        </fieldset>
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">Pricing & Quantifying</legend>
          <div class="md:grid grid-cols-3 gap-4">
            <div class="mb-4">
              <label for="inStockQuantity" class="block leading-8">
                In stock quantity (Optional)
              </label>
              <input
                id="inStockQuantity"
                v-model="data.quantity_in_stock"
                type="number"
                class="px-6 h-12 border block w-full ring-secondary-500 focus:ring-2 transition rounded-md focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <label
                for="orderableQuantity"
                class="block leading-8 w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
              >
                Minimum orderable quantity (Optional)
              </label>
              <input
                id="orderableQuantity"
                v-model="data.minimum_order_quantity"
                type="number"
                min="1"
                class="px-6 h-12 border block w-full ring-secondary-500 focus:ring-2 transition rounded-md focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <label for="unit" class="block leading-8">
                Unit (Optional)
              </label>
              <select
                id="unit"
                v-model="data.unit"
                class="px-6 h-12 w-full bg-white border block ring-secondary-500 focus:ring-2 transition rounded-md focus:outline-none"
              >
                <option :value="null">Select unit</option>
                <option value="KGS">KGS</option>
                <option value="ML">ML</option>
              </select>
            </div>
          </div>
          <div class="md:grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label for="originalPrice" class="block leading-8">
                Original Price
              </label>
              <input
                id="originalPrice"
                v-model="data.price"
                type="number"
                class="px-6 h-12 border block w-full ring-secondary-500 focus:ring-2 transition rounded-md focus:outline-none"
                required
              />
            </div>
            <div class="mb-4">
              <label for="discount" class="block leading-8">
                Percentage discount
              </label>
              <select
                id="discount"
                v-model="data.discount_percent"
                class="px-6 h-12 bg-white border block w-full ring-secondary-500 focus:ring-2 transition rounded-md focus:outline-none"
              >
                <option :value="null">Select percentage</option>
                <option
                  v-for="(percentage, index) in 8"
                  :key="index"
                  :value="percentage * 5"
                >
                  {{ percentage * 5 }}%
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label for="sellingPrice" class="block leading-8">
              Selling Price (Auto calculated)
            </label>
            <input
              id="sellingPrice"
              type="number"
              :value="
                Math.round(
                  data.price - (data.price / 100) * data.discount_percent
                )
              "
              class="px-6 h-12 border block w-full rounded-md focus:outline-none"
              readonly
            />
          </div>
        </fieldset>
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">Images</legend>
          <file-input
            uid="coverImage"
            label="Cover Image"
            class="mb-4"
            @imageLoaded="setCoverImage"
          />
          <files-input
            uid="previewImages"
            label="Preview Images"
            class="mb-4"
            @imagesLoaded="setPreviewImages"
          />
        </fieldset>
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">More information</legend>
          <div class="mb-4">
            <label for="details" class="block leading-8">
              Details (Optional)
            </label>
            <textarea
              id="details"
              v-model="data.details"
              cols="30"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 bg-white transition rounded focus:outline-none"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="video" class="block leading-8">
              YouTube video embed URL (Optional)
            </label>
            <textarea
              id="video"
              v-model="data.video"
              cols="30"
              placeholder="Paste your youtube embedd link here"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 bg-white transition rounded focus:outline-none"
            ></textarea>
          </div>
        </fieldset>
        <button
          class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <span v-if="!busy"> Save Product </span>
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
import FilesInput from '@/components/Form/FilesInput.vue';
import FileInput from '@/components/Form/FileInput.vue';

export default {
  components: { TitleBar, Spinner, FilesInput, FileInput },
  data() {
    return {
      categorySlug: null,
      data: {
        seller_id: null,
        product_category_id: null,
        name: null,
        cover_image: null,
        images: [],
        quantity_in_stock: '',
        minimum_order_quantity: 1,
        unit: '',
        currency: 'KSH',
        price: null,
        discount_percent: '',
        details: '',
        video: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'products/busy',
      serverErrors: 'products/errors',
      sellers: 'sellers/sellers',
      categories: 'categories/categories',
      subCategories: 'subCategories/subCategories'
    })
  },
  created() {
    this.clearServerErrors();
    this.getSellers();
    this.getCategories();
  },
  methods: {
    ...mapActions({
      create: 'products/create',
      clearServerErrors: 'products/clearErrors',
      getSellers: 'sellers/get',
      getCategories: 'categories/get',
      getSubCategories: 'subCategories/get'
    }),
    setSellerId(e) {
      if (!e.target.value) return;

      const sellersList = this.$refs.sellersList;
      let id = sellersList.querySelector(`option[value="${e.target.value}"]`);
      id = id ? id.dataset.value : null;

      this.data.seller_id = id;
    },
    async setCategorySlug(e) {
      if (!e.target.value) return;

      const categoriesList = this.$refs.categoriesList;
      let slug = categoriesList.querySelector(
        `option[value="${e.target.value}"]`
      );
      slug = slug ? slug.dataset.value : null;

      if (!slug) return;
      this.categorySlug = slug;

      await this.getSubCategories({
        categorySlug: slug,
        refresh: true
      });
    },
    setSubCategoryId(e) {
      if (!e.target.value) return;

      const subCategoriesList = this.$refs.subCategoriesList;
      let id = subCategoriesList.querySelector(
        `option[value="${e.target.value}"]`
      );
      id = id ? id.dataset.value : null;

      this.data.product_category_id = id;
    },
    setCoverImage(image) {
      this.data.cover_image = image;
    },
    setPreviewImages(images) {
      this.data.images = images;
    },
    submitForm() {
      this.clearServerErrors();
      const data = new FormData();

      for (const key in this.data) {
        if (Object.hasOwnProperty.call(this.data, key)) {
          if (key === 'images') {
            data.append(`${key}[]`, this.data[key]);
          } else {
            data.append(key, this.data[key]);
          }
        }
      }

      this.create(data).then(() => {
        if (this.serverErrors) return;

        for (const key in this.data) {
          this.data[key] = null;
        }
      });
    }
  }
};
</script>
