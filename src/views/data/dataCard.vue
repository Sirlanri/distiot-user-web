<script setup lang="ts">
import { computed, ref } from 'vue';
import http from '../../plugins/axios';
import { useStore } from '../../store/pinia';
import SimpleLineChart from './charts/simpleLineChart.vue';

const props=defineProps({
  cardid:Number,
})
const store = useStore()
const cardid=props.cardid

let selID=ref(13)
let chartType=['折线图','柱状图']
let selType=ref('折线图')
let ids:any=store.deviceIDS
let chartOpen=ref(true)

function render() {
  chartOpen.value=true
}
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
        <v-col md="4">
          <v-select v-model="selType" :items="chartType" label="图表类型"
          ></v-select>
        </v-col>
        <v-col>
          <v-btn size="large" color="blue" variant="outlined" @click="render">
            生成
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <simple-line-chart v-if="chartOpen" :id="selID" :chart-type="selType"
    ></simple-line-chart>
  </v-card>
</template>