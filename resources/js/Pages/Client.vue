<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import { ref } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Table from "@/Components/Table.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import DangerButton from "@/Components/DangerButton.vue";
import Toastr from "@/Components/Toaster.vue";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import { router } from "@inertiajs/vue3";

const modal = ref(false);
const modalHapus = ref(false);

const page = usePage();

const props = defineProps({
    clients: Object,
});

let titleModal = null;
let id_client = null;

const clientForm = useForm({
    name: null,
    company_name: null,
    client_email: null,
    whatsapp_number: null,
    address: null,
});

const filterForm = useForm({
    search: null,
});

const formHapus = useForm({
    client_id: "",
    client_name: "",
});

const openModal = (modalTitle, client_id = null) => {
    modal.value = true;
    titleModal = modalTitle;
    id_client = client_id;
    if (modalTitle == "Modal Ubah") {
        axios
            .get("client/" + client_id + "/edit")
            .then((response) => {
                clientForm.name = response.data.name;
                clientForm.company_name = response.data.company_name;
                clientForm.client_email = response.data.client_email;
                clientForm.whatsapp_number = response.data.whatsapp_number;
                clientForm.address = response.data.address;
            })
            .catch((error) => {
                page.props.flash.message = error;
            });
    }
};

const closeModal = () => {
    modal.value = false;
    clientForm.reset();
    clientForm.clearErrors();
};

const clientSubmit = () => {
    if (titleModal == "Modal Tambah") {
        clientForm.post(route("client.store"), {
            preserveScroll: true,
            onSuccess: () => {
                modal.value = false;
                clientForm.reset();
                clientForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    } else {
        clientForm.patch(route("client.update", id_client), {
            preserveScroll: true,
            onSuccess: () => {
                modal.value = false;
                clientForm.reset();
                clientForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    }
};

const openModalHapus = (client_id, client_name) => {
    modalHapus.value = true;
    formHapus.client_id = client_id;
    formHapus.client_name = client_name;
};

const closeModalHapus = () => {
    modalHapus.value = false;
    formHapus.reset();
    formHapus.clearErrors();
};

const destroyClient = () => {
    formHapus.delete(route("client.destroy", formHapus.client_id), {
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

const filterClient = () => {
    router.visit("client", {
        data: {
            search: filterForm.search,
        },
        replace: true,
        preserveState: true,
        only: ["clients"],
    });
};

let isTableEmpty = Object.keys(props.clients.data).length == 0;
</script>

<template>
    <AppLayout title="Client">
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Client
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
                                        class="input input-bordered join-item w-42"
                                        placeholder="Cari Nama Client"
                                    />
                                </div>
                            </div>
                            <div class="indicator">
                                <button
                                    @click="filterClient"
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
                            'Nama',
                            'Nama Perusahaan',
                            'Email',
                            'WhatsApp',
                            'Alamat',
                            'Aksi',
                        ]"
                        :current_page="props.clients.current_page"
                        :next_page="props.clients.next_page_url"
                        :prev_page="
                            route('client.index') +
                            '?page=' +
                            (props.clients.current_page - 1)
                        "
                    >
                        <template #content v-if="isTableEmpty == false">
                            <tr
                                v-for="client in props.clients.data"
                                :key="client.id" class="hover"
                            >
                                <td>{{ client.name }}</td>
                                <td>{{ client.company_name }}</td>
                                <td>
                                    <a class="hover:text-blue-500" :href="'mailto:'+client.client_email">{{ client.client_email }}</a>
                                </td>
                                <td>
                                    <a class="hover:text-green-500" :href="'https://wa.me/'+client.whatsapp_number">
                                        {{ client.whatsapp_number }}
                                    </a>
                                </td>
                                <td>{{ client.address }}</td>
                                <td>
                                    <button
                                        class="mr-3 text-warning"
                                        @click="
                                            openModal('Modal Ubah', client.id)
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
                                                client.id,
                                                client.name,
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
                        <template #empty v-else>
                            <tr class="text-center">
                                <td colspan="6">Tidak ada data</td>
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
                        <InputLabel for="name" value="Nama" />
                        <TextInput
                            id="name"
                            v-model.lazy="clientForm.name"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="name"
                            :readonly="clientForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="clientForm.errors.name"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel
                            for="company_name"
                            value="Nama Perusahaan"
                        />
                        <TextInput
                            id="company_name"
                            v-model.lazy="clientForm.company_name"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="company_name"
                            :readonly="clientForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="clientForm.errors.company_name"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="email" value="E-mail" />
                        <TextInput
                            id="email"
                            v-model.lazy="clientForm.client_email"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="email"
                            :readonly="clientForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="clientForm.errors.client_email"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="whatsapp_number" value="WhatsApp" />
                        <TextInput
                            id="whatsapp_number"
                            v-model.lazy="clientForm.whatsapp_number"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="whatsapp_number"
                            :readonly="clientForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="clientForm.errors.whatsapp_number"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="address" value="Alamat" />
                        <TextInput
                            id="address"
                            v-model.lazy="clientForm.address"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="address"
                            :readonly="clientForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="clientForm.errors.address"
                        />
                    </div>
                </div>
            </template>
            <template #footer>
                <PrimaryButton
                    :disabled="clientForm.processing"
                    @click="clientSubmit"
                    class="mr-2"
                    ><span
                        v-if="clientForm.processing"
                        class="loading loading-spinner loading-xs"
                    ></span>
                    Simpan</PrimaryButton
                >
                <SecondaryButton
                    :type="'button'"
                    :disabled="clientForm.processing"
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
                    <b>{{ formHapus.client_name }}</b> ?
                </p>
            </template>
            <template #footer>
                <DangerButton
                    :disabled="formHapus.processing"
                    @click="destroyClient"
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
    </AppLayout>
</template>
