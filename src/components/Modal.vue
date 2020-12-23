<template>
  <div>
    <b-table stacked :items="singlePack"></b-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters(['singlePack'])
}
</script>
