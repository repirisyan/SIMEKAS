<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import { ref,computed } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Table from "@/Components/Table.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import TextArea from "@/Components/TextArea.vue";
import SelectInput from "@/Components/SelectInput.vue";
import { useForm } from "@inertiajs/vue3";
import DangerButton from "@/Components/DangerButton.vue";
import Toastr from "@/Components/Toaster.vue";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import { router } from "@inertiajs/vue3";

const modal = ref(false);
const modalHapus = ref(false);
const modalDetail = ref(false);

const page = usePage();

const props = defineProps({
    clients: Object,
    projects: Object,
});

const isTableEmpty = computed(() => {
    return Object.keys(props.projects.data).length == 0;
});

let titleModal = null;
let id_project = null;

const projectForm = useForm({
    client_id: null,
    project_name: null,
    project_type: null,
    description: null,
    project_worth: null,
    start_from: null,
    until: null,
    project_warranty: null,
    host_type: null,
    domain_name: null,
    contract_from: null,
    contract_until: null,
    price: null,
});

const filterForm = useForm({
    search: null,
    project_type: "",
});

const formHapus = useForm({
    project_id: null,
    project_name: null,
});

const openModal = (modalTitle, project_id = null) => {
    modal.value = true;
    titleModal = modalTitle;
    id_project = project_id;
    if (modalTitle == "Modal Ubah") {
        axios
            .get("project/" + project_id + "/edit")
            .then((response) => {
                projectForm.client_id = response.data.client_id;
                projectForm.project_name = response.data.project_name;
                projectForm.project_type = response.data.project_type;
                projectForm.description = response.data.description;
                projectForm.project_worth = response.data.project_worth;
                projectForm.start_from = response.data.start_from;
                projectForm.until = response.data.until;
                projectForm.project_warranty = response.data.project_warranty;
                projectForm.host_type = response.data.host_type;
                projectForm.domain_name = response.data.domain_name;
                projectForm.contract_from = response.data.contract_from;
                projectForm.contract_until = response.data.contract_until;
            })
            .catch((error) => {
                page.props.flash.message = error;
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            });
    }
};

const closeModal = () => {
    modal.value = false;
    projectForm.reset();
    projectForm.clearErrors();
};

