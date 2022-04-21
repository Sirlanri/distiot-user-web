<script setup lang="ts">import { onMounted, reactive, ref } from 'vue';
import { useStore } from '../../store/pinia';
import DataCard from './dataCard.vue';

var devices = reactive(Array<any>())
let idcount=ref(Number(1))

function addTable() {
  var temp={
    id : idcount,
  }
  devices.push(temp)
  idcount.value++
}

onMounted(()=>{
  let store = useStore()
  store.getDeviceIDs()
  store.getDevices()
})

</script>

<template>
  <v-card>
    <v-card-text>
      <v-btn color="primary" @click="addTable">
        新增表格
      </v-btn>
    </v-card-text>
  </v-card>

  <DataCard  v-for="d in devices" 
  :cardid="d.id" class="data-card">
  </DataCard>

</template>
<style>
.data-card{
  margin-top: 1rem;
}
</style>