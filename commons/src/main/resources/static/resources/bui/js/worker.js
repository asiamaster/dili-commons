    onmessage = function(e) {
        let message = e.data;
        postMessage(isFinished(message.token));
    };

    //判断导出是否完成
    function isFinished(token) {
        var flag = false
        ajax({
            type: "POST",
            url: "/export/isFinished.action?token=" + token,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data == true || data == "true") {
                    flag = true;
                }
            },
            error: function (XMLHttpRequest) {
                flag = true;
            }
        });
        return flag;
    }

    /**
     * ajax封装
     * @param option
     * @returns {undefined}
     */
    function ajax(option) {
        if (String(option) !== '[object Object]') return undefined
        option.type = option.type ? option.type.toUpperCase() : 'GET'
        option.data = option.data || {}
        var formData = []
        for (var key in option.data) {
            formData.push(''.concat(key, '=', option.data[key]))
        }
        option.data = formData.join('&')

        if (option.type === 'GET') {
            option.url += location.search.length === 0 ? ''.concat('?', option.data) : ''.concat('&', option.data)
        }

        var xhr = new XMLHttpRequest()
        xhr.responseType = option.responseType || 'json'
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (option.success && typeof option.success === 'function') {
                        option.success(xhr.response)
                    }
                } else {
                    if (option.error && typeof option.error === 'function') {
                        option.error()
                    }
                }
            }
        }
        xhr.open(option.type, option.url, option.async);
        if (option.type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        xhr.send(option.type === 'POST' ? option.data : null)
    }