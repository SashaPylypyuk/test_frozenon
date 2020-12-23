<template>
  <div>
    <b-table @row-clicked="rowClicked" class="w-75 mx-auto table" striped hover  :items="packages"></b-table>
    <div v-if="totalPages > 1" class="w-50 mx-auto d-flex justify-content-center">
      <b-button class="mr-2" v-for="page of totalPages" :key="page" :value="page" @click="buttonClicked">
        {{ page }}
      </b-button>
    </div>
    <b-modal ref="vuemodal" size="xl" id="modal">
      <Modal />
      <template #modal-footer>
        <p>
        </p>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from './Modal';
export default {
  name: 'Body',
  components: {
    Modal,
  },
  computed: mapGetters(['packages', 'totalPages']),
  methods: {
    ...mapActions(['setPack', 'setNewPage']),
    rowClicked (record, index) {
      this.$bvModal.show('modal')

      this.setPack(index)
    },
    buttonClicked (e) {
      this.setNewPage(e.target.value)
    }
  }
}
</script>
<style>
.table {
  cursor: pointer;
}
</style>
