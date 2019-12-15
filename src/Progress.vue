<template>
    <div class='progress'
    :class="[
        status? 'is-${status}':'',
        `progress--${type}`]">
        <div class='progress-bar' v-if="type == 'line'">
            <div class="progress-bar_outer" :style="{height:strokeWidth+'px'}">
                <div class="progress-bar_inner" :style="barStyle">
                    <div class="progress-bar_innerText" v-if="showText && textInside">{{percentage}}%</div>
                </div>
            </div>
        </div>
        <div class="progress-circle"
            :style="{width:width+'px',height:width+'px'}"
         v-else>
            <svg viewBox="0 0 100 100">
                <path :d="trackPath"
                fill="none"  
                :stroke-width="relativeStrokeWidth" 
                stroke="#e5e9f2" /> 

                <path 
                :d="trackPath"
                fill="none"  
                :stroke-width="relativeStrokeWidth" 
                :stroke="stroke" 
                :style="circlePathStyle"
                stroke-linecap="round"/>
            </svg>
        </div>
        <div class='progress-text' v-if="showText && !textInside"  :style="{fontSize:progressTextSize+'px'}">
            <template v-if='!status'>{{ percentage }} %</template>
            <i v-else class="icon" :class="iconClass"></i>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        strokeWidth:{
            type:Number,
            default:6
        },
        percentage:{
            type:Number,
            required:true,
            default:0,
            validator:value => value>=0 && value<=100
        },
        status:{
            type:String
        },
        type:{
            type:String,
            default:'line',
            validator: val => ['circle','line'].includes(val)
        },
        textInside:{
            type:Boolean,
            default:false
        },
        showText:{
            type:Boolean,
            default:true
        },
        color:{
            type:String
        },
        width:{
            type:Number,
            default:126
        }
    },
    computed:{
        progressTextSize(){
            return 12+this.strokeWidth * 0.4;
        },
        stroke(){
            let color;
            if (this.color) {
                return this.color;
            }
            switch (this.status){
                case 'success' :color='#13ce66';break;
                case 'exception': color='#ff4949';break;
                default: color = '#20a0ff'; 
            }
            return color;
        },
        barStyle(){
            return {
                width:this.percentage+'%',
                backgroundColor:this.stroke
            }
        },
        iconClass(){
            if (this.type === 'line') {
                return this.status == 'success'
                ?'icon-circle-check':'icon-circle-close'
            } else {
                return this.status == 'success'
                ?'icon-check':'icon-close';
            }
        },
        trackPath(){
            const radius = 50 - this.relativeStrokeWidth/2;
            return `
            M 50 50  
            m 0 -${radius} 
            a ${radius} ${radius} 0 1 1 0 ${radius * 2}
            a ${radius} ${radius} 0 1 1 0 -${radius * 2}
            `;
        },
        relativeStrokeWidth(){
            return this.strokeWidth * 100 /this.width;
        },
        perimeter(){
            const radius = 50 - this.relativeStrokeWidth/2;
            return 2 * Math.PI * radius;
        },
        circlePathStyle(){
            const perimeter = this.perimeter;
            return {
                strokeDasharray:`${perimeter}px,${perimeter}px`,
                strokeDashoffset:(1 - this.percentage /100)*perimeter +'px'
            }
        }
    }
}
</script>

<style>

    .icon{
        font-family: 'icon' !important;
        font-size:16px;
        font-style: normal;
    }
    .icon-circle-check::before{
        content: '\e655';
    }
    .icon-circle-close::before{
        content: '\e6a7';
    }
    .icon-check::before{
        content: '\e6b1';
    }
    .icon-close::before{
        content: '\e615';
    }
    .progress.is-success .progress-text{
        color:'#67c23a';
    }
    .progress.is-exception .progress-text{
        color:'#f56c6c';
    }
    .progress-bar{
        display: inline-block;
        box-sizing: border-box;
        /* width: calc(100% - 50px); */
        width: 100%;
        padding-right: 50px;
        margin-right: -50px;
    }
    .progress-bar_outer{
        border-radius:100px;
        background-color: #ebeef5;
    }
    .progress-bar_inner{
        height: 100%;
        border-radius: 100px;
        transition:width .6s ease;
        background-color: red;
        text-align: right;
        line-height: 1;
    }
    .progress-bar_innerText{
        display: inline-block;
        color:#fff;
        font-size: 12px;
        margin:0 5px;
        vertical-align: middle;
    }
    .progress-text{
        display: inline-block;
        margin-left: 10px;
        color: #606266;
    }
    .progress--circle{
        display: inline-block;
        position: relative;
    }
    .progress--circle .progress-text{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;
        margin-left: 0;
    }
</style>