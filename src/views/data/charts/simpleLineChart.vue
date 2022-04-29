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
import { computed, onMounted, ref, watch } from 'vue';
import { DeviceManager } from "../../../plugins/distiot";
import { useStore } from '../../../store/pinia';

onMounted(() => {

})

const store = useStore()
const props = defineProps({
  id: Number,
  chartType: String,
  hour: Number,
  render: Boolean
})


let simblelinechartdom = ref()

//获取数据
let resData = ref([])

//监听，点击按钮重新生成
watch(props, (newprops, oldprops) => {
  getData()
})

//ε=(´ο｀*)))唉 这他喵的就是屎山啊！！！！写的什么垃圾
async function getData() {
  if (props.id == undefined||props.hour==undefined) {
    return
  }
  let man = new DeviceManager(store.getToken)
  //手动设置master和user服务器，用于本地测试，正式上线后不需要设置
  man.MasterUrl = "http://192.168.1.150:8001/master"
  man.UserUrl = "http://192.168.1.150:8091/user"
  let dev1 = man.NewDevice(props.id!)
  dev1.then(device => {
    console.log(device)
    device.GetDataByHours(props.hour!).then(res => {
      resData.value = res.data
      draw()
    })
  })
}

let comTime = computed(() => {
  let timeData: string[] = []
  resData.value.forEach((e: { time: string; }) => {
    timeData.push(e.time)
  });
  return timeData
})

let comData = computed(() => {
  let data: number[] = []
  resData.value.forEach((e: { data: number }) => {
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