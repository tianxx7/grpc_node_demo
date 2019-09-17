var PROTO_PATH = "D:\\project\\Front-end project\\grpc_demo\\proto\\Student.proto";
var grpc = require("grpc");
var grpcService = grpc.load(PROTO_PATH).txx.proto;

//创建客户端
var client = new grpcService.StudentService("localhost:8899",grpc.credentials.createInsecure());
//node是异步的框架,发出请求
client.getRealNameByUserName({username:"我是谁"},function(error,respData){
    console.log(respData);
})


