<template>
    <!-- <div>i am a cmp {{ msg }}</div> -->
    <div>
        <d-progress :percentage="65" />
        <d-progress :percentage="70"  :text-inside="true" :stroke-width="18"/>
        <d-progress :percentage="50" :show-text="false" :stroke-width="18"/>
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