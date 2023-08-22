<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render('Client', [
            'clients' => fn() => Client::when($request->search != null, function($query) use ($request){
                $query->where('name','like','%'.$request->search.'%');
            })->simplePaginate(15)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'company_name' => ['required'],
            'client_email' => ['required', 'email', 'unique:clients,client_email'],
            'whatsapp_number' => ['required', 'numeric', 'unique:clients,whatsapp_number'],
            'address' => ['required']
        ]);

        try {
            Client::create([
                'name' => $request->name,
                'company_name' => $request->company_name,
                'client_email' => $request->client_email,
                'whatsapp_number' => $request->whatsapp_number,
                'address' => $request->address
            ]);
            return to_route('client.index')->with('message', array('success','Data berhasil disimpan'));
        } catch (\Throwable $th) {
            return to_route('client.index')->with('message', array('error','Terjadi kesalahan saat menyimpan data'));
        }
    }

    public function edit($id)
    {
        try {
            $data = Client::where('id', $id)->first();
            return response(json_encode($data));
        } catch (\Throwable $th) {
            return response();
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ['required'],
            'company_name' => ['required'],
            'client_email' => ['required', 'email'],
            'whatsapp_number' => ['required', 'numeric'],
            'address' => ['required']
        ]);
        try {
            Client::find($id)->update([
                'name' => $request->name,
                'company_name' => $request->company_name,
                'client_email' => $request->client_email,
                'whatsapp_number' => $request->whatsapp_number,
                'address' => $request->address
            ]);
            return to_route('client.index')->with('message', array('success','Data berhasil diubah'));
        } catch (\Throwable $th) {
            return to_route('client.index')->with('message', array('error','Terjadi kesalahan saat mengubah data'));
        }
    }

    public function destroy($id)
    {
        try {
            Client::destroy($id);
            return to_route('client.index')->with('message', array('success','Data berhasil dihapus'));
        } catch (\Throwable $th) {
            return to_route('client.index')->with('message', array('error','Terjadi kesalahan saat menghapus data'));
        }
    }
}
