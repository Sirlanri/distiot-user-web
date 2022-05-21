import * as mqtt from 'mqtt/dist/mqtt.min'

class MQClient{
    BrokerURL="ws://mqtt.ri-co.cn:8083/mqtt"
    Client:mqtt.MqttClient //MQTT客户端
    constructor(){
        let option={
            keepAlive:60,
            ClientId: 'distiot_ts_' + Math.random().toString(16).slice(-10),
            connectTimeout: 4000
        }
        this.Client=mqtt.connect(this.BrokerURL,option)
    }

    //发布消息@topic主题  @message发布内容
    publish(topic:string,message:string) {
        /* if (!this.Client.connected) {
          console.log('客户端未连接')
          return
        } */
        this.Client.publish(topic,message,{qos: 2},(err:any) => {
          if(!err) {
            console.log('主题为'+topic+ "发布成功")
          }
        })
    }

    //监听服务器是否连接失败
    mqttError() {
        this.Client.on('error',(error:any) => {
            console.log('连接失败：',error)
            this.Client.end()
        })
    }
    //取消订阅
    unsubscribe(topic:string) {
        this.Client.unsubscribe(topic, (error:any)=> {
            console.log('主题为'+ topic+'取消订阅成功',error)
        })
    }
    //断开连接
    unconnect() {
        this.Client.end()
        console.log('服务器已断开连接！')
    }
    //监听服务器重新连接
    reconnect() {
        this.Client.on('reconnect', (error:any) => {
            console.log('正在重连:', error)
        });
    }
}

export {MQClient}