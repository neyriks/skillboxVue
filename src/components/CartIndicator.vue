<template>
<!-- eslint-disable max-len -->
<div>
  <span v-if='this.$store.state.cartProducts.length == 0'>
    <v-spinner></v-spinner>
  </span>
  <router-link v-else class="header__cart" aria-label="Корзина с товарами" :to='{ name: "cart"}'>
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ totalAmount }}</span>
  </router-link>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VSpinner from '@/components/VSpinner.vue';

export default {
  components: { VSpinner },
  computed: {
    ...mapGetters({ totalAmount: 'cartTotalAmount' }),
  },
};
</script>

<style scoped>
  .loader,
  .loader::after {
    width: 1em;
    height: 1em;
  }
</style>
