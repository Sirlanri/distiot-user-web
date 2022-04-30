<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, reactive, ref, watch } from 'vue';
import { Device } from "../../../plugins/distiot";
import manager from '../../../plugins/distiot-manager';

const props = defineProps({
  id: Number,
  chartType: String,
  hour: Number,
  render: Boolean
})


let simblelinechartdom = ref()

//单列数据结构
interface singleData{
    time:string,
    data:any
}
//获取数据
let resData:Array<singleData> = reactive([])

//监听，点击按钮重新生成
watch(props, (newprops, oldprops) => {
  getData()
})

//ε=(´ο｀*)))唉 这他喵的就是屎山啊！！！！写的什么垃圾
async function getData() {
  if (props.id == undefined||props.hour==undefined) {
    return
  }
  let dev2:Device
  manager.NewDevice(props.id!).then(device => {
    console.log(device)
    dev2=device
    dev2.GetDataByHours(props.hour!).then(res => {
      for (let i = res.data.length -1; i>0  ; i--){
        resData.push(res.data[i])
      }
      draw()
    })
  })
}

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
  echarts.use([
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,


  ]);

  type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GridComponentOption | LineSeriesOption
  >;

  var myChart = echarts.init(simblelinechartdom.value);
  var option: EChartsOption;

  option = {
    xAxis: {
      type: 'category',
      data: comTime.value
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: comData.value,
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  };

  myChart.setOption(option);
}

</script>

<template>
  <div ref="simblelinechartdom" class="chart">

  </div>
</template>

<style>
.chart {
  height: 500px;
  width: 100%;
}
</style>