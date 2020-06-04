/**
 *  ---------------------加减乘除浮点数计算 start ---------------------
 */
/**
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 * @param arg1
 * @param arg2
 * @returns {number}
 */
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

/**
 * 给Number类型增加一个div方法，调用起来更加方便。
 * @param arg
 * @returns {number}
 */
Number.prototype.div = function (arg){
    return accDiv(this, arg);
};

/**
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以arg2的精确结果
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}


/**
 * 给Number类型增加一个mul方法，调用起来更加方便。
 * @param arg
 * @returns {number}
 */
Number.prototype.mul = function (arg){
    return accMul(arg, this);
};

/**
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 * @param arg1
 * @param arg2
 * @returns {number}
 */
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

/**
 * 给Number类型增加一个add方法，调用起来更加方便。
 * @param arg
 * @returns {number}
 */
Number.prototype.add = function (arg){
    return accAdd(arg,this);
};

/**
 * 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 * @param arg1
 * @param arg2
 * @returns {string}
 */
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

/**
 * 给Number类型增加一个sub方法，调用起来更加方便。
 * @param arg
 * @returns {string}
 */
Number.prototype.sub = function (arg){
    return accSub(arg,this);
};

/**
 *  ---------------加减乘除浮点数计算 end ------------
 */

/**
 * 说明：分转元，由于为了能够精确到分，数据往往是以整数进行持久化，为了前端渲染显示方便，提供此工具函数进行转换。
 * 调用：centToYuan(arg)
 * 返回值：arg转元后的值
 * @param cent
 * @returns {string}
 */
function centToYuan(cent) {
    cent = Number(cent);
    let result = (cent / 100).toString();
    if(result.indexOf(".") < 0) {
        result += ".00";
    }
    return result;
}

/**
 * 给Number类型增加一个centToYuan方法，调用起来更加方便。
 * @returns {string}
 */
Number.prototype.centToYuan = function (){
    return centToYuan(this);
};


/**
 * 给Array类型增加一个inArray方法，比较字符串是否相同，调用起来更加方便。
 * 区别includes inArray比较用的== 而includes用的是===
 * 布尔值和布尔值转字符串相等
 * @returns {string}
 */
Array.prototype.inArray = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] + '' == val + '') {
            return true;
        }
    }
    return false;
}