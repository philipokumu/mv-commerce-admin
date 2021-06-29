<template>
  <div>
    <title-bar page-title="Edit Product" back />
    <div
      class="px-4 md:px-8 flex items-center bg-white shadow-md overflow-x-auto"
    >
      <nuxt-link
        to="?tab=details"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'details',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'details'
        }"
      >
        Details
      </nuxt-link>
      <nuxt-link
        to="?tab=images"
        class="py-3 px-6 transition focus:outline-none"
        :class="{
          'hover:text-primary-500 focus:text-primary-500': tab !== 'images',
          ' text-primary-500 border-b-2 border-primary-500': tab === 'images'
        }"
      >
        Images
      </nuxt-link>
    </div>
    <div class="container mx-auto">
      <form
        v-if="tab === 'details'"
        autocomplete="off"
        class="py-4 px-4 md:px-8"
        @submit.prevent="submitForm"
      >
        <fieldset class="mb-4 p-4 border rounded">
          <legend class="px-2 text-lg">Seller Information</legend>
          <p v-if="seller">{{ seller.data.attributes.name }}</p>
          <div v-if="seller" class="mb-4">
            <label for="seller" class="block leading-8">Seller</label>
            <input
              id="seller"
              list="sellersList"
              type="text"
              class="py-3 px-6 border block w-full ring-secondary-500 focus:ring-2 transition rounded focus:outline-none"
              required
              :value="seller.data.attributes.seller_name"
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
            <div v-if="categories && categories.length > 0" class="mb-4">
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
            <div v-if="subCategories && subCategories.length > 0" class="mb-4">
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
                :value="product.data.attributes.product_category_name"
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
                <option value="Kgs">KGS</option>
                <option value="Ml">ML</option>
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
          <span v-if="!busy"> Update Product Details </span>
          <spinner v-else class="mx-auto" />
        </button>
      </form>
      <div v-if="tab === 'images'" class="py-4 px-4 md:px-8">
        <p class="mb-2 py-1 text-lg font-semibold border-b">Cover Image</p>
        <div
          v-if="product && product.data.attributes.cover_image"
          class="flex items-center overflow-x-auto"
        >
          <div class="mr-2 relative h-64 w-full rounded overflow-hidden">
            <img
              :src="product.data.attributes.cover_image.data.attributes.path"
              :alt="product.data.attributes.preserve_name"
              class="h-full w-full object-cover"
            />
            <button
              class="h-8 w-8 absolute top-4 right-4 grid place-items-center bg-white ring-red-500 bg-opacity-50 hover:bg-opacity-80 focus:bg-opacity-80 focus:ring-2 transition focus:outline-none rounded-full"
              @click="
                deleteImage({
                  sellerId: $route.params.sellerId,
                  productSlug: $route.params.slug,
                  imageId: product.data.attributes.cover_image.data.image_id
                })
              "
            >
              <div class="h-2/3 w-2/3">
                <delete-icon />
              </div>
            </button>
          </div>
        </div>
        <p class="mb-2 py-1 text-lg font-semibold border-b">Preview Images</p>
        <div
          v-if="
            product && product.data.attributes.productImages.data.length > 0
          "
          class="flex items-center overflow-x-auto"
        >
          <div
            v-for="(image, index) in product.data.attributes.productImages.data"
            :key="index"
            class="mr-2 relative h-64 w-full rounded overflow-hidden"
          >
            <img
              :src="image.data.attributes.path"
              :alt="product.data.attributes.preserve_name"
              class="h-full w-full object-cover"
            />
            <button
              class="h-8 w-8 absolute top-4 right-4 grid place-items-center bg-white ring-red-500 bg-opacity-50 hover:bg-opacity-80 focus:bg-opacity-80 focus:ring-2 transition focus:outline-none rounded-full"
              @click="
                deleteImage({
                  sellerId: $route.params.sellerId,
                  productSlug: $route.params.slug,
                  imageId: image.data.image_id
                })
              "
            >
              <div class="h-2/3 w-2/3">
                <delete-icon />
              </div>
            </button>
          </div>
        </div>

        <form autocomplete="off" @submit.prevent="submitImagesForm">
          <fieldset class="mb-4 p-4 border rounded">
            <legend class="px-2 text-lg">Images</legend>
            <file-input
              uid="newCoverImage"
              label="New Cover Image"
              class="mb-4"
              @imageLoaded="setCoverImage"
            />
            <files-input
              uid="newPreviewImages"
              label="New Preview Images"
              class="mb-4"
              @imagesLoaded="setPreviewImages"
            />
          </fieldset>
          <button
            class="mt-6 ml-auto py-3 px-6 block w-full md:w-max bg-secondary-600 text-white shadow-md hover:bg-secondary-700 focus:bg-secondary-700 transition rounded focus:outline-none"
            :disabled="busy"
            :class="{ 'pointer-events-none': busy }"
          >
            <span v-if="!busy"> Update Product Images </span>
            <spinner v-else class="mx-auto" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import Spinner from '@/components/Widgets/Spinner.vue';
