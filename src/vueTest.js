const data = {
    obj:{
        a:1,b:10
    },
    arr:[1,2,3]
}

function defineReactive(data,attr,value){
    observer(value);
    Object.defineProperty(data,attr,{
        get(){
            return value;
        },
        set(newValue){
            if (newValue === value) {
                return;
            }
            value = newValue;
            render()
        }
    })
}


function observer(data){
    if (Array.isArray(data)) {
        return;
    }
    if (typeof data === 'object') {
        for(let key in data){
            defineReactive(data,key,data[key]);
        }
    }
}

function render(){
    console.log("渲染")
}

const oldPush = Array.prototype.push;
Array.prototype.push = function(){
    oldPush.call(this,...arguments);
    render();
}
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
["slice","reverse","pop","sort","push","splice"].forEach(method => {
    arrayMethods[method] = function(){
        arrayProto[method].call(this,...arguments);
        render();
    }
})

function $set(data,key,value){
    if (Array.isArray(data)) {
        data.splice();
        return;
    }
    defineReactive(data,key,value);
    render();
    return value;
}

observer(data);

// data.obj = 90;
// data.obj = 190;
// data.arr = 80;

$set(data.obj,'a',100);