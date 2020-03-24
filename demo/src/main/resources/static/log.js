let Log = {};
(function(Log){
    $(function () {
        //构建老数据对象
       Log.oldContent = Log.buildFields();
    });

    Log.operatorLog = function (logObj) {
        $.ajax({
            type: "POST",
            url: "http://logger.diligrp.com:8283/api/businessLog/save",
            data: JSON.stringify(logObj),
            processData: false,
            dataType:"json",
            contentType:"application/json",
            async: true,
            success: function (ret) {
                if (!ret.success) {
                    console.log('日志记录异常'+ret.message);
                }
            },
            error: function (error) {
                console.log('日志记录异常');
            }
        });
    }

    /**
     * 构建数据对象
     * @param selector
     */
    Log.buildFields = function (selector) {
        let fields = {};
        let $el = selector? $(selector) : $('[_log]');
        $el.each(function (i,el) {
            let field = $(el).attr('_log');
            if($(el).prop('tagName') == "LABEL" && $(el).prop('htmlFor')){
                let objEl = $('#' + $(el).prop('htmlFor'));
                if(objEl.prop('tagName') == "SELECT"){
                    let option = objEl.find("option:selected");
                    fields[$(el).text()] = option.val() ? option.text() : '';
                }else if(objEl.prop('type') == "radio"){
                    if(!fields[$(el).text()]){
                        fields[$(el).text()] = $('[name="'+objEl.prop('name')+'"]:checked').next().text();
                    }
                }else if(objEl.prop('type') == "checkbox"){
                    if(!fields[$(el).text()]){
                        fields[$(el).text()] = $('[name="'+objEl.prop('name')+'"]:checked').map(function(){
                            return $(this).next().text();
                        }).get().join();
                    }
                }
            }else{
                if($(el).prop('tagName') == "SELECT"){
                    if(!fields[field]){
                        let option = $(el).find("option:selected");
                        fields[field] = option.val() ? option.text() : '';
                    }
                }else if($(el).prop('type') == "radio"){
                    if(!fields[field]){
                        fields[field] = $('[name="'+el.name+'"]:checked').next().text();
                    }
                }else if($(el).prop('type') == "checkbox"){
                    if(!fields[field]){
                        fields[field] = $('[name="'+el.name+'"]:checked').map(function(){
                            return $(this).next().text();
                        }).get().join();
                    }
                }else{
                    if(field){
                        fields[field] = $(el).val();
                    }
                }
            }
        });
        return fields;
    }

    /**
     * 构建update对象
     * @returns {string}
     */
    Log.buildUpdateContent = function () {
        let content = [];
        let newContent = this.buildFields();
        for (let field in this.oldContent){
            if(newContent[field] != this.oldContent[field]){
                content.push('【' + field + '】：从‘' + this.oldContent[field] + '’修改为‘' + newContent[field] + '’\n');
            }
        }
        return content.join("");
    }
})(Log);