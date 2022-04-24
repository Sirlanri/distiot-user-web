import  axios from "axios"

class DeviceManager{
    protected token:string // 用户token
    MasterUrl:string // master服务器完整地址
    UserUrl:string  // user服务器完整地址

    constructor(token:string){
        this.token=token
        //设置默认的master user 节点
        this.MasterUrl="http://master.distiot.ri-co.cn"
        this.UserUrl="http://user.distiot.ri-co.cn"
    }

    /**
     * NewDevice 创建一个新设备，需要传入设备的ID
     */
    public async NewDevice(did:number) {
        //创建设备对象
        var device=new Device(did, this.token)

        await this.getNode(did).then((res:any)=>{
            console.log('await结果：',res)
            if (res.status==200) {
                device.NodeAddr=res.data.Addr
                device.NodePort=res.data.Port
            }
        }).catch(res=>{
            console.log('出错！',res)
        })
        return device
        
    }

    //获取设备的node节点信息
    private getNode(did:number){
        return axios.get(this.MasterUrl+'/getNode',{
            params:{
                token:this.token,
                id:did
            }
        })
    }
} 

class Device {
    ID:number //设备ID
    protected token:string //用户ID
    NodeAddr :string = "" //节点服务器地址，只包含IP，不包含头部http和端口
    NodePort:number =0//节点服务器端口

    constructor(id:number,token:string){
        this.token=token
        this.ID=id
    }

    //上传数据，传入string格式的数据
    UploadDataHttp(data:string){
        let url="http://".concat(this.NodeAddr,":",this.NodePort.toString(),"/node/dataWriteSingle")
        axios.get(url,{
            params:{
                token:this.token,
                did:this.ID,
                data:data
            }
        }).then(res=>{
            if (res.status==200) {
                console.log('数据上传成功')
            }
        }).catch(res=>{
            console.error(res.data)
        })
    }

    //获取数据，传入小时数
    GetDataByHours(hours:number) {
        let url="http://".concat(this.NodeAddr,":",this.NodePort.toString(),"/node/dataReadHour")
        return axios.get(url,{
            params:{
                did:this.ID,
                token:this.token,
                hours:hours
            }
        })

    }
    
}

export {Device,DeviceManager}