const projectSubmit = () => {
    console.log("test");
    if (titleModal == "Modal Tambah") {
        projectForm.post(route("project.store"), {
            preserveScroll: true,
            onSuccess: () => {
                modal.value = false;
                projectForm.reset();
                projectForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    } else {
        projectForm.patch(route("project.update", id_project), {
            preserveScroll: true,
            onSuccess: () => {
                modal.value = false;
                projectForm.reset();
                projectForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    }
};

const openModalHapus = (project_id, project_name) => {
    modalHapus.value = true;
    formHapus.project_id = project_id;
    formHapus.project_name = project_name;
};

const closeModalHapus = () => {
    modalHapus.value = false;
    formHapus.reset();
    formHapus.clearErrors();
};

const formDetail = useForm({
    host_type: null,
    description: null,
    domain_name: null,
    contract_from: null,
    contract_until: null,
    price: null,
    contract_status: null,
});

const openModalDetail = (
    host_type,
    description,
    domain_name,
    contract_from,
    contract_until,
    price,
    contract_status,
) => {
    modalDetail.value = true;
    formDetail.host_type = host_type;
    formDetail.description = description;
    formDetail.domain_name = domain_name;
    formDetail.contract_from = contract_from;
    formDetail.contract_until = contract_until;
    formDetail.price = price;
    formDetail.contract_status = contract_status;
};

const closeModalDetail = () => {
    modalDetail.value = false;
    formDetail.reset();
};

const destroyProject = () => {
    formHapus.delete(route("project.destroy", formHapus.project_id), {
        preserveScroll: true,
        onSuccess: () => {
            modalHapus.value = false;
            formHapus.reset();
            formHapus.clearErrors();
            setTimeout(() => {
                page.props.flash.message = null;
            }, 2000);
        },
    });
};

const filterCashFlow = () => {
    router.visit("project", {
        data: {
            search: filterForm.search,
            project_type: filterForm.project_type,
        },
        replace: true,
        preserveState: true,
    });
};

</script>

<template>
    <AppLayout title="Project">
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Project
            </h2>
        </template>

        <Toastr
            v-if="$page.props.flash.message != null"
            :response="$page.props.flash.message"
        />
        <div class="p-12">
            <div class="card w-auto bg-white dark:bg-gray-800 shadow-xl">
                <div class="card-body">
                    <div
                        class="card-title flex overflow-x-auto"
                    >
                        <PrimaryButton
                            class="mr-2"
                            @click="openModal('Modal Tambah')"
                            >Tambah&nbsp;+
                        </PrimaryButton>
                        <div class="join w-full sm:justify-end">
                            <div>
                                <div>
                                    <input
                                        v-model.lazy="filterForm.search"
                                        class="input input-bordered join-item w-auto"
                                        placeholder="Cari Nama Project"
                                    />
                                </div>
                            </div>
                            <select
                                v-model.lazy="filterForm.project_type"
                                class="select select-bordered join-item w-auto sm:w-32"
                            >
                                <option value="" selected>
                                    Semua Tipe Project
                                </option>
                                <option value="1">Custom Project</option>
                                <option value="2">Partnership</option>
                                <option value="3">Maintenance</option>
                            </select>
                            <div class="indicator w-auto">
                                <button
                                    @click="filterCashFlow"
                                    class="btn join-item"
                                >
                                    Cari
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table
                        :theads="[
                            'Client',
                            'Nama Project',
                            'Tipe Project',
                            'Tanggal',
                            'Harga Project',
                            'Garansi',
                            'Status',
                            'Aksi',
                        ]"
                        :empty="isTableEmpty"
                        :current_page="props.projects.current_page"
                        :next_page="props.projects.next_page_url"
                        :prev_page="
                            route('project.index') +
                            '?page=' +
                            (props.projects.current_page - 1)
                        "
                    >
                        <template #content>
                            <tr
                                v-for="project in props.projects.data"
                                :key="project.id"
                                class="hover"
                            >
                                <td>{{ project.client.name }}</td>
                                <td>{{ project.project_name }}</td>
                                <td>
                                    {{
                                        project.project_type == "1"
                                            ? "Custom Project"
                                            : project.project_type == "2"
                                            ? "Partnership"
                                            : "Maintenance"
                                    }}
                                </td>
                                <td>
                                    {{new Date(project.start_from).toLocaleDateString("id-ID") }} -
                                    {{ new Date(project.until).toLocaleDateString("id-ID") }}
                                </td>
                                <td>Rp.
                                    {{
                                        new Intl.NumberFormat("id-ID").format(project.project_worth)
                                    }}
                                </td>
                                <td>
                                    {{ project.warranty ?? "-" }}
                                </td>
                                <td v-if="project.project_type == '2'">
                                    <div
                                        class="badge gap-2"
                                        :class="
                                            project.project_status == true
                                                ? 'badge-success'
                                                : 'badge-error'
                                        "
                                    >
                                        {{
                                            project.project_status == true
                                                ? "Bermitra"
                                                : "Expire"
                                        }}
                                    </div>
                                </td>
                                <td v-else>
                                    <div
                                        class="badge gap-2"
                                        :class="
                                            project.project_status == true
                                                ? 'badge-success'
                                                : 'badge-error'
                                        "
                                    >
                                        {{
                                            project.project_status == true
                                                ? "Selesai"
                                                : "Proses Pengerjaan"
                                        }}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        class="mr-3" :class="project.contract_status == false ? 'text-error' : 'text-info'"
                                        @click="
                                            openModalDetail(
                                                project.host_type,
                                                project.description,
                                                project.domain_name,
                                                project.contract_from,
                                                project.contract_until,
                                                project.price,
                                                project.contract_status,
                                            )
                                        "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        class="mr-3 text-warning"
                                        @click="
                                            openModal('Modal Ubah', project.id)
                                        "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-error"
                                        @click="
                                            openModalHapus(
                                                project.id,
                                                project.project_name,
                                            )
                                        "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
            </div>
        </div>

        <DialogModal :show="modal" @close="modal = false">
            <template #title>
                {{ titleModal }}
            </template>
            <template #content>
                <div class="grid grid-cols-1 gap-3 px-8">
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="client_id" value="Nama Client" />
                        <SelectInput
                            id="client_id"
                            v-model.lazy="projectForm.client_id"
                            class="mt-1 block w-full"
                            :disabled="projectForm.processing"
                        >
                            <template #option>
                                <option value="">-- Pilih Client --</option>
                                <option
                                    v-for="client in props.clients"
                                    :key="client.id"
                                    :value="client.id"
                                >
                                    {{ client.name }}
                                </option>
                            </template>
                        </SelectInput>
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.client_id"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="project_name" value="Nama Project" />
                        <TextInput
                            id="project_name"
                            v-model.lazy="projectForm.project_name"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="project_name"
                            :readonly="projectForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.project_name"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="project_type" value="Tipe Project" />
                        <SelectInput
                            id="project_type"
                            v-model.lazy="projectForm.project_type"
                            class="mt-1 block w-full"
                            :disabled="projectForm.processing"
                        >
                            <template #option>
                                <option value="">
                                    -- Pilih Tipe Project --
                                </option>
                                <option value="1">Custom Project</option>
                                <option value="2">Parthnership</option>
                                <option value="3">Maintenance</option>
                            </template>
                        </SelectInput>
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.project_type"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="description" value="Deskripsi" />
                        <TextArea
                            id="description"
                            v-model.lazy="projectForm.description"
                            :readonly="projectForm.processing"
                            class="mt-1 block w-full"
                        />
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.description"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="project_worth" :value="'Harga Project (Rp.'+new Intl.NumberFormat('id-ID').format(projectForm.project_worth)+')'" />
                        <TextInput
                            id="project_worth"
                            v-model.lazy="projectForm.project_worth"
                            type="number"
                            min="0"
                            class="mt-1 block w-full"
                            autocomplete="project_worth"
                            :readonly="projectForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.project_worth"
                        />
                    </div>
                    <div class="grid sm:grid-cols-2 gap-3 grid-cols-1">
                        <div>
                            <InputLabel
                                for="start_from"
                                value="Tanggal Mulai"
                            />
                            <TextInput
                                id="start_from"
                                v-model.lazy="projectForm.start_from"
                                type="date"
                                class="mt-1 block w-full"
                                autocomplete="start_from"
                                :readonly="projectForm.processing"
                            />
                            <InputError
                                class="mt-2"
                                :message="projectForm.errors.start_from"
                            />
                        </div>
                        <div>
                            <InputLabel for="until" value="Tanggal Selesai" />
                            <TextInput
                                id="until"
                                v-model.lazy="projectForm.until"
                                type="date"
                                class="mt-1 block w-full"
                                autocomplete="until"
                                :readonly="projectForm.processing"
                            />
                            <InputError
                                class="mt-2"
                                :message="projectForm.errors.until"
                            />
                        </div>
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="host_type" value="Tipe Hosting" />
                        <SelectInput
                            id="host_type"
                            v-model.lazy="projectForm.host_type"
                            class="mt-1 block w-full"
                            :disabled="projectForm.processing"
                        >
                            <template #option>
                                <option value="">
                                    -- Pilih Tipe Hosting --
                                </option>
                                <option value="1">Hosting Sendiri</option>
                                <option value="2">Sewa Hosting</option>
                            </template>
                        </SelectInput>
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.host_type"
                        />
                    </div>
                    <div
                        v-if="projectForm.host_type == '2'"
                        class="col-span-6 sm:col-span-4"
                    >
                        <InputLabel for="domain_name" value="Nama Domain" />
                        <TextInput
                            id="domain_name"
                            v-model.lazy="projectForm.domain_name"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="domain_name"
                            required
                            :readonly="projectForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.domain_name"
                        />
                    </div>
                    <div
                        v-if="projectForm.host_type == '2'"
                        class="grid sm:grid-cols-2 gap-3 grid-cols-1"
                    >
                        <div>
                            <InputLabel
                                for="contract_from"
                                value="Contract Mulai Tanggal"
                            />
                            <TextInput
                                id="contract_from"
                                v-model.lazy="projectForm.contract_from"
                                type="date"
                                class="mt-1 block w-full"
                                autocomplete="contract_from"
                                required
                                :readonly="projectForm.processing"
                            />
                            <InputError
                                class="mt-2"
                                :message="projectForm.errors.contract_from"
                            />
                        </div>
                        <div>
                            <InputLabel for="contract_until" value="Sampai" />
                            <TextInput
                                id="contract_until"
                                v-model.lazy="projectForm.contract_until"
                                type="date"
                                class="mt-1 block w-full"
                                autocomplete="contract_until"
                                required
                                :readonly="projectForm.processing"
                            />
                            <InputError
                                class="mt-2"
                                :message="projectForm.errors.contract_until"
                            />
                        </div>
                    </div>
                    <div
                        v-if="projectForm.host_type == '2'"
                        class="col-span-6 sm:col-span-4"
                    >
                        <InputLabel for="price" :value="'Harga Hosting (Rp.'+new Intl.NumberFormat('id-ID').format(projectForm.price)+')'" />
                        <TextInput
                            id="price"
                            v-model.lazy="projectForm.price"
                            type="number"
                            min="0"
                            class="mt-1 block w-full"
                            autocomplete="price"
                            required
                            :readonly="projectForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="projectForm.errors.price"
                        />
                    </div>
                </div>
            </template>
            <template #footer>
                <PrimaryButton
                    :disabled="projectForm.processing"
                    @click="projectSubmit"
                    class="mr-2"
                    ><span
                        v-if="projectForm.processing"
                        class="loading loading-spinner loading-xs"
                    ></span>
                    Simpan</PrimaryButton
                >
                <SecondaryButton
                    :disabled="projectForm.processing"
                    :type="'button'"
                    @click="closeModal"
                >
                    Tutup
                </SecondaryButton>
            </template>
        </DialogModal>

        <DialogModal :show="modalHapus" @close="modalHapus = false">
            <template #title> Modal Hapus </template>
            <template #content>
                <p class="text-black dark:text-white">
                    Apa ada yakin ingin menghapus data
                    <b>{{ formHapus.project_name }}</b> ?
                </p>
            </template>
            <template #footer>
                <DangerButton
                    :disabled="formHapus.processing"
                    @click="destroyProject"
                    class="mr-2"
                    ><span
                        v-if="formHapus.processing"
                        class="loading loading-spinner loading-xs"
                    ></span>
                    Hapus</DangerButton
                >
                <SecondaryButton
                    :disabled="formHapus.processing"
                    :type="'button'"
                    @click="closeModalHapus"
                >
                    Batal
                </SecondaryButton>
            </template>
        </DialogModal>

        <DialogModal :show="modalDetail" @close="modalDetail = false">
            <template #title> Modal Detail </template>
            <template #content>
                <div class="overflow-x-auto">
                    <table class="table text-black dark:text-white">
                        <tr>
                            <th>Tipe Hosting</th>
                            <td>
                                {{
                                    formDetail.host_type == "1" ? "Hosting Sendiri" : "Sewa Hosting"
                                }}
                            </td>
                        </tr>
                        <tr v-if="formDetail.host_type == '2'">
                            <th>
                                Nama Domain
                            </th>
                            <td>
                                <a class="hover:text-blue-500" target="_blank" :href="'https://'+formDetail.domain_name">{{ formDetail.domain_name }}</a>
                            </td>
                        </tr>
                        <tr v-if="formDetail.host_type == '2'">
                            <th>
                                Masa Aktif
                            </th>
                            <td>
                                {{ new Date(formDetail.contract_from).toLocaleDateString("id-ID") }} -
                                    {{ new Date(formDetail.contract_until).toLocaleDateString("id-ID") }}
                            </td>
                        </tr>
                        <tr v-if="formDetail.host_type == '2'">
                            <th>Harga</th>
                            <td>Rp.
                                {{
                                    new Intl.NumberFormat("id-ID").format(formDetail.price)
                                }}
                            </td>
                        </tr>
                        <tr v-if="formDetail.host_type == '2'">
                            <th>Status</th>
                            <td>
                                {{
                                    formDetail.contract_status
                                        ? "Aktif"
                                        : "Expire"
                                }}
                            </td>
                        </tr>
                        <tr>
                            <th>Deskripsi Project</th>
                            <td>
                                {{ formDetail.description }}
                            </td>
                        </tr>
                    </table>
                </div>
            </template>
            <template #footer>
                <SecondaryButton :type="'button'" @click="closeModalDetail">
                    Tutup
                </SecondaryButton>
            </template>
        </DialogModal>
    </AppLayout>
</template>
