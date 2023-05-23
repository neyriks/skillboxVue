<!-- eslint-disable max-len -->
<template>
    <v-base-form-field :title='title' :error='error'>
        <input class='form__input form__input--area' type="text" v-model='dataValue' name='name' :placeholder="placeholder">
    </v-base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
