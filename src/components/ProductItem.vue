<template>
<!-- eslint-disable max-len -->
  <li class="catalog__item">
    <router-link class="catalog__pic" href="#" :to='{ name: "product", params: {id: product.id} }'>
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat}} ₽
    </span>

    <!-- <ProductColors :colorfilter='colorfilter' :selected-color.sync='color'/> -->
    <ProductColors :colorfilter='product.colors' :selected-color.sync='color'/>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
// import colorfilter from '../data/colorfilter';
import ProductColors from './ProductColors.vue';

export default {
  data() {
    return {
      color: 0,
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  // computed: {
  //   colorfilter() {
  //     return colorfilter.filter((color) => this.product.colorsId.includes(color.id));
  //   },
  // },
  components: {
    ProductColors,
  },
  methods: { gotoPage },
};
</script>
