<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption,BarChart,BarSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, onMounted, ref } from 'vue';
import device1 from '../../../plugins/destiot';

onMounted(() => {
    if (props.chartType!=undefined&&props.id!=undefined) {
      getData()
    }
})

const props=defineProps({
  id:Number,
  chartType:String
})
let chartTypeid:any=computed(()=>{
  if (props.chartType=="折线图") {
    return 'line'
  }else{
    return 'bar'
  }
  
})
const simblelinechart = ref()

function getData() {
  let data:any=[]
  console.log('开始执行getData')
  let datares =device1.GetData(3)
  datares.then(res=>{
    data=res.data
  }).catch(e=>{
    console.error(e)
  })
  console.log("提取数据：",data)
}

function draw() {
    echarts.use([
        TooltipComponent,
        GridComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition,
        BarChart
    ]);

    type EChartsOption = echarts.ComposeOption<
        TooltipComponentOption | GridComponentOption | LineSeriesOption
    >;

    var myChart = echarts.init(simblelinechart.value);
    var option: EChartsOption;

    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: chartTypeid,
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
<div ref="simblelinechart" class="chart">

</div>
</template>

<style>
.chart{
  height: 500px;
  width: 100%;
}
</style>