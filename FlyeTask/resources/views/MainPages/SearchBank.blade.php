@extends('Frame.frame')
@section('title','Search Banks')
@section('content')




    <div class="col-sm-12 top-bar" style="top: 0px;padding: 2%;position: fixed;z-index: 9999">
        <div class="text-center">
            <h2 style="color: white;"><em class="fa fa-university"></em> Banks, on your door step</h2>
        </div>
        <div class="row" id="div_search">
            <div class="text-left col-sm-6 col-white" style="font-size: 1.1em;">
                <div style="cursor:pointer;" id="btn_back" class="btn"><em class="fa fa-arrow-left"></em> Back</div>
            </div>
            <div class="text-right col-sm-6">
                <em class="fa fa-search col-white" style="font-size: 1.2em"></em>
                <input type="text" class="search_box" id="txt_bank_search" placeholder="Search your bank">
            </div>
        </div>
        <div class="row" id="div_search_dd">
            <div class="text-left col-sm-6 col-white" style="font-size: 1.1em;">
                <div style="cursor:pointer;" id="btn_back" class="btn"><em class="fa fa-arrow-left"></em> Back</div>
            </div>
            <div class="text-right col-sm-6">
                <em class="fa fa-search col-white" style="font-size: 1.2em"></em>
                <select class="search_box text-center" id="dd_city">
                    <option value="" selected disabled>Select City</option>
                    <option value="SURAT">SURAT</option>
                    <option value="MUMBAI">MUMBAI</option>
                    <option value="PUNE">PUNE</option>
                    <option value="DELHI">DELHI</option>
                    <option value="GOA">GOA</option>
                </select>
            </div>
        </div>

    </div>
    {{csrf_field()}}

    <div class="col-sm-12 " style="position: relative;margin-top: 140px">

        <div class="col-sm-12 text-center" id="card_loader">
        </div>
        <div class="row col-sm-12 text-center" id="div_main_cards">
            <div class="col-sm-6 col-white main_card city_name">
                View All Banks of
                <b><span class="" id="lbl_city_name"
                         style="font-size: 1.2em;text-shadow: 0px 0px 5px #1b1e21"></span></b> City
            </div>
            <div class="col-sm-6 col-white  main_card bank_list">
                View Bank City vise
            </div>
        </div>
        <div class="col-sm-12" style="margin-top: 3%;" id="div_show_banks">

        </div>


        <div class="">
            <div class="table-responsive" style="margin-top: 3.5%;" id="div_show_bank_list">
                <div class="col-sm-12 ">
                    <div class="col-sm-3 text-left">
                        <button onclick="printDiv();"
                                style="border-radius: 50px;background: transparent;padding: 10px;width: 50%;outline: none;">
                            Print <em class="fa fa-print"></em></button>
                    </div>
                    <div class="col-sm-3 text-left">
                        <button id="btn_add_fav" data-toggle="modal" data-target="#fav_banks"
                                style="border-radius: 50px;background: transparent;padding: 8px;width: 70%;outline: none;">
                            Favouriets <em class="fa fa-star" style="font-size: 1.4em;color:yellow"></em></button>
                    </div>
                    <div class="col-sm-6 text-right">
                        <em class="fa fa-search text-primary" style="font-size: 1.2em"></em>
                        <input type="text" class="search_box" id="txt_search_table" placeholder="Search">
                    </div>
                </div>
                <script>
                    function printDiv() {
                        var newWin = window.open('', 'Print-Window');
                        $().remove('');
                        newWin.document.open();

                        var $clonedtable = $('#printableArea').clone();

                        // $clonedtable.children().eq(1).children().eq(0).children(0).remove();
                        // / $clonedtable.children().eq(1).children().eq(2).children(0).remove();
                        //checkiing which children is removed
                        //alert($clonedtable.children().eq(3).children().eq(1).remove());

                        newWin.document.write('<html><head><style>@page { size: portrait; }table, tr, th, td{border: solid 0.2px gray;padding: 5px;}</style></head><body onload="window.print()">' + $clonedtable.html() + '</body></html>');
                        newWin.document.close();
                        setTimeout(function () {
                            newWin.close();
                        }, 10);

                    }
                </script>
                <div id="printableArea">
                    <table id="bank_table" class="table-hover table-striped table">
                        <thead>
                        <tr>
                            <th>Bank Name</th>
                            <th>Branch</th>
                            <th>City</th>
                            <th>Favourite</th>
                        </tr>
                        </thead>
                        <tbody id="table_data">
                        </tbody>
                    </table>
                </div>


                <div id="t_body_loader">
                    <div style="height: 50px;width: 100%;background: url('/image/row_loader.gif');background-size: cover;background-repeat: no-repeat;">
                    </div>
                    <div style="height: 50px;width: 100%;background: url('/image/row_loader.gif');background-size: cover;background-repeat: no-repeat;">
                    </div>
                    <div style="height: 50px;width: 100%;background: url('/image/row_loader.gif');background-size: cover;background-repeat: no-repeat;">
                    </div>
                    <div style="height: 50px;width: 100%;background: url('/image/row_loader.gif');background-size: cover;background-repeat: no-repeat;">
                    </div>

                </div>
            </div>
        </div>


    </div>

    <div class="modal fade " id="fav_banks" role="dialog" style="z-index: 99999">
        <div class="modal-dialog modal-lg ">
            <!-- Modal content-->
            <div class="col-sm-12 modal-content modal_design col-white">
                <div class="col-sm-12">
                    <div class="col-sm-12 text-center" style="margin-top: 5%">
                        <span style="font-size: 2em">Favourites <em class="fa fa-star-o"
                                                                    style="color: yellow;"></em></span>
                    </div>
                    <div id="div_fav_banks" class="" style="margin-top: 5%;overflow: scroll"></div>
                    <div id="div_fav_banks_loader" class="col-sm-12 text-center" style="margin-top: 5%">
                        <img src="/image/fav_loader.gif" width="800">
                    </div>
                    <div class="col-sm-12 text-right" style="margin: 2%;position: relative">
                        <button style="background: transparent;border-radius: 50px;border: 2px solid yellow;color: yellow;letter-spacing: 2px"
                                type="button" class="btn btn-default" data-dismiss="modal">Close
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
    </div>




    <script src="https://js.api.here.com/v3/3.0/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
    <script src="https://js.api.here.com/v3/3.0/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
@endsection()
