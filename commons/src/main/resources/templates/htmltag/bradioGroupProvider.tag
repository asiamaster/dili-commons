<script>
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
                $.map(result, function (dataItem) {
                    $('#${_containerId}').append(template('radioItem', $.extend(dataItem, {
                        containerId: '${_containerId!}',
                        name: '${_name!}',
                        checked: '${_value!}' == dataItem.value,
                        required:${_required!false},
                        value:dataItem["${_valueField!'value'}"],
                        text:dataItem["${_textField!'text'}"]
                    })));
                });
            },
            error: function () {
                console.log('数据接口异常');
            }
        },option));
    })
</script>
