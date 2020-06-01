<link rel="stylesheet" type="text/css" href="${contextPath!}/resources/jquery-file-upload/css/jquery.fileupload.css">
<script src="${contextPath!}/resources/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="${contextPath!}/resources/jquery-file-upload/js/jquery.iframe-transport.js"></script>
<script src="${contextPath!}/resources/jquery-file-upload/js/jquery.fileupload.js"></script>
<script>
    //初始化所有fileimg-box控件下所有的图片上传控件
    function initOssImg(){
        var inputFiles = $(".fileimg-box").children('input[type="file"]');
        var inputHiddens = $(".fileimg-box").children('input[type="hidden"]');
        var imgIcons = $(".fileimg-box").children('img');
        for(var i=0; i<inputFiles.length; i++){
            //img控件，用于图标显示
            var imgIcon = $(imgIcons[i]);
            //hidden控件，用于保存上传图片fileKey
            var inputHidden = $(inputHiddens[i]);
            $(inputFiles[i]).fileupload({
                dataType: 'json',
                done : function(e, res) {
                    if (res.result.success) {
                        var fileKey = '';
                        var imgSrc = '';
                        $.each(res.result.data, function (key, value) {
                            fileKey = key;
                            imgSrc = value;
                        });
                        // $('#${iconId!"icon"}').attr('src', img + '?x-oss-process=image/resize,m_mfit,h_100,w_100');
                        imgIcon.attr('src', imgSrc + '?x-oss-process=image/resize,m_mfit,h_100,w_100');
                        // $('#${hiddenKey!"fileKey"}').val(fileKey);
                        inputHidden.val(fileKey);
                        $('.fileimg-cover,.fileimg-edit').show();
                    }
                }
            });
        }
    }
    /**
     * 查看图片大图
     * @param url 图片路径
     * @param viewTagId 用于承载显示图片信息的控件(推荐用DIV)ID，不需要#号
     */
    function _showOssBigImg(url,viewTagId) {
        if (!url || !viewTagId) {
            return;
        }
        var imgHeight = document.documentElement.clientHeight;
        var imgWidth = document.documentElement.clientWidth;
        var imgUrl = url.substring(0, url.indexOf('?'));
        $('#' + viewTagId).dialog({
            title: '查看原图',
            width: parseInt(imgWidth * 0.95),
            height: parseInt(imgHeight * 0.95),
            closable: true,
            modal: true,
            content: '<div style="text-align:center;"><img src="'+imgUrl+'"/></div>',
            toolbar: [{
                iconCls: 'icon-down',
                handler: function () {
                    window.open(url.substring(0, url.indexOf('?')));
                }
            }]
        });
        $('#' + viewTagId).dialog('open');
    }

    //删除图片
    function delOssImg(cthis){
        var imageBox=$($(cthis).parents('.fileimg-box')[0]);
        if(imageBox.children('img').attr('src')==''){
            return;
        }
        var imageBoxParent=imageBox.parent();
        var imageBoxs=imageBoxParent.children('.fileimg-box');
        imageBox.remove();
        var lastImageBox=$(imageBoxs[imageBoxs.length-1]);
        if(lastImageBox.children('img').attr('src')!=''){
            var newBox=cloneOssImage(imageBox);
            imageBoxParent.append(newBox);
        }
        initOssImg();
    }
    //克隆imagebox
    function cloneOssImage(jqueryImageBox){
        var newBox=jqueryImageBox.clone();
        newBox.children('img').attr('src','');
        newBox.children('input[type="hidden"]').val('');
        newBox.children('.fileimg-cover,.fileimg-edit').hide();
        return newBox;
    }
</script>