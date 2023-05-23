import VBaseFormField from '@/components/VBaseFormField.vue';

export default {
  components: { VBaseFormField },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
