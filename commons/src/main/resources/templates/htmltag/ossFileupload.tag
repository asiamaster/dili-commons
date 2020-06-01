<#comment>
标签参数:
参数名     默认值     说明
id        imgFile   file控件id和name
iconId    icon      上传图片缩略图id
hiddenKey fileKey   存的上传图片的key的hidden控件的id和name
bigImgId  bigImg    用于打开大图的弹出框的div id
</#comment>
<div class="fileimg-box">
    <span class="fileimg-plus-icon">+</span>
    <span>上传图片</span>
    <!-- 文件上传控件，在页面打开后通过js渲染 -->
    <input type="file" name="${id!"imgFile"}"
    data-url="${contextPath!}/uploadImage/upload.action" id="${id!"imgFile"}" multiple="multiple" />
    <!-- 上传图片缩略图 -->
    <img class="magnifying" title="" id="${iconId!"icon"}" alt="" src="">
    <!-- 上传图片的key -->
    <input type="hidden" id="${hiddenKey!"fileKey"}" name="${hiddenKey!"fileKey"}" value="" />
    <!-- 查看按钮下面的半透明黑 -->
    <div class="fileimg-cover" style="display: none;"></div>
    <!-- 查看按钮 -->
    <div class="fileimg-edit" style="display: none;">
        <span onclick="_showOssBigImg($('#icon').attr('src'),'${bigImgId!"bigImg"}');">查看</span>
        <span onclick="delImg(this);">删除</span>
    </div>
</div>
<!-- 用于打开大图的弹出框 -->
<div id="${bigImgId!"bigImg"}" style="display: none;"></div>
<script>

    $(function () {
        initOssImg();
        <%if (has(url)){%>
            $('#${iconId!"icon"}').attr('src','${url}' + '?x-oss-process=image/resize,m_mfit,h_100,w_100');
            $('.fileimg-cover,.fileimg-edit').show();
        <%}%>
    });
</script>