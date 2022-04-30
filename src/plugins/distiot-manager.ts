import { useStore } from "../store/pinia";
import { DeviceManager } from "./distiot";

let store=useStore()
//全局设备管理器
var manager=new DeviceManager(store.getToken)
manager.MasterUrl = "http://localhost:8001/master"
manager.UserUrl = "http://localhost:8091/user"

export default manager