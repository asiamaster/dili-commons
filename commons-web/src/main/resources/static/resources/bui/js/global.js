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
 * @returns {number} accDiv(this, arg)
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
 * 返回值：arg1减去arg2的精确结果
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
 * @returns {string} accSub(this,arg)
 */
Number.prototype.sub = function (arg){
    return accSub(this,arg);
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

/**
 * var data = [
 { id: 1, name: "办公管理", parentId: 0 },
 { id: 2, name: "请假申请", parentId: 1 },
 { id: 3, name: "出差申请", parentId: 1 },
 { id: 4, name: "请假记录", parentId: 2 },
 { id: 5, name: "系统设置", parentId: 0 },
 { id: 6, name: "权限管理", parentId: 5 },
 { id: 7, name: "用户角色", parentId: 6 },
 { id: 8, name: "菜单设置", parentId: 6 },
 ];
 */
/**
 * 转换数据库树形结构成ele ui结构
 * @param data
 * @returns {[]}
 */
function toEleTree(data , options) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
    //console.log(map);
    const val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        item.label = item[options.label];
        const parent = map[item[options.pid]];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};