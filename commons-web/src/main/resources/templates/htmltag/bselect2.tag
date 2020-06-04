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

        //数据远程搜索（自动完成框）
        <% if( isNotEmpty(_mode) && _mode == "remote" ) {%>
            $('#${_id}').select2($.extend(true,{
                containerCssClass : 'form-control',
                width: '100%',
                <% if( isNotEmpty(_provider) ) {%>
                ajax: {
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
                                return dataItem;
                            })
                        };
                    }
                }
                <% } %>
            },option));
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
                        $('#${_id}').append(template('optionItem', $.extend(dataItem, {
                            selected: '${_value!}' == dataItem.value + '',
                            value:dataItem["${_valueField!'value'}"],
                            text:dataItem["${_textField!'text'}"]
                        })));
                    });

                    <% if( isNotEmpty(_log)) {%>
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

            $('#${_id}').select2($.extend(true,{
                containerCssClass : 'form-control',
                width: '100%'}
                ,option));
        <% } %>
    })
<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;/script&gt;
<% }else {%>
</script>
<% }%>