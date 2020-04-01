<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;script&gt;
<% }else {%>
<script>
<% }%>
    $(function () {
        //_logTable 动态标签元素计数器
        let $table = $('#${_containerId}').parents('[_logTable]');
        if(typeof(${_logVariable!'Log'}) !== 'undefined' && $table.length > 0){
            if(typeof(${_logVariable!'Log'}.tableItemTagCount) == 'undefined'){
                ${_logVariable!'Log'}.tableItemTagCount = 0;
            }
            ++${_logVariable!'Log'}.tableItemTagCount;
        }

        let option = {${_option!}};
        let values = ${_values!'[]'};
        $.ajax($.extend(true,{
            <% if( isNotEmpty(_provider) ) {%>
            type: "post",
            url: '/provider/getLookupList.action',
            data: {
                provider: '${_provider}',
                <% if( isNotEmpty(_queryParams) ) {%>
                queryParams: '${_queryParams!}'
                <% } else { %>
                queryParams: '{required:true}'
                <% } %>
            },
            <% } %>
            dataType: "json",
            success: function (result) {
                $.each(result, function (index,dataItem) {
                    $('#${_containerId}').append(template('checkboxItem', $.extend(dataItem, {
                        containerId: '${_containerId!}',
                        name: '${_name!}',
                        checked: values.includes(Number(dataItem.value)),
                        required:${_required!false},
                        value:dataItem["${_valueField!'value'}"],
                        text:dataItem["${_textField!'text'}"],
                        index,
                        <% if( isNotEmpty(_log)) {%>
                        _log : '${_log}',
                        <% } %>
                    })));
                });

                <% if( isNotEmpty(_log)) {%>
                if(typeof(${_logVariable!'Log'}) !== 'undefined'){
                    if($table.length > 0){//待所有logTable元素加载完执行日志搜集
                        if(--${_logVariable!'Log'}.tableItemTagCount == 0){
                            $.extend(${_logVariable!'Log'}.oldFields, ${_logVariable!'Log'}.buildTableFields($table));
                        }
                    }else{
                        $.extend(${_logVariable!'Log'}.oldFields, {
                            '${_log}': $('[name="${_name!}"]:checked').map(function () {
                                return $(this).next().text();
                            }).get().join()
                        });
                    }
                }
                <% } %>
            },
            error: function () {
                console.log('数据接口异常');
            }
        },option));
    })
<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;/script&gt;
<% }else {%>
</script>
<% }%>
