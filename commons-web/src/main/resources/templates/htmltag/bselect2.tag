<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;script&gt;
<% }else {%>
<script>
<% }%>
    $(function () {
        let option;
        <% if( isNotEmpty(_optionVariable) ) {%>
            option = ${_optionVariable!};
        <% } else { %>
            option = {${_option!}};
        <% } %>

        //将下拉框位置定位在modal下
        let dropdownParent = $(document.body);
        if ($('#${_id}').parents('.modal:first').length !== 0)
            dropdownParent = $('#${_id}').parents('.modal:first');

        //数据远程搜索（自动完成框）
        <% if( isNotEmpty(_mode) && _mode == "remote" ) {%>
            $('#${_id}').select2($.extend(true,{
                dropdownParent: dropdownParent,//将下拉框位置定位在modal下
                language: 'zh-CN',
                containerCssClass : 'form-control',
                width: '100%',
                ajax: {
                    delay: 250, // wait 250 milliseconds before triggering the request
                    <% if( isNotEmpty(_provider) ) {%>
                    type:'post',
                    url: '/provider/getLookupList.action',
                    data: function (params) {
                        var query = {
                            value: params.term,
                            provider: '${_provider!}',
                            <% if( isNotEmpty(_queryParams) ) {%>
                            queryParams: '${_queryParams!}'
                            <% } else { %>
                            queryParams: '{required:true}'
                            <% } %>
                        }
                        return query;
                    },
                    dataType: 'json',
                    processResults: function (result) {
                        let data;
                        if(result instanceof Array){
                            data = result;
                        }else if (typeof (result) == 'object') {
                            if(result.success){
                                data = result.data;
                            }else{
                                bs4pop.alert(result.message, {type: 'error'});
                                return;
                            }
                        }

                        return {
                            results: $.map(data, function (dataItem) {
                                dataItem.id = dataItem["${_valueField!'value'}"];
                                dataItem.text = dataItem["${_textField!'text'}"];
                                return dataItem;
                            })
                        };
                    }
                    <% } %>
                }
            },option));
            <% if( isNotEmpty(_value) ) {%>
            $('#${_id}').val(${_value}).trigger('change.select2');
            <% } %>
        <% } else { %>
            //数据本地搜索
            //_logTable 动态标签元素计数器
            let $table = $('#${_id}').parents('[_logTable]');
            if(typeof(${_logVariable!'Log'}) !== 'undefined' && $table.length > 0){
                if(typeof(${_logVariable!'Log'}.tableItemTagCount) == 'undefined'){
                    ${_logVariable!'Log'}.tableItemTagCount = 0;
                }
                ++${_logVariable!'Log'}.tableItemTagCount;
            }

            let dataOption = $.extend(
                {${_dataOption!}},
                <% if( isNotEmpty(_onLoadSuccess) ) {%>
                {onLoadSuccess : ${_onLoadSuccess!}}
                <% } else { %>
                {}
                <% } %>
            );

            $.extend(option,
                <% if( isNotEmpty(_onLoadSuccess) ) {%>
                {onLoadSuccess : ${_onLoadSuccess!}}
                <% } else { %>
                {}
                <% } %>
            );


            $('#${_id}').select2($.extend(true,{
                dropdownParent: dropdownParent,//将下拉框位置定位在modal下
                containerCssClass : 'form-control',
                width: '100%'
            },option));

            $.ajax($.extend(true,{
                <% if( isNotEmpty(_provider) ) {%>
                type: "post",
                url: '/provider/getLookupList.action',
                data: {
                    provider: '${_provider}',
                    <% if( isNotEmpty(_queryParams) ) {%>
                    queryParams: '${_queryParams!}'
                    <% } %>
                },
                <% } %>
                dataType: "json",
                success: function (result) {
                    let data;
                    if(result instanceof Array){
                        data = result;
                    }else if (typeof (result) == 'object') {
                        if(result.success){
                            data = result.data;
                        }else{
                            bs4pop.alert(result.message, {type: 'error'});
                            return;
                        }
                    }

                    $.map(data, function (dataItem) {
                        var option = new Option(dataItem["${_textField!'text'}"], dataItem["${_valueField!'value'}"], false, false);
                        $('#s2').append(option);
                    });

                    <% if( isNotEmpty(_value) ) {%>
                    $('#${_id}').val(${_value}).trigger('change.select2');
                    <% } %>

                    <% if( isNotEmpty(_log)) {%>
                    //组件加载计数器 日志收集
                    if(typeof(${_logVariable!'Log'}) !== 'undefined'){
                        if($table.length > 0){//待所有logTable元素加载完执行日志搜集
                            if(--${_logVariable!'Log'}.tableItemTagCount == 0){
                                $.extend(${_logVariable!'Log'}.oldFields, ${_logVariable!'Log'}.buildTableFields($table));
                            }
                        }else{
                            $('#${_id}').attr('_log','${_log}');
                            if(typeof(${_logVariable!'Log'}) !== 'undefined'){
                                $.extend(${_logVariable!'Log'}.oldFields,Log.buildFields('#${_id}'));
                            }
                        }
                    }
                    <% } %>

                    dataOption.onLoadSuccess && dataOption.onLoadSuccess(data);
                },
                error: function () {
                    console.log('数据接口异常');
                }
            },dataOption));
        <% } %>
    })
<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;/script&gt;
<% }else {%>
</script>
<% }%>