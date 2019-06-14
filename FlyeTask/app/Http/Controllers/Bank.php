<?php

namespace App\Http\Controllers;

use App\Fav_bank;
use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class Bank extends Controller
{
    public function getBanks()
    {
//        $client = new Client();
//        $api_response = $client->get('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
//        $bank_details = json_decode($api_response->getBody());
        return view('MainPages.SearchBank');
    }
//    public function getBanksCityVise(Request $request)
//    {
//        $city = $request->city;
//        $client = new Client();
//        $api_response = $client->get('https://vast-shore-74260.herokuapp.com/banks?city='.$city);
//        $bank_details = json_decode($api_response->getBody());
//        return $bank_details;
//    }

    public function add_fav_banks(Request $request)
    {
        $bank = DB::table('fav_banks')->where('bank_id', '=', $request->b_id)->select('bank_id')->get();
        if (sizeof($bank) != 0) {
            DB::table('fav_banks')->where('bank_id','=',$request->b_id)->delete();
            return "unfav";
        } else {
            $fav_bank = new Fav_bank();

            $fav_bank->bank_id = $request->b_id;
            $fav_bank->bank_name = $request->b_name;
            $fav_bank->branch = $request->brnch;
            $fav_bank->city = $request->city;

            $fav_bank->save();
            return "fav";
        }


    }

    public function get_fav_banks()
    {
        $bank_details = DB::table('fav_banks')->select('bank_id','bank_name','branch','city')->get();
        return $bank_details;
    }

    public function bank_page(Request $request)
    {
        $b_id = $request->bank_id;
        return view('MainPages.BankPage',compact('b_id'));
    }

}
