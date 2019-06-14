<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" href="/image/bank.png" type="image/x-icon"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/x-icon" href="https://www.herokucdn.com/favicons/favicon.ico" />
    <link rel="mask-icon" href="https://www.herokucdn.com/favicons/icon.svg" color="#79589f">
    <link rel="apple-touch-icon" type="image/png" href="/image/bank.png">
    <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/image/bank.png">
    <link rel="apple-touch-icon" type="image/png" sizes="167x167" href="/image/bank.png">
    <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/image/bank.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/image/bank.png">


    <title>@yield('title')</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    {{--css files--}}
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    {{--<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">--}}
    <link rel="stylesheet" type="text/css" href="css/style.css">




</head>
<body>
@section('content')
    @show()
</body>
{{--js file--}}



{{--<script type="text/javascript" src="/js/jquery.min.js"></script>--}}

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script type="text/javascript" src="/js/BankDetails.js"></script>
<script type="text/javascript" src="/js/pagination.js"></script>
<script type="text/javascript" src="/js/data_table.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
{{--<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>--}}
</html>


