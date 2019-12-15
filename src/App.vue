<template>
    <!-- <div>i am a cmp {{ msg }}</div> -->
    <div>
        <d-progress :percentage="65" />
        <d-progress :percentage="70"  :text-inside="true" :stroke-width="18"/>
        <d-progress :percentage="50" :show-text="false" :stroke-width="18"/>
        <h4>环形进度条</h4>
        <d-progress :percentage="50" type="circle"  :stroke-width="6"/>
    </div>
</template>

<script>
import DProgress from './Progress';
export default {
    components:{
        DProgress
    },
    data(){
        return {
            msg: "hello world"
        }
    }
}
</script>

<style>
   
</style>