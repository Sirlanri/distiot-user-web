import  Device  from "./distiot-sdk";

let token='d703fcc1-655e-4a4f-bdb1-5fecd89b07cb'
var device1 = new Device(token)
device1.SetMaster('http://localhost:8090/master')
device1.SetUser('http://localhost:8091/user')


export default device1