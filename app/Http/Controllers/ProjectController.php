<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request){
        
        $clients = Client::select('id','name')->get();
        $search = $request->search;
        $project_type = $request->project_type;
        return Inertia::render('Project',[
            'projects' => fn() => Project::with('client')->when($search != null, function($query) use($search){
                $query->where('project_name',$search);
            })->when($project_type != null, function($query) use ($project_type){
                $query->where('project_type',$project_type);
            })->simplePaginate(15),
            'clients' => $clients
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'client_id' => 'required',
            'project_name' => 'required',
            'project_type' => 'required',
            'description' => 'required',
            'project_worth' => 'required|numeric',
            'start_from' => 'required|date',
            'until' => 'required|date',
            'project_warranty' => 'date|nullable',
            'host_type' => 'required',
            'domain_name' => 'nullable',
            'contract_from' => 'nullable|date',
            'contract_until' => 'nullable|date',
            'price' => 'nullable|numeric'
        ]);
        try {
            Project::create([
                'client_id' => $request->client_id,
                'project_name' => $request->project_name,
                'project_type' => $request->project_type,
                'description' => $request->description,
                'project_worth' => $request->project_worth,
                'start_from' => $request->start_from,
                'until' => $request->until,
                'project_warranty' => $request->project_warranty,
                'project_status' => $request->project_type == '2' ? true : false,
                'host_type' => $request->host_type,
                'domain_name' => $request->domain_name,
                'contract_from' => $request->contract_from,
                'contract_until' => $request->contract_until,
                'price' => $request->price,
                'contract_status' => true
            ]);
            return to_route('project.index')->with('message',array('success','Data berhasil disimpan'));
        } catch (Exception $e) {
            return to_route('project.index')->with('message',array('success','Terjadi kesalahan saat menyimpan data'));
        }
    }

    public function edit($id){
        try {
            $project = Project::where('id',$id)->first();
            return response(json_encode($project));
        } catch (Exception $e) {
            return response();
        }
    }

    public function update(Request $request, $id){
        $request->validate([
            'client_id' => 'required',
            'project_name' => 'required',
            'project_type' => 'required',
            'description' => 'required',
            'project_worth' => 'required|numeric',
            'start_from' => 'required|date',
            'until' => 'required|date',
            'project_warranty' => 'date|nullable',
            'host_type' => 'required',
            'domain_name' => 'nullable',
            'contract_from' => 'nullable|date',
            'contract_until' => 'nullable|date',
        ]);
        try {
            Project::find($id)->update([
                'client_id' => $request->client_id,
                'project_name' => $request->project_name,
                'project_type' => $request->project_type,
                'description' => $request->description,
                'project_worth' => $request->project_worth,
                'start_from' => $request->start_from,
                'until' => $request->until,
                'project_warranty' => $request->project_warranty,
                'host_type' => $request->host_type,
                'domain_name' => $request->domain_name,
                'contract_from' => $request->contract_from,
                'contract_until' => $request->contract_until
            ]);
            return to_route('project.index')->with('message',array('success','Data berhasil diubah'));
        } catch (Exception $e) {
            return to_route('project.index')->with('message',array('success','Terjadi kesalahan saat mengubah data'));
        }
    }

    public function destroy($id){
        try {
            Project::destroy($id);
            return to_route('project.index')->with('message',array('success','Data berhasil dihapus'));
        } catch (Exception $e) {
            return to_route('project.index')->with('message',array('success','Terjadi kesalahan saat menghapus data'));
        }
    }
}
