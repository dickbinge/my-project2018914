/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(c_name,c_pwd,expire) {
    var date=new Date()
    date.setTime(date.getTime()+24*60*60*1000*expire); //保存的天数
    document.cookie="userName"+ "=" +c_name+";path=/;expires="+date.toGMTString();
    document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+date.toGMTString();
    console.log(document.cookie);
}

/*获取cookie*/
export function getCookie(){
    if (document.cookie.length>0) {
      let arr = document.cookie.split(';');
      for(var i=0;i<arr.length;i++){
        var obj={};
        obj.name=arr[0].split('=')[1];
        obj.password=arr[1].split('=')[1];
      }
      return obj;
    }
    return null;
}

/*删除cookie*/
export function delCookie(){
    setCookie("", "", -1)
}
