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
    public NewDevice(did:number) {
        //创建设备对象
        var device=new Device(did, this.token)
        let res = this.getNode(did)
    }

    private async getNode(did:number){
        axios.get(this.MasterUrl+'/getNode',{
            params:{
                token:this.token,
                id:did
            }
        }).then(res=>{
            if (res.status==200) {
                return res.data.Addr,res.data.Port
            }
        })
    }
} 

class Device {
    ID:number //设备ID
    protected token:string //用户ID
    NodeAddr :string //节点服务器地址，只包含IP，不包含头部http和端口
    NodePort:number //节点服务器端口

    constructor(id:number,token:string){
        this.token=token
        this.ID=id
    }

    
}

export default {Device,DeviceManager}
