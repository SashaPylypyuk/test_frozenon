<template>
  <div style="height: 120px" class="m-3 mx-auto w-75">
    <b-form @submit.prevent="findPackges" class="mb-2 d-flex justify-content-around">
      <b-form-input v-model="localQuery" class="w-50"/>
      <b-button :disabled="isLoading" type="submit">
        <b-spinner v-if="isLoading" small></b-spinner>
        <span>
          Find package
        </span>
      </b-button>
    </b-form>
    <p v-if="alertMessage" class="w-50 mx-auto text-center alert alert-danger animated fadeOut" role="alert">{{alertMessage}}</p>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      localQuery: '',
    }
  },
  computed: mapGetters(['query', 'alertMessage', 'isLoading']),
  watch: {
    localQuery (query) {
      this.SET_QUERY(query)
    }
  },
  methods: {
    ...mapMutations(['SET_QUERY']),
    ...mapActions(['findPackage']),
    findPackges() {
      this.localQuery = '';
      this.findPackage();
    }
  }
}
</script>
