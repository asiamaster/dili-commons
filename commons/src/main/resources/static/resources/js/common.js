
/**
 * 手机号码格式化
 * 隐藏手机号码(11位)第4-7位用*表示，例如：136****1212
 * 非11位参数座机号码规则，例如：0288****212
 */
function mobilePhoneFmt(value,row,index) {
    if (value == null || value.length == 0) {
        return null;
    }
    if (value.length == 11) {
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        return value.replace(reg, "$1****$2");
    }
    if (value.length > 3 && value.length < 7 ){
        return plusXing(value, 0, 3);
    }
    if(value.length >=7){
        return plusXing(value, value.length-7, 3);
    }
    return value;
}

/**
 * 号码加星隐藏
 * @param str
 * @param frontLen 前面保留位数
 * @param endLen 后面保留位数
 * @return {string}
 */

function plusXing(str,frontLen,endLen) {
    if(str == undefined || str == null){
        return null;
    }
    if(typeof str == 'number'){
        str = "" + str;
    }
    var len = str.length-frontLen-endLen;
    if(len <= 0){
        return str;
    }
    var xing = '';
    for (var i=0;i<len;i++) {
        xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}

//清空datagrid选择
function clearGridSelectedAndChecked(data) {
    $(this).datagrid("clearSelections");
    $(this).datagrid("clearChecked");
}


$(function () {
    //去掉输入框中的前后空格
    $(document).on('change', 'input[type=text], textarea', function () {
        $(this).val($.trim($(this).val()));
    });
    //过滤某些特殊字符，不能被输入
    $(document).on('keydown', 'input[type=text], textarea', function (e) {
        var isContainsSpecialChar = /[(\`)(\~)(\^)(\<)(\>)(\$)(\—)]+/g;
        if (isContainsSpecialChar.test(e.key)) {
            e.preventDefault();
        }
    });

    /**
     * ------------------------扩展easyui的验证框架，可加入一些自定义的验证   start---------------------------
     */
    $.extend($.fn.validatebox.defaults.rules, {
        //验证手机号规则
        phoneNum: {
            validator: function(value, param){
                return /^1[3-8]\d{9}$/.test(value);
            },
            message: '请输入正确的手机号码。'
        },
        //验证只能是中文汉字
        isChinese:{
            validator:function (value,param) {
                return  /^[\u4e00-\u9fa5]+$/.test(value);
            },
            message:'只能输入中文汉字'
        },
        //字符验证，只能包含中文、英文、数字、下划线等字符。
        isWord:{
            validator:function (value,param) {
                return /^[a-zA-Z0-9\u4e00-\u9fa5_]+$/.test(value);
            },
            message:'只能包含中文、英文、数字、下划线'
        },
        //验证银行卡号规则：目前只要求是数字，且长度在12-22位之间即可
        bankCard: {
            validator: function(value, param){
                return /^[1-9]\d{11,21}$/.test(value);
            },
            message: '请输入正确的卡号。'
        },
        //混合模式的联系电话验证，只验证位数，手机号或带区号的固定电话，多个电话请用;隔开
        mixtureTel: {
            validator: function(value, param){
                return /^\d{11}([\;]+\d{11})*$/.test(value);
            },
            message: '请输入正确的联系电话。'
        },
        //正整数
        integer:{
            validator:function (value, param) {
                return /^[+]?[1-9]\d*$/.test(value);
            },
            message: '请输入最小为1的整数'
        },
        //字符验证，只能包含中文、英文、数字字符。
        isWordPure:{
            validator:function (value,param) {
                return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value);
            },
            message:'只能包含中文、英文、数字'
        }
    });

    /**
     * ------------------------扩展easyui的验证框架，可加入一些自定义的验证   end ---------------------------
     */


    /**
    *  ---------------------加减乘除浮点数计算 start ---------------------
    */
    //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    //调用：accDiv(arg1,arg2)
    //返回值：arg1除以arg2的精确结果
    function accDiv(arg1,arg2){
        var t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        with(Math){
            r1=Number(arg1.toString().replace(".",""))
            r2=Number(arg2.toString().replace(".",""))
            return (r1/r2)*pow(10,t2-t1);
        }
    }

    //给Number类型增加一个div方法，调用起来更加方便。
    Number.prototype.div = function (arg){
        return accDiv(this, arg);
    };

    //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    function accMul(arg1,arg2){
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    }


    //给Number类型增加一个mul方法，调用起来更加方便。
    Number.prototype.mul = function (arg){
        return accMul(arg, this);
    };

    //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加上arg2的精确结果
    function accAdd(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m
    }
    //给Number类型增加一个add方法，调用起来更加方便。
    Number.prototype.add = function (arg){
        return accAdd(arg,this);
    };

    function accSub(arg1,arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //last modify by deeka
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }

    //给Number类型增加一个sub方法，调用起来更加方便。
    Number.prototype.sub = function (arg){
        return accSub(arg,this);
    };

    /**
     *  ---------------加减乘除浮点数计算 end ------------
     */









});