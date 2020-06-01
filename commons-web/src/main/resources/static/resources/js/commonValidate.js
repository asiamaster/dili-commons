/**
 * ------------------------扩展easyui的验证框架，可加入一些自定义的验证   start---------------------------
 */
$.extend($.fn.validatebox.defaults.rules, {
    //验证手机号规则
    phoneNum: {
        validator: function(value, param){
            return /^1[3-9]\d{9}$/.test(value);
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