import FilesInput from '@/components/Form/FilesInput.vue';
import FileInput from '@/components/Form/FileInput.vue';
import DeleteIcon from '@/components/Icons/DeleteIcon.vue';

export default {
  components: { TitleBar, Spinner, FilesInput, FileInput, DeleteIcon },
  data() {
    return {
      categorySlug: null,
      data: {
        seller_id: null,
        product_category_id: null,
        name: null,
        quantity_in_stock: null,
        minimum_order_quantity: 1,
        unit: null,
        currency: 'KSH',
        price: null,
        discount_percent: null,
        details: null,
        video: null
      },
      imagesData: {
        cover_image: null,
        images: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'products/busy',
      serverErrors: 'products/errors',
      seller: 'sellers/seller',
      product: 'products/product',
      sellers: 'sellers/sellers',
      categories: 'categories/categories',
      subCategories: 'subCategories/subCategories'
    }),
    tab() {
      if (!this.$route.query.tab) return 'details';
      return this.$route.query.tab;
    }
  },
  created() {
    this.clearServerErrors();
    this.getSellers();
    this.getCategories();
    this.fillForm();
  },
  methods: {
    ...mapActions({
      update: 'products/update',
      clearServerErrors: 'products/clearErrors',
      getSeller: 'sellers/view',
      getProduct: 'products/view',
      getSellers: 'sellers/get',
      getCategories: 'categories/get',
      getSubCategories: 'subCategories/get',
      addImages: 'productImages/create',
      deleteImage: 'productImages/delete'
    }),
    async fillForm() {
      await this.getSeller(this.$route.params.sellerId);
      await this.getProduct({
        productSlug: this.$route.params.slug,
        sellerId: this.$route.params.sellerId
      });

      this.data.seller_id = this.seller.data.seller_id;
      this.data.product_category_id = this.product.data.attributes.product_category_id;
      this.data.name = this.product.data.attributes.preserve_name;
      this.data.quantity_in_stock = this.product.data.attributes.quantity_in_stock;
      this.data.minimum_order_quantity = this.product.data.attributes.minimum_order_quantity;
      this.data.unit = this.product.data.attributes.product_unit;
      this.data.currency = this.product.data.attributes.currency;
      this.data.price = this.product.data.attributes.product_price;
      this.data.discount_percent = this.product.data.attributes.discount_percent;
      this.data.details = this.product.data.attributes.product_details;
      this.data.video = this.product.data.attributes.product_video;
    },
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
      this.imagesData.cover_image = image;
    },
    setPreviewImages(images) {
      this.imagesData.images = images;
    },
    submitForm() {
      this.clearServerErrors();
      const data = new FormData();

      for (const key in this.data) {
        if (Object.hasOwnProperty.call(this.data, key)) {
          data.append(key, this.data[key]);
        }
      }

      this.update({
        sellerId: this.$route.params.sellerId,
        productSlug: this.$route.params.slug,
        data
      });
    },
    submitImagesForm() {
      this.clearServerErrors();
      const data = new FormData();

      for (const key in this.imagesData) {
        if (Object.hasOwnProperty.call(this.imagesData, key)) {
          data.append(key, this.imagesData[key]);
        }
      }

      this.addImages({
        sellerId: this.$route.params.sellerId,
        productSlug: this.$route.params.slug,
        data
      });
    }
  }
};
</script>
