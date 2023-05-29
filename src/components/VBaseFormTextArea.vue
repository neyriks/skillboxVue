<!-- eslint-disable max-len -->
<template>
    <v-base-form-field :title='title' :error='error'>
      <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
    </v-base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
