import  Device  from "./distiot-sdk";

let token='d703fcc1-655e-4a4f-bdb1-5fecd89b07cb'
let did=13
var device1 = new Device(token,did)
device1.SetMaster('http://localhost:8090/master')
device1.SetUser('http://localhost:8091/user')

//获取node节点
device1.GetNodeServer()

export default device1