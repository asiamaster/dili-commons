<!-- Automatically provides/replaces `Promise` if missing or broken. -->
<script src="${contextPath}/resources/design/es6-promise.js"></script>
<script src="${contextPath}/resources/design/es6-promise.auto.js"></script>
<!-- 引入Vue -->
<script src="${contextPath}/resources/design/vue@2.6.11.js"></script>
<!-- 引入element -->
<link rel="stylesheet" href="${contextPath}/resources/design/index.css">
<script src="${contextPath}/resources/design/index.js"></script>
<link rel="stylesheet" href="/resources/bui/css/common.css">
<script src="${contextPath}/resources/design/axios.min.js" type="text/javascript"></script>
<script src="${contextPath}/resources/design/vue-ele-form.umd.min.js"></script>
<!-- 通用js -->
<script src="${contextPath}/resources/bui/js/base_list.js" type="text/javascript"></script>
<!-- 遮罩层 -->
<script src="${contextPath}/resources/blockUI/jquery.blockUI.js" type="text/javascript"></script>
<style>
    .el-form-control {
        width: 100%;
    }
    .el-form-control .el-input__inner {
        height: calc(1.5em + .75rem + 2px)!important;
    }
    .element-ui label:first-child {
        margin-bottom: 0;
    }
    .el-cascader, .el-input__inner {
        line-height: unset;
    }
</style>