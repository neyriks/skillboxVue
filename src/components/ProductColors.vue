<template>
<!-- eslint-disable max-len -->
<div>
  <ul class="colors">
    <li class="colors__item" v-for="color in colorfilter" :key="color.colorId">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :value="color.colorId" checked="" v-model="currentColor">
        <span class="colors__value" :style="{'background-color': color.colorName}">
        </span>
      </label>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['colorfilter', 'selectedColor'],
  computed: {
    currentColor: {
      get() {
        return this.selectedColor;
      },
      set(value) {
        this.$emit('update:selectedColor', value);
      },
    },
  },
};
</script>
