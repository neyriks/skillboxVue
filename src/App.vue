<template>

<!-- eslint-disable max-len -->
 <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync='filterPriceFrom' :price-to.sync='filterPriceTo' :category-id.sync='filterCategoryId' :color-id.sync="filterColor"/>
      <section class="catalog">
        <ProductList :products='products'/>
        <VPagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>

    </div>
  </main>

</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import VPagination from './components/VPagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: {
    ProductList, VPagination, ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price >= this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price <= this.filterPriceTo);
      }
      if (this.filterCategoryId > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.caregoryId === this.filterCategoryId);
      }
      if (this.filterColor) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.colorsId.includes(this.filterColor));
      }

      return filteredProducts;
    },
  },
};
</script>
