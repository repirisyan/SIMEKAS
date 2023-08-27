# Tentang SIMEKAS
Sistem informasi manajemen kas atau simekas adalah aplikasi yang dibangun menggunakan framework laravel dan vuejs, bertujuan untuk mengelola client, cashflow dan project yang dikerjakan oleh perusahaan. Dalam aplikasi ini terdapat beberapa fitur diantaranya.
- Client
    - Di dalam Fitur ini user nantinya bisa menyimpan data client yang bersangkutan dengan project di perusahaan
- Project
    - Fitur ini digunakan untuk menyimpan data project, seperti nama,tipe harga jenis kontrak dll
- Cash Flow
    - Fitur cashflow digunakan untuk mencatat data pemasukan dan pengeluaran perusahaan yang data summary nya nanti akan              ditampilkan di dashboard beserta grafiknya

## System Requirement
- Php 8.2 or above
- Mysql 8.0
- nodejs 18 (recommended) or above
- composer
- git

## Tutorial Install
- git clone (repository)
- cd nama_project (gunakan terminal)
- composer install --no-dev
- npm install
- npm run build
- cp .env.example .env
- php artisan storage:link
- Buat Folder cashflow/original, cashflow/thumbnail di storage/app/public
- Konfigurasi File .env
