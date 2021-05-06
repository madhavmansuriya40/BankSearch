$(document).ready(function () {

    var html_data;
    var loader_data = "";
    var bank_list = "";
    var local = "";

    var base_city = "";
    $("#div_search").hide();
    $("#div_show_bank_list").hide();
    $("#div_search_dd").hide();
    $("#div_show_bank_list").hide();
    $("#t_body_loader").hide();
    $("#div_fav_banks").hide();


    var platform = new H.service.Platform({
        "useHTTPS": true,
        "app_id": "BjmHZnahwYeQWLjbemD7",
        "app_code": "hfv2htIlBXllnGcyOo7CBw"
    });
    var geocoder = platform.getGeocodingService();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            geocoder.reverseGeocode(
                {
                    mode: "retrieveAddresses",
                    maxresults: 1,
                    prox: position.coords.latitude + "," + position.coords.longitude
                }, data => {
                    console.log(data);
                    var city = data.Response.View[0].Result[0].Location.Address.City;
                    $("#lbl_city_name").html(city);
                    base_city = city.toUpperCase();
                    local = base_city;
                    $(".city_name").attr('id', city);
                    // alert("Would you like to view banks of :\n" + data.Response.View[0].Result[0].Location.Address.City);
                }, error => {
                    console.error(error);
                }
            );
        });
    } else {
        console.error("Geolocation is not supported by this browser!");
    }

    $(document).on('click', '.city_name', function () {

        $("#div_main_cards").fadeOut(500);
        $("#div_show_banks").html('');
        for (var i = 0; i < 8; i++) {
            loader_data = loader_data + '<div class="col-sm-3 card-bg_loader card-size" style="height: 220px;border-radius: 0px;box-shadow: 0px 0px 20px #1b1e21;">\n' +
                '</div>';
        }
        $("#card_loader").html(loader_data);
        $("#card_loader").fadeIn();
        var city_to_search = $(this).attr("id");
        city_to_search = city_to_search.toUpperCase();
        $.ajax({
            url: "https://vast-shore-74260.herokuapp.com/banks?city=" + city_to_search,
            success: function (result) {
                console.log(result);
                html_data = "";

                for (var i = 0; i < result.length; i++) {
                    html_data = html_data + ' <div id=' + result[i].bank_id + ' class="col-sm-3 card-bg card-size btn"\n' +
                        'style="border-radius: 0px;box-shadow: 0px 0px 20px #1b1e21;cursor: pointer">\n' +
                        '<div class="text-center">\n' +
                        '<em class="fa fa-university fa-2x col-white" style="padding: 5%;"></em>\n' +
                        '</div>\n' +
                        '<div class="">\n' +
                        '<h4 class="card-title col-white" style="font-weight: 600;overflow: scroll"><a style="text-decoration: none;color: white" href=banks/' + result[i].bank_id + '>' + result[i].bank_name + '</a></h4>\n' +
                        '<p class="card-text col-white" style="overflow: scroll">City: ' + result[i].city + '</p>\n' +
                        '<div class="col-sm-12">\n' +
                        '<div class="col-white" style="overflow: scroll">Branch: ' + result[i].branch + '</div>\n' +
                        '</div>\n' +
                        '<div class="col-sm-12">\n' +
                        '<div class="col-white" style="overflow: scroll">IFSC: ' + result[i].ifsc + '</div>\n' +
                        '</div>\n' +
                        '</div>\n' +
                        '</div>';
                }

                $("#div_show_banks").html(html_data);
                $("#card_loader").fadeOut(500);
                $("#div_show_banks").fadeIn(500);
                $("#div_search").fadeIn(500);
            }
        });
    });

    $(document).ready(function () {
        $("#txt_bank_search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".card-size").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    $(document).ready(function () {
        $("#txt_search_table").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


    $(document).on("click", "#btn_back", function () {
        $("#div_show_banks").fadeOut(500);
        $("#div_search").fadeOut(500);
        $("#div_show_bank_list").fadeOut(500);
        $("#div_search_dd").fadeOut(500);
        $("#div_main_cards").fadeIn(500);

    });

    $(".bank_list").click(function () {

        $("#t_body_loader").fadeIn(500);
        $("#table_data").fadeOut(500);
        $("#div_main_cards").fadeOut(500);

        $("#table_data").html('');
        var html_data = "";

        let last_search = localStorage.getItem(local);

        if (last_search) {
            result = JSON.parse(last_search);
            console.log(result);

            for (var i = 0; i < result.length; i++) {

                html_data = html_data + '<tr>' +
                    '<td><a style="text-decoration: none" href=banks/' + result[i].bank_id + '>' + result[i].bank_name + '</a></td>' +
                    '<td>' + result[i].branch + '</td>' +
                    '<td>' + result[i].city + '</td>' +
                    '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + result[i].ifsc + '><em class="fa fa-star-o" style="font-size: 1.4em"></em></td>' +
                    '</tr>';
            }

            $("#table_data").html(html_data);
            $('#bank_table').DataTable();
        }
        else {


            $.ajax({
                url: "https://vast-shore-74260.herokuapp.com/banks?city=" + base_city,
                success: function (result) {

                    localStorage.setItem(local, JSON.stringify(result));


                    for (var i = 0; i < result.length; i++) {

                        html_data = html_data + '<tr>' +
                            '<td><a style="text-decoration: none" href=banks/' + result[i].bank_id + '>' + result[i].bank_name + '</a></td>' +
                            '<td>' + result[i].branch + '</td>' +
                            '<td>' + result[i].city + '</td>' +
                            '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + result[i].ifsc + '><em class="fa fa-star-o" style="font-size: 1.4em"></em></td>' +
                            '</tr>';
                    }
                    $("#table_data").html(html_data);
                    $('#bank_table').DataTable();
                }
            });
        }

        $("#table_data").fadeIn(500);

        $("#t_body_loader").fadeOut(500);
        $("#div_show_bank_list").fadeIn(500);
        $("#div_search_dd").fadeIn(500);
    });

    $("#dd_city").change(function () {
        var base_city = $('#dd_city option:selected').text();

        $('#bank_table').DataTable().destroy();

        $("#t_body_loader").fadeIn(150);
        $("#table_data").fadeOut(50);

        $("#table_data").html('');
        var html_data = "";

        let last_bank_search = localStorage.getItem(base_city);

        if (last_bank_search) {
            result = JSON.parse(last_bank_search);


            for (var i = 0; i < result.length; i++) {
                html_data = html_data + '<tr>' +
                    '<td><a style="text-decoration: none" href=banks/' + result[i].bank_id + '>' + result[i].bank_name + '</td>' +
                    '<td>' + result[i].branch + '</td>' +
                    '<td>' + result[i].city + '</td>' +
                    '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + result[i].ifsc + '><em class="fa fa-star-o" style="font-size: 1.4em"></em></td>' +
                    '</tr>'
            }
            $("#table_data").html(html_data);
            $('#bank_table').DataTable();
        }
        else {


            $.ajax({
                url: "https://vast-shore-74260.herokuapp.com/banks?city=" + base_city,
                success: function (result) {

                    localStorage.setItem(base_city, JSON.stringify(result));

                    for (var i = 0; i < result.length; i++) {
                        html_data = html_data + '<tr>' +
                            '<td><a style="text-decoration: none" href=banks/' + result[i].bank_id + '>' + result[i].bank_name + '</td>' +
                            '<td>' + result[i].branch + '</td>' +
                            '<td>' + result[i].city + '</td>' +
                            '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + result[i].ifsc + '><em class="fa fa-star-o" style="font-size: 1.4em"></em></td>' +
                            '</tr>'
                    }

                    $("#table_data").html(html_data);
                    $('#bank_table').DataTable();
                }
            });
        }
        $("#table_data").fadeIn(500);
        $("#t_body_loader").fadeOut(500);
    });
    $(document).on('click', '.add_to_favourite', function () {
        $("#div_fav_banks").html('');
        $("#div_fav_banks_loader").fadeIn(200);

        var b_id = $(this).attr("id");
        var bank_name = $(this).siblings().eq(0)[0].innerHTML;
        var branch = $(this).siblings().eq(1)[0].innerHTML;
        var city = $(this).siblings().eq(2)[0].innerHTML;

        $.post('/add_fav_banks', {
            'b_id': b_id,
            'b_name': bank_name,
            'brnch': branch,
            'city': city,
            '_token': $('input[name=_token]').val()
        }, function (data) {
            if (data == "fav") {
                $.post('/get_fav_banks', {
                    '_token': $('input[name=_token]').val()
                }, function (data) {
                    var html_data = "";
                    if (data.length != 0) {
                        html_data = "";
                        html_data = html_data + '<table class="table">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>Bank Ifsc</th>' +
                            '<th>Bank Name</th>' +
                            '<th>Bank Branch</th>' +
                            '<th>Bank City</th>' +
                            '<th>Remove Favourite</th>' +
                            '</tr>' +
                            '</thead><tbody style="">';
                        for (var i = 0; i < data.length; i++) {
                            html_data = html_data + '<tr>' +
                                '<td>' + data[i].bank_id + '</td>' +
                                '<td>' + data[i].bank_name + '</td>' +
                                '<td>' + data[i].branch + '</td>' +
                                '<td>' + data[i].city + '</td>' +
                                '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + data[i].bank_id + '><em class="fa fa-star-o rmv_fav" style="font-size: 1.4em;outline: none"></em></td>' +
                                '</tr>'
                        }
                        html_data = html_data + '</tbody>' +
                            '</table>'
                    }
                    else {
                        html_data = "<div class='text-center' style='margin-top: 200px'><h4>No banks added to favourite yet</h4></div>"
                    }

                    $("#div_fav_banks").html(html_data);
                    $("#div_fav_banks_loader").fadeOut(200);
                    $("#div_fav_banks").fadeIn(500);
                    alert("added to favourite");
                });
            }
            if (data == "unfav") {
                $.post('/get_fav_banks', {
                    '_token': $('input[name=_token]').val()
                }, function (data) {
                    var html_data = "";
                    if (data.length != 0) {
                        html_data = "";
                        html_data = html_data + '<table class="table">' +
                            '<thead>' +
                            '<tr>' +
                            '<th>Bank Ifsc</th>' +
                            '<th>Bank Name</th>' +
                            '<th>Bank Branch</th>' +
                            '<th>Bank City</th>' +
                            '<th>Remove Favourite</th>' +
                            '</tr>' +
                            '</thead><tbody style="">';
                        for (var i = 0; i < data.length; i++) {
                            html_data = html_data + '<tr>' +
                                '<td>' + data[i].bank_id + '</td>' +
                                '<td>' + data[i].bank_name + '</td>' +
                                '<td>' + data[i].branch + '</td>' +
                                '<td>' + data[i].city + '</td>' +
                                '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + data[i].bank_id + '><em class="fa fa-star-o rmv_fav" style="font-size: 1.4em;outline: none"></em></td>' +
                                '</tr>'
                        }
                        html_data = html_data + '</tbody>' +
                            '</table>'
                    }
                    else {
                        html_data = "<div class='text-center' style='margin-top: 200px'><h4>No banks added to favourite yet</h4></div>"
                    }

                    $("#div_fav_banks").html(html_data);
                    $("#div_fav_banks_loader").fadeOut(200);
                    $("#div_fav_banks").fadeIn(500);

                });

            }
        });
        $("#div_fav_banks_loader").fadeOut(200);
        $("#div_fav_banks").fadeIn(500);
    });

    $("#btn_add_fav").click(function () {

        $("#div_fav_banks").html('');
        $("#div_fav_banks_loader").fadeIn(200);

        $.post('/get_fav_banks', {
            '_token': $('input[name=_token]').val()
        }, function (data) {
            var html_data = "";
            if (data.length != 0) {
                html_data = "";
                html_data = html_data + '<table class="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Bank Ifsc</th>' +
                    '<th>Bank Name</th>' +
                    '<th>Bank Branch</th>' +
                    '<th>Bank City</th>' +
                    '<th>Remove Favourite</th>' +
                    '</tr>' +
                    '</thead><tbody style="">';
                for (var i = 0; i < data.length; i++) {
                    html_data = html_data + '<tr>' +
                        '<td>' + data[i].bank_id + '</td>' +
                        '<td>' + data[i].bank_name + '</td>' +
                        '<td>' + data[i].branch + '</td>' +
                        '<td>' + data[i].city + '</td>' +
                        '<td style="cursor: pointer" class="text-center btn add_to_favourite" id=' + data[i].bank_id + '><em class="fa fa-star-o rmv_fav" style="font-size: 1.4em;outline: none"></em></td>' +
                        '</tr>'
                }
                html_data = html_data + '</tbody>' +
                    '</table>'
            }
            else {
                html_data = "<div class='text-center' style='margin-top: 200px'><h4>No banks added to favourite yet</h4></div>"
            }

            $("#div_fav_banks").html(html_data);
            $("#div_fav_banks_loader").fadeOut(200);
            $("#div_fav_banks").fadeIn(500);

        });
    });
});
