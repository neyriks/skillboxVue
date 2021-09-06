<template>
<!-- eslint-disable max-len -->
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="$emit('gotoPage', 'product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ProductColors :colorfilter='colorfilter' :selected-color.sync='color'/>
  </li>
</template>

<script>
import colorfilter from '../data/colorfilter';
import ProductColors from './ProductColors.vue';

export default {
  data() {
    return {
      color: 0,
    };
  },
  props: ['product'],
  computed: {
    colorfilter() {
      return colorfilter.filter((color) => this.product.colorsId.includes(color.colorId));
    },
  },
  components: {
    ProductColors,
  },
};
</script>
