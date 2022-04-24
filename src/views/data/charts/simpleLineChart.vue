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
import { computed, onMounted, ref } from 'vue';
import { DeviceManager,Device } from "../../../plugins/distiot";

onMounted(() => {
  getData()
  
})

const props=defineProps({
  id:Number,
  chartType:String,
  hour:Number
})


let simblelinechartdom = ref()

//获取数据
let resData=ref([])

async function getData() {
  let man=new DeviceManager("d703fcc1-655e-4a4f-bdb1-5fecd89b07cb")
  //手动设置master和user服务器，用于本地测试，正式上线后不需要设置
  man.MasterUrl="http://localhost:8090/master"
  man.UserUrl="http://localhost:8091/user"
  man.NewDevice(14).then(device=>{
    console.log(device)
    device.GetDataByHours(60).then(res=>{
      resData.value=res.data
      draw()
    })
  })

  
}

let comTime=computed(()=>{
  let timeData: string[]=[]
  resData.value.forEach((e: { time: string; }) => {
    timeData.push(e.time)
  });
  return timeData
})

let comData=computed(()=>{
  let data:number[]=[]
  resData.value.forEach((e:{data:number})=>{
    data.push(e.data)
  })
  return data
})

function draw() {
  console.log("绘制",comData.value)
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
                data:comData.value,
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
.chart{
  height: 500px;
  width: 100%;
}
</style>