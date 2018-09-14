<template>
    <div class="content" style="width:100%">
        <div id="cir-panel" style="width:200px;height:250px;"></div>
    </div>
</template>
<script>
export default {
    name:'Test',
    data:function(){

    },
    methods:{
        drawPie(){
            var cirPanel=document.getElementById("cir-panel");
            var pie=this.$echarts.init(cirPanel);
            var option={
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
        }
    },
    mounted(){
        this.drawPie();
    }
}
</script>
