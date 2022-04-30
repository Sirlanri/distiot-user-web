<script setup lang="ts">
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, reactive, ref, watch } from 'vue';
import { Device } from '../../../plugins/distiot';
import manager from '../../../plugins/distiot-manager';

let props = defineProps({
  id: Number,
  chartType: String,
  hour: Number,
  render: Boolean
})

let simblebarchartdom = ref()

//监听 设备ID或小时变化都会刷新数据
watch(props, (newprops, oldprops) => {
  getData()
})

/* 数据处理 */

//单列数据结构
interface singleData{
    time:string,
    data:any
}
//获取数据
let resData:Array<singleData> = reactive([])

async function getData() {
  if (props.id == undefined||props.hour==undefined) {
    return
  }
  manager.NewDevice(props.id!).then(device => {
    console.log(device)
    device.GetDataByHours(props.hour!).then(res => {
      for (let i = res.data.length -1; i>0  ; i--){
        resData.push(res.data[i])
      }
      draw()
    })
  })
}

//数据computed处理函数 得XY轴数据
let comTime = computed(() => {
  let timeData: string[] = []
  resData.forEach((e: { time: string; }) => {
    timeData.push(e.time)
  });
  return timeData
})
let comData = computed(() => {
  let data: number[] = []
  resData.forEach((e: { data: number }) => {
    data.push(e.data)
  })
  return data
})


function draw() {
  echarts.use([GridComponent, BarChart, CanvasRenderer]);
  type EChartsOption = echarts.ComposeOption<
    GridComponentOption | BarSeriesOption
  >;
  let myChart = echarts.init(simblebarchartdom.value);
  let option: EChartsOption;

  option = {
    xAxis: {
      type: 'category',
      data: comTime.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: comData.value,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ],
    tooltip: {
      trigger: 'axis'
    }
  };
  myChart.setOption(option);
}
</script>

<template>
  <div ref="simblebarchartdom" class="chart">

  </div>
</template>