<script>

    var creatorId = ${@com.dili.uap.sdk.session.SessionContext.getSessionContext().getUserTicket().getId()};
    // window.gatewayUrl   后台配置。

    /**
     * 保存当前模块当前用户自定义的 “查询条件”
     * @model 当前模块名称
     * @data 保存的数据
     **/
    function saveModelDataHandler(model, data) {
        if (typeof model != 'string' || Object.prototype.toString.call(data) !== '[object Object]' ) {
            bs4pop.notice("数据错误", {width: 300, type: 'error'});
            return false;
        }
        $.ajax({
            url: gatewayUrl + '/assets-service/api/query/add',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({ creatorId, model, content: data }),
            processData: false,
            contentType: false,
            success(res){
                if(res.success) {
                    bs4pop.notice('保存成功', {type: 'success'});
                } else {
                    bs4pop.notice('保存失败', {type: 'success'});
                }
            },
            error(error) {
                bs4pop.notice('保存失败', {type: 'success'});
            }
        })
    }

    /**
     * 保存当前模块当前用户自定义的 “列表列头”
     * @model 当前模块名称
     * @grid 列表元素
     **/
    function saveHiddenColumnsHandler(model, grid){
        if(typeof model != 'string' || !grid.length) {return false};
        let data = grid.bootstrapTable('getHiddenColumns').map(function(item,index){
            return item.field;
        })
        localStorage.setItem(model+'HiddenColumns',  JSON.stringify({ data}));
        $.ajax({
            url: gatewayUrl + '/assets-service/api/query/add',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({ creatorId, model, content: data }),
            processData: false,
            contentType: false,
            success(res){
                if(res.success) {
                    bs4pop.notice('保存成功', {type: 'success'});
                } else {
                    bs4pop.notice('保存失败', {type: 'success'});
                }
            },
            error(error) {
                bs4pop.notice('保存失败', {type: 'success'});
            }
        })
    }
    /**
     * 获取当前模块当前用户自定义 ”保存的数据“
     * @model 当前模块名称
     **/
    function getModelSaveHandler(model) {
        let getData;
        $.ajax({
            url: gatewayUrl + '/assets-service/api/query/queryAll',
            type: 'post',
            data: JSON.stringify({creatorId, model}),
            processData: false,
            contentType: false,
            async: false,
            success(res){
                if(!res.data.length){return false}
                let len = res.data.length - 1;
                getData = JSON.parse(res.data[len].content);
            },
            error(error) {
                bs4pop.notice('获取失败', {type: 'success'});
            }
        })
        return getData;
    }

    /**
     * 回显当前模块当前用户自定义保存的数据
     * @obj 当前模块的“查询条件”数据
     **/
    function echoListQueryDataHandler(model) {
        let obj = getModelSaveHandler(model);
        if ($.type(obj) != "object") {
            bs4pop.notice("查询条件获取失败", {width: 300, type: 'error'});
            return false;
        }
        var key, value, tagName, type, arr;
        for (let x in obj) {
            key = x;
            value = obj[x];
            $("[name='" + key + "'],[name='" + key + "[]']").each(function (index) {
                tagName = $(this)[0].tagName;
                type = $(this).attr('type');
                if (tagName == 'INPUT') {
                    if (type == 'radio') {
                        //处理radio
                        $(this).attr('checked', $(this).val() == value);
                    } else if (type == 'checkbox') {             //处理checkbox
                        for (var i = 0; i < value.length; i++) {
                            if ($(this).val() == value[i]) {
                                $(this).attr('checked', true);
                                break;
                            }
                        }
                    } else if (type == 'date') {                  //处理日期型表单
                        if (parseInt(value) > 1000000000000)      //毫秒时间戳
                            $(this)[0].valueAsNumber = parseInt(value);
                        else if (parseInt(value) > 1000000000)    //秒时间戳
                            $(this)[0].valueAsNumber = parseInt(value) * 1000;
                        else                                   //字符串时间
                            $(this)[0].valueAsDate = new Date(value);
                    } else {
                        if ($.isArray(value))                    //表单组情形(多个同名表单)
                            $(this).val(value[index]);
                        else
                            $(this).val(value);
                    }
                } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {    //处理select和textarea
                    if ($.isArray(value)) {
                        if ($(this).attr('data-select2-id') == key) {
                            $.map(value, function (item) {
                                let option = new Option(item.text, item.id, true, true);
                                $('#' + key).append(option);
                            });
                            $('#' + key).trigger({
                                type: 'select2:select',
                                params: {
                                    data: value
                                }
                            });
                        } else {
                            $(this).val(value[index]);
                        }
                    } else {
                        $(this).val(value);
                    }
                }
            });
        }
    }
    /**
     * 根据隐藏列头构建表格显示列列数据
     * @_grid 表格元素
     **/
    function getVisibleColumnsDataHandler(model, grid){
        let hiddenColumnsData;
        let localStorageHiddenColumns= JSON.parse(localStorage.getItem(model+'HiddenColumns'));
        if (localStorageHiddenColumns){
            hiddenColumnsData = localStorageHiddenColumns.data
        } else {
            hiddenColumnsData =  getModelSaveHandler(model) || [];
        }
        let columns = grid.bootstrapTable('getOptions').columns.flat();

        if(hiddenColumnsData.length && hiddenColumnsData.__proto__ ==  Array.prototype) {
            columns = columns.map(function(col){
                if (hiddenColumnsData.includes(col.field)) {
                    col.visible = false;
                }
                return col;
            })
        }
        return columns;
    }



</script>