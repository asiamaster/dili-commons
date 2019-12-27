<link rel="stylesheet" type="text/css" href="${contextPath}/resources/easyui/css/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/easyui/css/themes/icon.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/easyui/css/themes/color.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/resources/css/common.css">
<!-- 最新版本的 Bootstrap 核心 CSS 文件
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
-->

<link rel="stylesheet" href="${contextPath}/webjars/sweetalert2/7.28.10/dist/sweetalert2.min.css">

<style>
/*bootstrap兼容问题和easyui的bug*/
.panel-body {
	border-width: 0px;
}
.panel-header {
	/* background-color: #F2F2F2; */
	background: -webkit-linear-gradient(top,#ffffff 0,#F2F2F2 100%);
	background: -moz-linear-gradient(top,#ffffff 0,#F2F2F2 100%);
	background: -o-linear-gradient(top,#ffffff 0,#F2F2F2 100%);
	background: linear-gradient(to bottom,#ffffff 0,#F2F2F2 100%);
	/* background-repeat: repeat-x; */
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffff,endColorstr=#F2F2F2,GradientType=0);
	color: #404040;
	border-color: #D4D4D4;
	border-width: 1px;
	border-style: solid;
}
.datagrid, .combo-p {
	border: solid 1px #D4D4D4;
}

/*.datagrid * {
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}*/
</style>