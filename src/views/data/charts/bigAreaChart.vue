<script setup lang="ts" >
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, reactive, ref, watch } from 'vue';
import { Device } from '../../../plugins/distiot';
import manager from '../../../plugins/distiot-manager';

let props = defineProps({
  id: Number,
  hour: Number,
})

let bigareachartdom = ref()


//监听，点击按钮重新生成
watch(props, (newprops, oldprops) => {
  getData()
})

/* 数据获取相关 */

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
  let dev2:Device
  manager.NewDevice(props.id!).then(device => {
    console.log(device)
    dev2=device
    dev2.GetDataByHours(props.hour!).then(res => {
      resData.splice(0)
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

/* 大数据Echarts相关 */

function draw() {
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
  ]);

  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DataZoomComponentOption
    | LineSeriesOption
  >;

  var myChart = echarts.init(bigareachartdom.value);
  var option: EChartsOption;

  option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '大数据可视化图',
      subtext:'可用滚轮和左键进行拖拽缩放功能'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: comTime.value
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: comData.value
      }
    ]
  };

  myChart.setOption(option);
}
</script>

<template>
  <div ref="bigareachartdom" class="chart">

  </div>
</template>