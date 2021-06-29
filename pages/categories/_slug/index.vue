<template>
  <div>
    <title-bar page-title="View Category" back />
    <div v-if="categoriesBusy" class="p-4">
      <spinner color="secondary" class="mx-auto" />
    </div>
    <div v-else>
      <div v-if="category && category.data">
        <header class="bg-white shadow-md">
          <div class="container mx-auto py-4 px-4 md:px-8">
            <p class="text-2xl font-semibold">
              {{ category.data.attributes.name }}
            </p>
          </div>
        </header>
        <div class="container mx-auto py-4 px-4 md:px-8">
          <div v-if="subCategoriesBusy" class="p-4">
            <spinner color="secondary" class="mx-auto" />
          </div>
          <div v-else>
            <div v-if="subCategories && subCategories.length > 0">
              <div class="mb-4 flex items-center justify-end">
                <nuxt-link
                  :to="`/categories/${categorySlug}/sub-category/new`"
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
                        Products
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y">
                    <tr
                      v-for="(subCategory, index) in subCategories"
                      :key="index"
                    >
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="mr-2 h-10 w-10 rounded overflow-hidden">
                            <img
                              :src="
                                subCategory.data.attributes.subCategoryImage
                                  .data.attributes.path
                              "
                              :alt="subCategory.data.attributes.name"
                              class="h-full w-full object-cover"
                            />
                          </div>
                          <p>{{ subCategory.data.attributes.name }}</p>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p>
                          {{
                            subCategory.data.attributes.productDetails.data
                              .length
                          }}
                        </p>
                      </td>
                      <td
                        class="px-6 py-4 text-sm whitespace-nowrap text-right"
                      >
                        <nuxt-link
                          :to="`/categories/${categorySlug}/sub-category/${subCategory.data.attributes.slug}`"
                          class="ml-2 inline-block text-green-500 hover:text-green-600 focus:text-green-600 focus:outline-none"
                        >
                          View
                        </nuxt-link>
                        <nuxt-link
                          :to="`/categories/${categorySlug}/sub-category/${subCategory.data.attributes.slug}/edit`"
                          class="ml-2 inline-block text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                        >
                          Edit
                        </nuxt-link>
                        <button
                          class="ml-2 inline-block focus:outline-none"
                          :class="{
                            'text-red-500 hover:text-red-600 focus:text-red-600': !subCategoriesBusy,
                            'text-gray-500 pointer-events-none': subCategoriesBusy
                          }"
                          :disabled="subCategoriesBusy"
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
                <div class="mb-2 mx-auto h-24 w-24 text-gray-300">
                  <category-icon />
                </div>
                <p class="text-center font-poppins text-2xl font-semibold">
                  No sub categories yet.
                </p>
              </div>
              <nuxt-link
                :to="`/categories/${categorySlug}/sub-category/new`"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import CategoryIcon from '@/components/Icons/CategoryIcon.vue';
import Spinner from '@/components/Widgets/Spinner.vue';
import AddIcon from '@/components/Icons/AddIcon.vue';

export default {
  components: { TitleBar, CategoryIcon, Spinner, AddIcon },
  data() {
    return {
      categorySlug: this.$route.params.slug
    };
  },
  computed: {
    ...mapGetters({
      category: 'categories/category',
      subCategories: 'subCategories/subCategories',
      categoriesBusy: 'categories/busy',
      subCategoriesBusy: 'subCategories/busy'
    })
  },
  created() {
    this.getCategory(this.$route.params.slug).then(() =>
      this.getSubCategories({
        categorySlug: this.categorySlug,
        refresh: true
      })
    );
  },
  methods: {
    ...mapActions({
      getCategory: 'categories/view',
      getSubCategories: 'subCategories/get'
    })
  }
};
</script>
