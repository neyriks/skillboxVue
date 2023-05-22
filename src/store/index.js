/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';

import { API_BASE_URL } from '@/config';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],
    loading: Boolean,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const itemProduct = state.cartProducts.find((item) => item.productId === productId);

      if (itemProduct) {
        itemProduct.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      state.cartProductsData = items;
    },
    // Приведение к общим данным
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.product.price * item.amount + acc, 0);
    },
    cartTotalAmount(state) {
      return state.cartProducts.reduce((acc, item) => acc + item.amount, 0);
    },
  },

  actions: {
    loadCart(context) {
      this.state.loading = true;
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        this.state.loading = false;
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }

        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartProducts');
      });
    },

    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartProducts');
      });
    },

    deleteProductFromCart(context, productId) {
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: { productId },
      }, {
      }).then((response) => {
        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartProducts');
      });
    },

    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateCartProductData', response.data.items);
      })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
