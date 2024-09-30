<?php

namespace App\Http\Controllers;

use App\Models\CashFlow;
use App\Models\MoneyBalance;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Image\Image;

class CashFlowController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('CashFlow', [
            'cashflows' => fn () => CashFlow::with('user')->when($request->search != null, function ($query) use ($request) {
                $query->where('title', 'like', '%'.$request->search.'%');
            })->when($request->type != null, function ($query) use ($request) {
                $query->where('type', $request->type);
            })->orderBy('created_at', 'desc')->simplePaginate(15)->withQueryString(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'type' => 'required',
            'description' => 'nullable',
            'image' => 'nullable|image',
            'amount' => 'required|numeric',
        ]);
        try {
            $filename = null;
            if ($request->hasFile('image')) {
                $filename = rand().'.webp';
                Image::load($request->file('image'))->save(storage_path('app/public/cashflow/original/'.$filename));
                Image::load($request->file('image'))->width(100)->height(100)->save(storage_path('app/public/cashflow/thumbnail/'.$filename));
            }
            DB::transaction(function () use ($request, $filename) {
                CashFlow::create([
                    'user_id' => Auth::user()->id,
                    'title' => $request->title,
                    'type' => $request->type,
                    'description' => $request->description,
                    'image' => $filename,
                    'amount' => $request->amount,
                ]);
                if ($request->type == '1') {
                    MoneyBalance::find(1)->increment('balance', $request->amount);
                } else {
                    MoneyBalance::find(1)->decrement('balance', $request->amount);
                }

            });

            return to_route('cashflow.index')->with('message', ['success', 'Data berhasil disimpan']);
        } catch (Exception $e) {
            return to_route('cashflow.index')->with('message', ['error', 'Terjadi kesalahan saat menyimpan data']);
        }
    }

    public function edit($id)
    {
        try {
            $cashflow = CashFlow::where('id', $id)->first();

            return response(json_encode($cashflow));
        } catch (Exception $e) {
            return response();
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'type' => 'required',
            'description' => 'nullable',
            'new_image' => 'nullable|image',
            'new_amount' => 'required|numeric',
        ]);
        try {
            if ($request->hasFile('new_image')) {
                Storage::delete(['public/cashflow/original/'.$request->image, 'public/cashflow/thumbnail/'.$request->image]);
                $request->image = rand().'.webp';
                $originalImage = Image::load($request->file('new_image'))->format(Manipulations::FORMAT_WEBP)->optimize()->save(storage_path('app/public/cashflow/original/'.$request->image));
                $thumbnailImage = Image::load($request->file('new_image'))->format(Manipulations::FORMAT_WEBP)->width(100)->height(100)->optimize()->save(storage_path('app/public/cashflow/thumbnail/'.$request->image));
            }
            DB::transaction(function () use ($request) {
                CashFlow::find($request->cashflow_id)->update([
                    'user_id' => Auth::user()->id,
                    'title' => $request->title,
                    'type' => $request->type,
                    'description' => $request->description,
                    'image' => $request->image,
                    'amount' => $request->new_amount,
                ]);
                if ($request->type == '1') {
                    MoneyBalance::find(1)->decrement('balance', $request->amount);
                    MoneyBalance::find(1)->increment('balance', $request->new_amount);
                } else {
                    MoneyBalance::find(1)->increment('balance', $request->amount);
                    MoneyBalance::find(1)->decrement('balance', $request->new_amount);
                }

            });

            return to_route('cashflow.index')->with('message', ['success', 'Data berhasil diubah']);
        } catch (Exception $e) {
            return to_route('cashflow.index')->with('message', ['error', 'Terjadi kesalahan saat mengubah data']);
        }
    }

    public function destroy($id)
    {
        try {
            $data = CashFlow::select('image', 'amount')->where('id', $id)->first();
            if ($data->image != null) {
                Storage::delete(['public/cashflow/original/'.$data->image, 'public/cashflow/thumbnail/'.$data->image]);
            }
            DB::transaction(function () use ($id, $data) {
                MoneyBalance::find(1)->decrement('balance', $data->amount);
                CashFlow::destroy($id);
            });

            return to_route('cashflow.index')->with('message', ['success', 'Data berhasil dihapus']);
        } catch (Exception $e) {
            return to_route('cashflow.index')->with('message', ['error', 'Terjadi kesalahan saat menghapus data']);
        }
    }
}
