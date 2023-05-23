<!-- eslint-disable max-len -->
<template>
    <v-base-form-field :title='title' :error='error'>
        <textarea class="form__input" v-model="dataValue" :type='type' :placeholder="placeholder"></textarea>
    </v-base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
