<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '../../plugins/axios';

let addDeviceWin=ref(false)
let deviceName=ref('')
let deviceType=ref(0)
let infoWin = ref(false)
let info = ref('')

let deviceTypeList=[
  {
    label:'整型 int',
    value:1
  },
  {
    label:'浮点型 float',
    value:2
  },
  {
    label:'字符串 string',
    value:3
  }
]
let devices=ref(Array<any>())

onMounted(()=>{
  getAllDevices()
})

function submitDevice() {
  http.get('/createdevice',{
    params:{
      dname:deviceName.value,
      dataType:deviceType.value
    }
  }).then(res=>{
    console.log(res)
    if(res.status===200){
      info.value='设备创建成功'
      addDeviceWin.value=false
      infoWin.value=true
  }}).catch(err=>{
    addDeviceWin.value=false
    info.value='设备创建失败'+err.message
    infoWin.value=true
  })
}

function getAllDevices() {
  http.get('/getdevices').then(res=>{
    console.log(res)
    if(res.status===200){
      devices.value=res.data
    }
  }).catch(err=>{
    console.log(err)
  })
}
</script>

<template>
  <v-card>
    <v-card-title>
      设备管理
    </v-card-title>
    <v-card-text>
      <v-btn color="primary" size="large" @click="addDeviceWin=true">
        添加设备
      </v-btn>
      <v-btn size="large" class="refresh-btn" @click="getAllDevices">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-table>
        <thead>
          <tr>
            <th>设备ID</th>
            <th>设备名称</th>
            <th>数据类型</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in devices">
            <td>{{item.Did}}</td>
            <td>{{item.Dname}}</td>
            <td>
              <span v-if="item.Datatype==1">
                int 整型
              </span>
              <span v-if="item.Datatype==2">
                float 浮点型
              </span>
              <span v-if="item.Datatype==3">
                string 字符串型
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <div>
    <v-dialog
      v-model="addDeviceWin"
    >
      <v-card width="800">
        <v-card-title>
          完善设备详细信息
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="deviceName"
            label="设备名称"
            :rules="[v => !!v || '请输入设备名称']"
          ></v-text-field>
          选择该设备的数据类型
          <v-radio-group v-model="deviceType" >
            <v-radio
              v-for="item in deviceTypeList"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" size="large" @click="addDeviceWin = false">取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" size="large" @click="submitDevice">创建设备</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-snackbar v-model="infoWin">
      {{ info }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="infoWin = false">
          知道了
        </v-btn>
      </template>
    </v-snackbar>
</template>

<style>
.refresh-btn{
  margin-left: 3rem;
}
</style>