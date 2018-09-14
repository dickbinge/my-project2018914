<template>
    <div class="el-addup">
        <div class="el-header">
            <span style="margin:10px;float:left;">时间范围</span>
             <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                style="margin:auto 2px;float:left;"
                :picker-options="pickerOptions1">
            </el-date-picker>
            <div style="float:left;margin-left:10px;">
                <el-radio-group v-model="checkValue" size="mini" border="true" style="margin-top:8px;">
                    <el-radio-button label="最近一个月" style="margin-left:10px;"></el-radio-button>
                    <el-radio-button label="最近三个月" style="margin-left:10px;"></el-radio-button>
                    <el-radio-button label="最近六个月" style="margin-left:10px;"></el-radio-button>
                </el-radio-group>
            </div>
            <hr class="el-header-hr">
            <div style="margin:10px;position:relative;height: 20px;">
                <div class="err-num">
                    <span>异常设备数</span>
                    <span>105</span>
                </div>
                <div class="err-num">
                    <span>断线设备数</span>
                    <span>30</span>
                </div>
                <div class="err-num">
                    <span>正常设备数</span>
                    <span>100</span>
                </div>
            </div>
        </div>
        <!-- <div class="content" style="width:100%;">
            <div id="cir-panel" style="width:200px;height:200px;"></div>
        </div> -->
        <el-row class="el-row-errnum">
            <el-col :span="14" style="height:100%">
                <div class="side-left-echarts">
                    <div style="width:auto;position:relative;float:left;">
                         <div id="cir-panel" style="width:200px;height:250px;"></div>
                    </div>
                    <div style="width:60%;position:relative;float:left;">
                        <div style="width:600px;height:270px;" id="line-panel"></div>
                    </div>
                    
                </div>
    
            </el-col>
            <el-col :span="10">
                <div class="side-right-echarts">
                    <div class="bar-panel" id="barPanel" style="width:500px;height:280px;"></div>
                </div>
            </el-col>
        </el-row>
        <el-row class="el-row-errlevel">
            <el-col :span="4">
                <div class="errlevel-holder">
                    <div class="holder" v-for="(item,index) in holder" :key="index">
                        <span>{{holder[index].name}}</span>
                        <span>{{holder[index].data}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">

            </el-col>
            <el-col :span="6">

            </el-col>
            <el-col :span="6">

            </el-col>
        </el-row>
        <el-row class="el-row-ranking">
            
        </el-row>
        <el-row class="el-row-deviceInfo">
            
        </el-row>
    </div>
</template>

<script>
import util from '../../assets/js/utils.js'
export default {
    
    name: "AddUp",
    data(){
        return {
            dataTypes:[
                {
                   typeName:"最近一个月"
                } ,
                {
                   typeName:"最近三个月"
                },
                {
                  typeName:"最近六个月"
                }
            ],
            checkValue: "最近一个月",
            pickerOptions1:'',
            value2:'',
            holder:[
                {
                    "name":"严重",
                    "data":15,
                    "imgUrl":""
                },
                 {
                    "name":"警告",
                    "data":15,
                    "imgUrl":""
                },
                 {
                    "name":"提示",
                    "data":15,
                    "imgUrl":""
                }
            ]
        }
    },
    methods:{
        drawPie(){
            let cirPanel=document.getElementById("cir-panel");
            let pie=this.$echarts.init(cirPanel);
            let option={
                title: {
                    text: '异常类型分布',
                    fontSize:'13px'
                },
                tooltip:{
                    trigger:'item',
                    formatter:'{a} <br/>{b}: {c} ({d}%)'
                },
                legend:{
                    x : 'center',
                    y : 'bottom',
                    data:['外设','软件','主机']
                },
                color:['#5B6AE7', '#4092F0','#C2C6E3'],
                series:[
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'外设'},
                            {value:310, name:'软件'},
                            {value:234, name:'主机'}
                        ]
                    }
                ]
            };
            pie.setOption(option);
        },
        drawLine(){
            var linecharts=document.getElementById("line-panel");
            var line=this.$echarts.init(linecharts);
            var option={
                title:{
                },
                legend: {
                    data:['异常设备数']
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type:'category',
                    boundaryGep:false,
                    data:util.getDaysArry()
                },
                yAxis: {
                    name:'异常设备数',
                    type:'value'
                },
                color:['orange','#5B6AE7', '#4092F0','#C2C6E3'],
                series: [
                    {
                        name:'外设类',
                        type:'line',
                        statck:'总量',
                        data:util.getDaysRandom()
                    },
                    {
                        name:'软件类',
                        type:'line',
                        statck:'总量',
                        data:util.getDaysRandom()
                    },
                    {
                        name:'主机类',
                        type:'line',
                        statck:'总量',
                        data:util.getDaysRandom()
                    }
                ]
            };
            var arr=util.getInitDay();
            $.each(option.series,function(i){
                for(var j=0;j<this.data.length;j++){
                    arr[j]+=this.data[j];
                }
            })
            console.log(arr);
            var obj={
                name:'异常设备',
                type:'line',
                statck:'总量',
                data:arr
            }
            option.series.unshift(obj);
            line.setOption(option);
        },
         drawBar(){
            var dom=document.getElementById("barPanel");
            var myChart=this.$echarts.init(dom);

            var option={
                title:{
                    text:'设备离线时长Top5'
                },
                tooltip:{
                    trigger:'item',
                    formatter:'{a} <br/>{b}: {c} ({d}%)'
                },
                xAxis:{
                    type:'category',
                    data:['POS01','POS02','POS03','POS04','防损主机']
                },
                yAxis:{
                    name:'min',
                    type:'value'
                },
                series:[
                    {
                        data:[30,25,20,15,5],
                        type:'bar',
                        barWidth:20,
                        markLine : {
                            itemStyle: {
                            normal: {
                                color:'#FA8565',
                                label: {
                                
                                    formatter: '{c} min'
                                }
                            }
                            }, 
                            data : [
                                { name: '上月平均值',yAxis:6}
                            ]
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted(){
        this.drawPie();
        this.drawLine();
        this.drawBar();
    }
}
</script>
<style lang="scss">
   
    .el-row-errnum{
        width:99%;
        height: 300px;
        position: relative;
        margin-top: 10%;
        margin-left: 10px;
        .side-left-echarts{
            width:55%;
            height:auto;
            position:absolute;
            top: 10px;
            left: 10px;
            border:1px solid #ddd;
        }
         .side-right-echarts{
              border:1px solid #ddd;
              position: absolute;
              top:0px;
              left: 60%;
         }
    }
    .el-addup{
        width:98%;
        height: auto;
        background-color: #FFFFFF;
        border: 0.5px solid #ebebeb;
        margin: 10px;
        .el-header{
            width: 100%;
            margin: 10px;
            font-size: 14px;
            float: left;
            .checkbox-group{
                float: left;
            }
            .el-header-hr{
                width: 98%;
                float: left;
                margin-top: 10px;
                border:0.5px solid #ddd;
            }
            .err-num{
                margin-top: 10px;
                width: 150px;
                float: left;
            }
        }
    }
</style>
