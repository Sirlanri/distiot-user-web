import { useStore } from "../store/pinia";
import { DeviceManager } from "./distiot";

let store=useStore()
//全局设备管理器
var manager=new DeviceManager(store.getToken)

export default manager