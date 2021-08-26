<template>

<!-- eslint-disable max-len -->
<section class="catalog">
  <ProductList :products='products'/>
  <VPagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
</section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import VPagination from './components/VPagination.vue';

export default {
  name: 'App',
  components: { ProductList, VPagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
