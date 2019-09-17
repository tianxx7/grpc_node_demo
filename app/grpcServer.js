var PROTO_PATH = "D:\project\Front-end project\grpc_demo\proto\Student.proto";
var grpc = require("grpc");
var grpcService = grpc.load(PROTO_PATH).txx.proto;

var server = new grpc.Server();
server.addService(grpcService.StudentService.service,{
    getRealNameByUserName:getRealNameByUserName,
    getStudentsByAge:getStudentsByAge,
    getStudnetsWrapperByAges:getStudnetsWrapperByAges,
    biTalk:biTalk
})
server.bind("localhost:8899",grpc.ServerCredentials.createInsecure());
server.start();

function getRealNameByUserName(call,callback){
    console.log("calll:" + call);
    callback(null,{realname:"阿童木"})
}
function getStudentsByAge(){}

function getStudnetsWrapperByAges() {}

function biTalk(){}