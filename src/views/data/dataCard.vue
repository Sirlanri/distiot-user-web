<script setup lang="ts">
import { number } from 'echarts/core';
import { computed, ref } from 'vue';
import { useStore } from '../../store/pinia';
import SimpleLineChart from './charts/simpleLineChart.vue';

const props=defineProps({
  cardid:Number,//卡片ID
  dataType:Number//数据可视化类型
})

//初始化store
const store = useStore()
const cardid=props.cardid
let selID=ref(undefined)
let selHours=ref(24)
let chartOpen=ref(false)

//deviceID列表
let comDeviceids:any=computed(()=>{
  return store.deviceIDS
})
</script>
<template>
  <v-card>
    <v-card-title>
      卡片ID：{{cardid}}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="3">
          <v-select 
            v-model="selID" 
            :items="comDeviceids"
             label="选择设备ID"
            ></v-select>
        </v-col>
        
        <v-col md="3">
          <v-text-field 
            label="查询过去几小时的数据？" 
            variant="outlined"
            v-model="selHours" 
            type="number"
          ></v-text-field>
        </v-col>
        
      </v-row>
    </v-card-text>
    <simple-line-chart 
      :render="chartOpen" 
      :id="selID"  
      :hour="selHours"
    ></simple-line-chart>
  </v-card>
</template>