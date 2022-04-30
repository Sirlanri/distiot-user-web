<script setup lang="ts">import { reactive, ref, watch } from 'vue';
import { Device } from '../../../plugins/distiot';
import manager from '../../../plugins/distiot-manager';


const props = defineProps({
  id: Number,
  hour: Number,
})

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

async function getData() {
  if (props.id == undefined||props.hour==undefined) {
    return
  }
  let dev1:Device
  manager.NewDevice(props.id!).then(device => {
    console.log(device)
    dev1=device
    dev1.GetDataByHours(props.hour!).then(res => {
      for (let i = 0; i < res.data.length ; i++) {
        resData.push(res.data[i])
        
      }
      
    })
  })
}

</script>

<template>
<v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          时间
        </th>
        <th class="text-left">
          数据
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in resData"
        :key="item.time"
      >
        <td>{{ item.time }}</td>
        <td>{{ item.data }}</td>
      </tr>
    </tbody>
  </v-table>
</template>