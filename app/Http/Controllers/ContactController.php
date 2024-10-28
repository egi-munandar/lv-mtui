<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $r)
    {
        $q = $r->q;
        if ($q != "") {
            $contact = Contact::where('name', 'LIKE', '%' . $q . '%')->orWhere('email', 'LIKE', '%' . $q . '%')->paginate(10)->setPath('');
            $pagination = $contact->appends(array(
                'q' => $r->q
            ));
        } else {
            $pagination = Contact::paginate(10);
        }
        return inertia()->render('Contact/ContactPage', [
            'contacts' => $pagination
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $r)
    {
        $r->validate([
            'name' => 'required',
        ]);
        Contact::create([
            'name' => $r->name,
            'email' => $r->email,
            'phone' => $r->phone,
            'company' => $r->company,
        ]);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $r, Contact $contact)
    {
        $r->validate([
            'name' => 'required',
        ]);
        $contact->update([
            'name' => $r->name,
            'email' => $r->email,
            'phone' => $r->phone,
            'company' => $r->company,
        ]);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->back();
    }
}
