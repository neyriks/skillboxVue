<!-- eslint-disable max-len -->
<template>
    <main class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name:'cart'}">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>
        <h1 class="content__title">
          Корзина
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
          <div class="cart__field">
            <div class="cart__data">
              <v-base-form-text
                :error="formError.name"
                title="ФИО"
                placeholder="Введите ваше полное имя"
                v-model='formData.name'
              />
              <v-base-form-text
                title="Адрес доставки"
                :error="formError.address"
                placeholder="Введите ваш адрес"
                v-model='formData.address'
              />
              <v-base-form-text
                title="Телефон"
                :error="formError.phone"
                placeholder="Введите ваш телефон"
                v-model='formData.phone'
              />
              <v-base-form-text
                title="Email"
                :error="formError.email"
                placeholder="Введи ваш Email"
                v-model='formData.email'
              />
              <v-base-form-text-area
                title="Коментарий к заказу"
                :error="formError.comment"
                placeholder="Ваши пожелания"
                v-model='formData.comment' />
            </div>

            <div class="cart__options">
              <h3 class="cart__title">Доставка</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                    <span class="options__value">
                      Самовывоз <b>бесплатно</b>
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                    <span class="options__value">
                      Курьером <b>500 ₽</b>
                    </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                    <span class="options__value">
                      Картой при получении
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                      Наличными при получении
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <!-- <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="item in cartProduct" :key="item.product.id">
                <h3>{{ item.product.title }}</h3>
                <b>{{  item.product.price }} ₽
                  <span style="white-space: nowrap">количество {{ item.amount }} шт.</span></b>
                <span>Артикул: {{  item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>500 ₽</b></p>
              <p>Итого: <b>{{ totalAmountProducts }}</b> товара на сумму <b>{{ totalPrice }} ₽</b></p>
            </div>

            <button
              class="cart__button button button--primery"
              type="submit"
            >
              Оформить заказ
            </button>
            <loader
              v-if="orderSending"
              :color="loaderParam.color"
              :borderWidth="loaderParam.borderWidth"
              :duration="loaderParam.duration"
              :size="loaderParam.size"
              :background="loaderParam.background"
            >
            </loader>
          </div> -->
          <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          </div>
          <div class="cart__error form__error-block" v-if="formErrorMessage">
            <h4>Заявка не отправлена!</h4>
            <p>
              {{ formErrorMessage }}
            </p>
          </div>
        </form>
      </section>
    </main>
  </template>

<script>
import VBaseFormText from '@/components/VBaseFormText.vue';
import VBaseFormTextArea from '@/components/VBaseFormTextArea.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  components: {
    VBaseFormText,
    VBaseFormTextArea,
  },

  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.state.loading = false;
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>
