<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" href="/image/bank.png" type="image/x-icon"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <title>@yield('title')</title>

    <link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    {{--css files--}}
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">



    <style>
        body
        {
            display: block;
            height: 100%;
            background: url("/image/bank1.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: initial;
        }
        .loader {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url('http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif?e44397') 50% 50% no-repeat rgb(249,249,249);
        }
    </style>


</head>
<body>

<div class="loader col-sm-12 text-center">
    <h1 style="margin-top: 40%;color: lightskyblue">Banks are on the way....</h1>
</div>

@section('content')
@show()
</body>
{{--js file--}}



{{--<script type="text/javascript" src="/js/jquery.min.js"></script>--}}

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<script type="text/javascript" src="/js/pagination.js"></script>
<script type="text/javascript" src="/js/BankDetails.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>

</html>


