export default{
     getDaysCount(){   
        var date=new Date();
        var month=date.getMonth();
        date.setMonth(month+1);
        date.setDate(0);
        return date.getDate();

    },
     getDaysArry(){
        var day=this.getDaysCount();
        var arr=[];
        for(var i=1;i<=day;i++){
            arr.push(i);
        }
        return arr;
    },
     getInitDay(){
        var day=this.getDaysCount();
        var arr=[];
        for(var i=1;i<=day;i++){
            arr.push(0);
        }
        return arr;
    },
     getDaysRandom(){
        var day=this.getDaysCount();
        var arr=[];
        for(var i=1;i<=day;i++){
            arr.push(Math.round(Math.random()*100));
        }
        return arr;
    }
}