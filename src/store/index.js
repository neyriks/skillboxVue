/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1,
      amount: 1,
    }],
  },
  mutations: {
    addProductToCart(state, {
      productId,
      amount,
    }) {
      const itemProduct = state.cartProducts.find((item) => item.productId === productId);

      if (itemProduct) {
        itemProduct.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const itemProduct = state.cartProducts.find((item) => item.productId === productId);

      if (itemProduct) {
        itemProduct.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.product.price * item.amount + acc, 0);
    },
    cartTotalAmount(state) {
      return state.cartProducts.reduce((acc, item) => acc + item.amount, 0);
    },
  },
});
