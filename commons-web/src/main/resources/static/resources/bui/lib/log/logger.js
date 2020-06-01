/**
 * log.js 前端日志模块
 * @Date 2020-03-23 17:30:00
 * @author jiangchengyong
 *
 ***/

(function () {
    window.Logger = Logger;
    function Logger(option) {
        this.oldFields = {};
        if(loggerContextPath){
            Logger.defaults.remoteUrl = loggerContextPath + '/api/businessLog/save';
            loggerContextPath = false;
        }
        $.extend(this, Logger.defaults, option);
        this.init();
    }

    Logger.defaults = {
        //作用范围
        scope : 'body',
        //是否初始化默认实例
        isInitDefaultLog : true,
        //日志记录远程URL
        remoteUrl: 'http://logger.diligrp.com:8283/api/businessLog/save',
        /**
         * tr 行元素格式化
         * @param itemFields
         * @returns {string}
         */
        trItemFormatter: function (itemFields) {
            // {'摊位编号':'一号摊位','数量':'123'}
            let itemFieldsArr = [];
            for (let field in itemFields) {
                itemFieldsArr.push(`${field}（${itemFields[field]}）`);
            }
            return itemFieldsArr.join();
        }
    }


    Logger.prototype = {
        constructor: Logger,
        /**
         * 构建数据对象
         * @param selector
         */
        init() {
            this.oldFields = this.buildFields();
        },
        /**
         * 日志记载方法
         * @param logObj
         * description {id,marketId,systemCode,businessType,businessId,businessCode,content,notes,operatorId,operatorName,createTime,operationType,operationTypeText}
         */
        operatorLog(logObj) {
            $.ajax({
                type: "POST",
                url: this.remoteUrl,
                data: JSON.stringify(logObj),
                processData: false,
                dataType: "json",
                contentType: "application/json",
                async: true,
                success: function (ret) {
                    if (!ret.success) {
                        console.log('日志记录异常' + ret.message);
                    }
                },
                error: function (error) {
                    console.log('日志记录异常');
                }
            });
        },
        /**
         * 构造$EL对应元素的字段数据
         * @param $el
         */
        buildFields2El($el) {
            let fields = {};
            $el.each(function (i, el) {
                let field = $(el).attr('_log');
                if ($(el).prop('tagName') == "LABEL" && $(el).prop('htmlFor')) {
                    let objEl = $('#' + $(el).prop('htmlFor'));
                    if (objEl.prop('tagName') == "SELECT") {
                        let option = objEl.find("option:selected");
                        fields[$(el).text()] = option.length > 0? option.val() ? option.text() : '' : '';
                    } else if (objEl.prop('type') == "radio") {
                        if (!fields[$(el).text()]) {
                            fields[$(el).text()] = $('[name="' + objEl.prop('name') + '"]:checked').next().text();
                        }
                    } else if (objEl.prop('type') == "checkbox") {
                        if (!fields[$(el).text()]) {
                            fields[$(el).text()] = $('[name="' + objEl.prop('name') + '"]:checked').map(function () {
                                return $(this).next().text();
                            }).get().join();
                        }
                    } else {
                        if (!fields[$(el).text()]) {
                            fields[$(el).text()] = objEl.val();
                        }
                    }
                } else {
                    if ($(el).prop('tagName') == "SELECT") {
                        if (!fields[field]) {
                            let option = $(el).find("option:selected");
                            fields[field] = option.length > 0? option.val() ? option.text() : '' : '';
                        }
                    } else if ($(el).prop('type') == "radio") {
                        if (!fields[field]) {
                            fields[field] = $('[name="' + el.name + '"]:checked').next().text();
                        }
                    } else if ($(el).prop('type') == "checkbox") {
                        if (!fields[field]) {
                            fields[field] = $('[name="' + el.name + '"]:checked').map(function () {
                                return $(this).next().text();
                            }).get().join();
                        }
                    } else {
                        if (field) {
                            fields[field] = $(el).val();
                        }
                    }
                }
            });

            return fields;
        },
        /**
         * 构建数据对象
         * @param selector
         */
        buildFields(selector) {
            let self = this;
            let $el = selector ? $(selector) : $(`${self.scope} [_log]:not([_logTable] [_log])`);
            let fields = $.extend({},self.buildFields2El($el),self.buildTableFields($('[_logTable]')));
            return fields;
        },
        /**
         * 构建table fields
         * @param $table
         */
        buildTableFields($table) {
            let self = this;
            let fields = {};
            $table.each(function (i, el) {
                let itemArr = [];
                $(el).find('tbody tr').each(function () {
                    let itemFields = self.buildFields2El($(this).find("[_log]"));
                    itemArr.push(self.trItemFormatter(itemFields));
                });
                fields[$(el).attr('_logTable')] = itemArr.join('；');
            });
            return fields;
        },
        /**
         * 构建update对象
         * @param extendContent
         * @returns {string}
         */
        buildUpdateContent(extendFields) {
            let content = [];
            let newFields = $.extend(this.buildFields(), extendFields);
            for (let field in this.oldFields) {
                if (newFields[field] != this.oldFields[field]) {
                    content.push('【' + field + '】：从‘' + this.oldFields[field] + '’修改为‘' + newFields[field] + '’\n');
                }
            }
            return content.join("");
        }
    }

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Logger
    }
})();
//初始化默认实例
if(Logger.defaults.isInitDefaultLog){
    window.Log = new Logger();
}