<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/resources/bui/lib/bootstrap-4.4.1-dist/css/bootstrap.min.css" >
    <link rel="stylesheet" href="/resources/bui/lib/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/resources/bui/lib/bootstrap4pop/css/bs4.pop.css">
    <link rel="stylesheet" href="/resources/bui/lib/bootstrap-table/dist/bootstrap-table.min.css"/>
    <link rel="stylesheet" href="/resources/bui/css/common.css">
    <script src="/resources/bui/lib/jquery/jquery-3.2.1.min.js"></script>
    <title>bui</title>
</head>
<body>
${tag.body}
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="/resources/bui/lib/bootstrap-4.4.1-dist/js/bootstrap.bundle.min.js"></script>
<script src="/resources/bui/lib/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>
<script src="/resources/bui/lib/bootstrap4pop/js/bs4.pop.js"></script>
<script src="/resources/bui/lib/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/resources/bui/lib/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="/resources/bui/lib/laydate/laydate.js"></script>
<script src="/resources/bui/lib/jquery-validation-1.19.1/jquery.validate.min.js"></script>
<script src="/resources/bui/lib/jquery-validation-1.19.1/jquery.validate-extend.js"></script>
<script src="/resources/bui/lib/jquery/jquery.autocomplete.min.js"></script>
<script src="/resources/bui/lib/moment/moment-with-locales.min.js"></script>
<script src="/resources/bui/lib/vendor/art-template.js"></script>
<script src="/resources/bui/lib/log/logger.js"></script>
<script src="/resources/bui/js/number.js"></script>
</body>
<script>
    Logger && (Logger.defaults.remoteUrl = '<#config name="logger.contextPath"/>/api/businessLog/save')
</script>
<#btagBase/>
</html>