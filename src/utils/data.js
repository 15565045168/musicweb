 function date(date){
    date = new Date(date);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    return y+"-"+m+"-"+d;
}

function sex(options){
     switch(options){
         case 1:
          return "男"
          break;
         case 0:
          return "女"
          break;
         default:
            return ""
          break;
        }
}

export default {
    date,
    sex
}
