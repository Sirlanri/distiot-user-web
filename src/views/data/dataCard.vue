<script setup lang="ts">
import { computed, ref } from 'vue';
import http from '../../plugins/axios';
import { useStore } from '../../store/pinia';

const props=defineProps({
  cardid:Number,
})
const store = useStore()
const cardid=props.cardid

let selID=ref(0)
let ids=store.deviceIDS

</script>
<template>
  <v-card>
    <v-card-title>
      卡片ID：{{cardid}}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="4">
          <v-select v-model="selID" :items="ids"
             label="选择设备ID"
            ></v-select>
          
        </v-col>
      </v-row>
    </v-card-text>
    
  </v-card>
</template>