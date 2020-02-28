<input type="text" class="form-control ${_validatorMethod!}" id="${_displayDomainId!}" name="${_displayDomainName!}" value="${_text!}" placeholder="${_placeholder!}"
   <% if( isNotEmpty(_required) && _required == "true") {%>
       required
    <% } %>
    <% if( isNotEmpty(_readonly) && _readonly == "true") {%>
       readonly
    <% } %>
/>
<input type="hidden" name="${_hiddenDomainName!}" id="${_hiddenDomainId!}"  value="${_value!}" text="${_text!}"/>
<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;script&gt;
<% }else {%>
<script>
<% }%>
    $(function(){
        let option;
        <% if( isNotEmpty(_optionVariable) ) {%>
            option = ${_optionVariable!};
        <% } else { %>
            option = {${_option!}};
        <% } %>
        /**
         * 初始化自动完成框
         */
        bui.util.initAutoComplete($.extend(true,{
            selector: '#${_displayDomainId!}',
            width : 200,
            <% if( isNotEmpty(_provider) ) {%>
            type: 'post',
            serviceUrl: '/provider/getLookupList.action',
            params: {
                provider: '${_provider!}',
                <% if( isNotEmpty(_queryParams) ) {%>
                queryParams: '${_queryParams!}'
                <% } else { %>
                queryParams: '{required:true}'
                <% } %>
            },
            <% } %>
            transformResult: function (result) {
                return {
                    suggestions: $.map(result, function (dataItem) {
                        return $.extend(dataItem, {
                                id: dataItem["${_valueField!'value'}"],
                                value: dataItem["${_textField!'text'}"]
                             }
                        );
                    })
                }
            },
            onSelect : function (suggestion) {
                let self = this;
                $(self).val(suggestion[option.displayFieldName || 'value']);

                let hiddenDomain = $(self).siblings('input');
                hiddenDomain.val(suggestion.id);
                hiddenDomain.prop('text', suggestion.value);
                if ($(self).hasClass('isSelected')) {
                    $(self).valid();
                }

                if (option.selectFn) {
                    option.selectFn(suggestion,self);
                }
            }
        },option));
    });
<% if(isNotEmpty(_escape) && _escape == "true") {%>
&lt;/script&gt;
<% }else {%>
</script>
<% }%>
