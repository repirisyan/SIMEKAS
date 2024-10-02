<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import { ref, computed } from "vue";
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
import {
    PencilSquareIcon,
    TrashIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const modal = ref(false);
const modalHapus = ref(false);
const isTableEmpty = computed(() => {
    return Object.keys(props.clients.data).length == 0;
});

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
        <div class="p-6 md:p-12 lg:p-12">
            <div class="card w-auto bg-white dark:bg-gray-800 shadow-xl">
                <div class="card-body">
                    <div class="card-title flex overflow-x-auto">
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
                                        class="input input-bordered join-item input-sm w-42"
                                        placeholder="Cari Nama Client"
                                    />
                                </div>
                            </div>
                            <div class="indicator">
                                <button
                                    @click="filterClient"
                                    class="btn btn-sm join-item text-xs"
                                >
                                    Cari
                                    <MagnifyingGlassIcon class="w-4 h-4" />
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
                        :empty="isTableEmpty"
                        :current_page="props.clients.current_page"
                        :next_page="props.clients.next_page_url"
                        :prev_page="
                            route('client.index') +
                            '?page=' +
                            (props.clients.current_page - 1)
                        "
                    >
                        <template #content>
                            <tr
                                v-for="client in props.clients.data"
                                :key="client.id"
                                class="hover"
                            >
                                <td>{{ client.name }}</td>
                                <td>{{ client.company_name }}</td>
                                <td>
                                    <a
                                        class="text-blue-500 flex gap-1"
                                        :href="'mailto:' + client.client_email"
                                        ><EnvelopeIcon class="w-4 h-4" />{{
                                            client.client_email
                                        }}</a
                                    >
                                </td>
                                <td>
                                    <a
                                        class="text-green-500 flex gap-1"
                                        :href="
                                            'https://wa.me/' +
                                            client.whatsapp_number
                                        "
                                    >
                                        <DevicePhoneMobileIcon
                                            class="w-4 h-4"
                                        />{{ client.whatsapp_number }}
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
                                        <PencilSquareIcon class="w-6 h-6" />
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
                                        <TrashIcon class="w-6 h-6" />
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
