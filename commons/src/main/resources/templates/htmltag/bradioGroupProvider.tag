<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;script&gt;
<% }else {%>
<script>
<% }%>
    $(function () {
        let option = {${_option!}};
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
                    $('#${_containerId}').append(template('radioItem', $.extend(dataItem, {
                        containerId: '${_containerId!}',
                        name: '${_name!}',
                        checked: '${_value!}' == dataItem.value,
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
                $.extend(Log.oldContent,{'${_log}':$('[name="${_name!}"]:checked').next().text()});
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
