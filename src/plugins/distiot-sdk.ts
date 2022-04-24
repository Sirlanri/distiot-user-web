import  axios from "axios"

class Device {
    private token:string
    private id:number | undefined
    public master_server:string | undefined
    public user_server:string|undefined
    private node_server:string|undefined
    private node_port:number|undefined

    constructor(token:string){
        this.token=token
        this.master_server="http://master.distiot.ri-co.cn"
        this.user_server="http://user.distiot.ri-co.cn"
    }

    /**
     * SetDeivceID 设置设备ID
     */
    public SetDeivceID(id:number|undefined) {
        this.id=id
    }

    /**
     * SetMaster 手动设置master服务器地址
     */
    public SetMaster(url:string) {
        this.master_server=url
    }

    /**
     * SetUser 手动设置user服务器地址
     */
    public SetUser(url:string) {
        this.user_server=url
    }

    /**
     * GetNodeServer 获取node服务器信息，必须手动使用一次
     */
    public async GetNodeServer() {
        axios.get(this.master_server+'/getNode',{
            params:{
                id:this.id,
                token:this.token
            }
        }).then(res=>{
            if (res.status==200) {
                this.node_server=res.data.Addr
                this.node_port=res.data.Port
            }
        })
        return null
    }

    /**
     * UploadData TODO:可以改写成异步请求
     */
    public UploadData(data:number|string) {
        if (this.node_server==undefined) {
            console.warn("请先调用GetNodeServer进行初始化")
            return
        }
        axios.get('http://'+this.node_server+':'+this.node_port+'/node/dataWriteSingle',{
            params:{
                did:this.id,
                token:this.token,
                data:data
            }
        }).then(res=>{
            if (res.status==200) {
                console.log("数据上传成功")
            }
        }).catch(res=>{
            console.error("数据上传失败 ",res)
        })
    }

    /**
     * GetData 从当前node节点获取小时内的数据，传入小时数
     */
    public async GetData(hour:number|undefined) { 
        if (this.node_server==undefined) {
            await this.GetNodeServer()
        }       
        return await  axios.get('http://'+this.node_server+':'+this.node_port+'/node/dataReadHour',{
            params:{
                did:this.id,
                hours:hour,
                token:this.token
            }
        })
    }

    /**
     * GetDataReq
     */
    public GetDataReq(hour:number) {
        return axios.get(this.node_server+':'+this.node_port,{
            params:{
                did:this.id,
                hours:hour,
                token:this.token
            }
        })
    }
}

export default 
    Device
