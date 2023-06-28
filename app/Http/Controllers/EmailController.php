<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * @param Request $request
     * @return
     */
    public function toggle(Request $request)
    {
        $preference = Preference::where('user_id', $request->user_id)->first();
        if(!$preference)
        {
            $preference = new Preference();
            $preference->user_id = $request->user_id;
        }
        $preferences = $preference->data;
        $preferences['daily_email'] = $request->new_state;
        $preference->data = $preferences;
        $preference->save();
    }
}
