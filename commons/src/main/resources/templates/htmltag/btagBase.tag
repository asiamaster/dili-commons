<script id="radioItem" type="text/html">
    <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" {{_log?index == 0? '_log='+_log : '' : ''}} id="r_{{containerId}}{{value}}" value="{{value}}" name="{{name}}" class="custom-control-input" {{checked ?
        'checked':''}} {{required ? 'required':''}}>
        <label class="custom-control-label" for="r_{{containerId}}{{value}}">{{text}}</label>
    </div>
</script>
<script id="checkboxItem" type="text/html">
    <div class="custom-control custom-checkbox custom-control-inline">
        <input type="checkbox" {{_log?index == 0? '_log='+_log : '' : ''}} id="c_{{containerId}}{{value}}" value="{{value}}" name="{{name}}" class="custom-control-input" {{checked
               ? 'checked':''}} {{required ? 'required':''}}>
        <label class="custom-control-label" for="c_{{containerId}}{{value}}">{{text}}</label>
    </div>
</script>
<script id="optionItem" type="text/html">
    <option value="{{value}}"  {{selected ? 'selected':''}}>{{text}}</option>
</script>
<script type="text/javascript">
    /*********************************************** 页面组件驱动执行 begin ***********************************************************/
    $(function () {
        //表单jquery对象获取提交字段的json信息
        $.fn.serializeObject = function (containsNull) {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push && o[this.name] != null && o[this.name] != "") {
                        o[this.name] = [o[this.name]];
                        o[this.name].push(this.value || '');
                    } else if (this.value != null) {
                        o[this.name].push(this.value || '');
                    } else {
                        if (containsNull && containsNull == true) {
                            o[this.name].push('');
                        }
                    }
                } else {
                    if (this.value != null && this.value != "") {
                        o[this.name] = this.value || '';
                    } else {
                        if (containsNull && containsNull == true) {
                            o[this.name] = '';
                        }
                    }
                }
            });
            return o;
        };

        $('.date').each(function () {
            let self = this;
            laydate.render({
                elem: self,//或 elem: document.getElementById('test')、elem: lay('#test') 等
                type: 'datetime',
                theme: '#007bff'
            });
        });
    });
    /*********************************************** 页面组件驱动执行 end ***********************************************************/

    /*********************************************** 页面组件变量及处理函数 begin ***********************************************************/
    var bui = (function () {
        /**
         * table button icon
         * **/
        let icons = {
            paginationSwitchDown: 'fa-caret-square-o-down',
            paginationSwitchUp: 'fa-caret-square-o-up',
            refresh: 'fa-refresh',
            toggleOff: 'fa-toggle-off',
            toggleOn: 'fa-toggle-on',
            columns: 'fa-th-list',
            fullscreen: 'fa-arrows-alt',
            detailOpen: 'fa-plus',
            detailClose: 'fa-minus',
            export: 'fa-download'
        };


        let loading = (function () {
            //弹出加载层
            function show(text) {
                $("#loading-text").text(text || "loading...");
                $("#loading").show();
            }

            //取消加载层
            function hide() {
                $("#loading").hide();
            }

            function initLoading() {
                $("body").append(`
                    <div id="loading" class="loading" style="display: none;">
                          <div class="cover"></div>
                          <aside class="loading-wrapper">
                            <div>
                              <div class="loading-animation">
                                <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                              </div>
                              <div><span id="loading-text"></span></div>
                            </div>
                          </aside>
                      </div>`
                );
            }

            //初始化遮罩层
            initLoading();
            return {show, hide};
        })();

        /******************************** excel导出函数定义 begin *********************************/
        let bexport = (function () {
            //当前导出令牌标识
            var token;
            //循环定时执行ID
            var timeoutId;

            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };

            //token生成器
            function guid() {
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            };

            //通过token判断导出是否完成
            function checkFinished() {
                if (isFinished(token)) {
                    setTimeout(bui.loading.hide, 1);
                    window.clearTimeout(timeoutId);
                }
            }

            //判断导出是否完成
            function isFinished(token) {
                var flag = false;
                $.ajax({
                    type: "POST",
                    url: "${contextPath}/export/isFinished.action?token=" + token,
                    processData: true,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data == true || data == "true") {
                            flag = true;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        bs4pop.alert('远程访问失败:' + XMLHttpRequest.status + XMLHttpRequest.statusText + "," + textStatus, {type: 'error'});
                        flag = true;
                    }
                });
                return flag;
            }

            //导出excel
            function doExport(gridId, formId, exportUrl) {
                var opts = $('#' + gridId).bootstrapTable('getOptions');
                //没有url就没有查询过，不作导出
                if (opts.url == null || opts.url == '')
                    return;
                var param = {};
                //多表头遍历
                for (let cols of opts.columns) {
                    for (let col of cols) {
                        col['hidden'] = !col.field || !col.visible;
                    }
                }
                token = guid();
                param.columns = JSON.stringify(opts.columns);
                var _gridExportQueryParams = bindGridMeta2Form(gridId, formId);
                _gridExportQueryParams["sort"] = opts.sortName;
                _gridExportQueryParams["order"] = opts.sortOrder;
                param.queryParams = JSON.stringify(_gridExportQueryParams);
                param.title = opts.title;
                param.url = opts.url;
                param.token = token;
                if (!exportUrl) {
                    exportUrl = "${contextPath}/export/serverExport.action";
                }
                exportByUrl(exportUrl, param);
            }

            /**
             * 根据controller url导出
             * controller方法调用ExportUtils完成导出, 示例:
             * @RequestMapping("/export")
             * public @ResponseBody void export( HttpServletRequest request, HttpServletResponse response, @RequestParam("queryParams") String queryParams){...}
             * @param exportUrl
             * @param params
             */
            function exportByUrl(exportUrl, param) {
                if ($("#_exportForm").length <= 0) {
                    var formStr = "<div id='_exportFormDiv'><form id='_exportForm' action='" + exportUrl + "' method='post' target=''>" +
                        "<input type='hidden' id='columns' name='columns'/>" +
                        "<input type='hidden' id='queryParams' name='queryParams'/>" +
                        "<input type='hidden' id='title' name='title'/>" +
                        "<input type='hidden' id='url' name='url'/>" +
                        "<input type='hidden' id='token' name='token'/>" +
                        "</form></div>";
                    $(formStr).appendTo("body");
                }
                $('#columns').val(param.columns);
                $('#queryParams').val(param.queryParams);
                $('#title').val(param.title);
                $('#url').val(param.url);
                $('#token').val(param.token);
                // 显示进度条
                bui.loading.show('数据导出中，请稍候。。。');
                timeoutId = window.setTimeout(checkFinished, 1);
                $('#_exportForm').submit();
            }

            return {doExport, exportByUrl};
        })();
        /******************************** excel导出函数定义 end *********************************/

            //表单回显数据，加载json数据到表单
        let loadFormData = function (jsonStr) {
                var obj = typeof (jsonStr) == 'string' ? eval("(" + jsonStr + ")") : jsonStr;
                var key, value, tagName, type, arr;
                for (x in obj) {
                    key = x;
                    value = obj[x];

                    $("[name='" + key + "'],[name='" + key + "[]']").each(function () {
                        tagName = $(this)[0].tagName;
                        type = $(this).attr('type');
                        if (tagName == 'INPUT') {
                            if (type == 'radio') {
                                $(this).attr('checked', $(this).val() == value);
                            } else if (type == 'checkbox') {
                                arr = value.split(',');
                                for (var i = 0; i < arr.length; i++) {
                                    if ($(this).val() == arr[i]) {
                                        $(this).attr('checked', true);
                                        break;
                                    }
                                }
                            } else {
                                $(this).val(value);
                            }
                        } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {
                            $(this).val(value);
                        }

                    });
                }
            }

        //从后台获取原始值的key的前缀
        let orginal_key_prefix = '${@com.dili.ss.metadata.ValueProviderUtils.ORIGINAL_KEY_PREFIX}';

        //获取datagrid行数据中的原始值(有orginal_key_prefix开头的key的值)，用于form load
        function getOriginalData(json) {
            var obj = {};
            for (key in json) {
                if (key.startsWith(orginal_key_prefix)) {
                    continue;
                }
                //如果已有orginal_key_prefix为前缀的同名原始属性,则使用原始属性
                if (json.hasOwnProperty(orginal_key_prefix + key)) {
                    obj[key] = json[orginal_key_prefix + key];
                } else {
                    obj[key] = json[key];
                }
            }
            return obj;
        }

        //为json对象key中添加开始字符串,如果已经是以startStr开始，则跳过
        // 主要是为了获取下拉框等有provider的字段的原值
        // 如var json = {id:1, name:"value"};
        // addKeyStartWith(json, "_")
        // 结果是:{_id:1, _name:"value"};
        function addKeyStartWith(json, startStr) {
            for (key in json) {
                if (key.startsWith(startStr)) {
                    continue;
                }
                //如果已有add startStr后的同名属性,则跳过，并且移除key
                if (json.hasOwnProperty(startStr + key)) {
                    delete json[key];
                    continue;
                }
                json[startStr + key] = json[key];
                delete json[key];
            }
            return json;
        }

        //删除json对象key中的开始字符串,
        // 如var json = {_id:1, _name:"value"};
        // 调用removeByStart(json, "_")
        // 结果是:{id:1, name:"value"};
        function removeKeyStartWith(json, startStr) {
            for (key in json) {
                if (key.startsWith(startStr)) {
                    //如果已有remove掉startStr后的同名属性,则跳过，并且移除key
                    if (json.hasOwnProperty(key.slice(startStr.length))) {
                        delete json[key];
                        continue;
                    }
                    json[key.slice(startStr.length)] = json[key];
                    delete json[key];
                }
            }
            return json;
        }

        /**
         * 初始化自动完成框
         */
        function initAutoComplete(option) {
            $(option.selector).on('input', function () {
                $(this).siblings('input').val('');
            });
            //产地联系输入
            $(option.selector).autocomplete($.extend(true, {
                type: 'get',
                noCache: 1,
                autoFill: true,
                dataType: 'json',
                width: 'auto',
                paramName: 'value',
                zIndex: '999',
                onSearchComplete: function (query, suggestions) {
                },
                showNoSuggestionNotice: true,
                noSuggestionNotice: "无匹配结果"
            }, option));
        }

        /**
         * 为表单绑定表格的metadata，保持原有的meta信息
         * 返回绑定好的对象
         * @param gridId
         * @param formId
         * @returns {*}
         */
        function bindGridMeta2Form(gridId, formId, containsNull) {
            var param = bindMetadata(gridId);
            if (!formId) return param;
            var formData = $("#" + formId).serializeObject(containsNull);
            return $.extend(param, formData);
        }

        /**
         * 绑定实体的metadata信息，用于提供者转换
         * @param gridId    datagrid Id
         * @param isClearQueryParams    是否清空datagrid中原有的queryParams, 默认为false,不清空
         * @param isTreegrid 是否树表，默认false
         * @returns {queryParams|{provider}|*|string|{}}
         */
        function bindMetadata(gridId) {
            var opts = $("#" + gridId).bootstrapTable('getOptions');
            //获取最后一行的列(可能是多表头)
            var lastColumns = opts.columns[opts.columns.length - 1];
            //赋默认值
            var params = {};
            params["metadata"] = {};
            //提供者的默认排序索引
            var index = 10;
            for (var column in lastColumns) {
                var _provider = lastColumns[column]["provider"];
                var _data = lastColumns[column]["data"];
                //优先解析直接数据的_data属性
                if (_data != null) {
                    var field = lastColumns[column]["field"];
                    var fieldMetadata = {};
                    fieldMetadata["provider"] = "simpleDataProvider";
                    fieldMetadata["data"] = _data;
                    params["metadata"][field] = JSON.stringify(fieldMetadata);
                    continue;
                }
                //没有_data属性，则解析_table,_valueField和_textField等其它属性
                var _table = lastColumns[column]["table"];
                //如果有_table属性，则按simpleValueProvider处理
                if (_table != null) {
                    _provider = "simpleValueProvider";
                }
                if (_provider != null) {
                    //设值
                    var field = lastColumns[column]["field"];
                    var fieldMetadata = {};
                    fieldMetadata["provider"] = _provider;
                    fieldMetadata["table"] = _table;
                    fieldMetadata["valueField"] = lastColumns[column]["valueField"];
                    fieldMetadata["textField"] = lastColumns[column]["textField"];
                    fieldMetadata["queryParams"] = lastColumns[column]["queryParams"];
                    fieldMetadata["index"] = lastColumns[column]["index"] == null ? index : lastColumns[column]["index"];
                    fieldMetadata["field"] = field;
                    //设置通用批量提供者参数
                    fieldMetadata["_escapeFileds"] = lastColumns[column]["escapeFileds"];
                    fieldMetadata["_relationTablePkField"] = lastColumns[column]["relationTablePkField"];
                    fieldMetadata["_relationTable"] = lastColumns[column]["relationTable"];
                    fieldMetadata["_fkField"] = lastColumns[column]["fkField"];
                    params["metadata"][field] = JSON.stringify(fieldMetadata);
                    index += 10;
                }
            }
            return params;
        }

        /**
         * table-export科学计算法处理
         * @param cell
         * @param row
         * @param col
         * @returns {string}
         * @constructor
         */
        function doOnMsoNumberFormat(cell, row, col) {
            var result = "";
            if (row > 0 && col == 0)
                result = "\\@";
            return result;
        }

        /**
         * 为表单number类型进行元转分
         * @param obj 数据对象 如：$('form').serializeObject()得到number数据为
         * @returns {*}
         */
        function yuanToCentForMoneyEl(obj){
            for(let field in obj){
                let value = obj[field];
                if($('[name='+field+']').hasClass('money')){
                    if(value instanceof Array){
                        value.forEach(function(val,index,arr){
                            arr[index] = Number(val).mul(100);
                        })
                    }else{
                        obj[field] = Number(value).mul(100);
                    }
                }
            }
            return obj;
        }

        /**
         * 反转义html
         * @param str
         * @returns {*}
         */
        function HTMLDecode(str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            s = s.replace(/<br\/>/g, "\n");
            return s;
        }


        return {
            variable: {
                icons
            },
            util: {
                //自动完成框初始化
                initAutoComplete,
                //构建Meta(provider)和Form 字段信息
                bindGridMeta2Form,
                //构建meta信息
                bindMetadata,
                //table-export科学计算法处理
                doOnMsoNumberFormat,
                //列表页导出
                doExport: bexport.doExport,
                //URL导出
                exportByUrl: bexport.exportByUrl,
                //表单回显数据，加载json数据到表单
                loadFormData,
                //获取table-row原始数据
                getOriginalData,
                //data字段添加key前缀
                addKeyStartWith,
                //移除data字段添加的前缀
                removeKeyStartWith,
                //为表单number类型进行元转分
                yuanToCentForMoneyEl,
                //反转义HTML
                HTMLDecode
            },
            //遮罩层
            loading
        }
    })();
    /*********************************************** 页面组件变量及处理函数 end ***********************************************************/

</script>
