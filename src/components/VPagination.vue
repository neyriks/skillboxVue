<template>

<!-- eslint-disable max-len -->
  <ul class="catalog__pagination pagination">
  <li class="pagination__item">
    <a class="pagination__link pagination__link--arrow " :class="{ 'pagination__link--disabled': page <= 1 }" aria-label="Предыдущая страница" href="#" @click.prevent="prevPage">
      <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
    </a>
  </li>
  <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
    <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber == page }" @click.prevent="paginate(pageNumber)">
      {{ pageNumber }}
    </a>
  </li>
  <li class="pagination__item">
    <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" :class="{ 'pagination__link--disabled': page > pages - 1 }" @click.prevent="nextPage">
      <svg width="8" height="14" fill="currentColor">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
</ul>
</template>

<script>
export default {
  props: ['page', 'count', 'perPage'],
  model: {
    prop: 'page',
    event: 'paginate',
  },

  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    nextPage() {
      this.$emit('paginate', this.page + 1);
    },
    prevPage() {
      this.$emit('paginate', this.page - 1);
    },
  },
};
</script>
