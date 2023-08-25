<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import { ref,computed } from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Table from "@/Components/Table.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Checkbox from "@/Components/Checkbox.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import DangerButton from "@/Components/DangerButton.vue";
import Toastr from "@/Components/Toaster.vue";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import TextArea from "@/Components/TextArea.vue";
import { router } from "@inertiajs/vue3";

const modal = ref(false);
const modalHapus = ref(false);

const page = usePage();

const props = defineProps({
    cashflows: Object,
});

const isTableEmpty = computed(() => {
    return Object.keys(props.cashflows.data).length == 0;
});



let titleModal = null;
let id_cashflow = null;
let progress = false;

const cashFlowForm = useForm({
    new_image: null,
    cashflow_id: null,
    title: null,
    type: "1",
    description: null,
    image: null,
    amount: null,
    new_amount: null,
});

const filterForm = useForm({
    search: null,
    type: "",
});

const formHapus = useForm({
    cashflow_id: "",
    cashflow_title: "",
});

const openModal = (modalTitle, cashflow_id = null) => {
    modal.value = true;
    titleModal = modalTitle;
    if (modalTitle == "Modal Ubah") {
        axios
            .get("cashflow/" + cashflow_id + "/edit")
            .then((response) => {
                cashFlowForm.title = response.data.title;
                cashFlowForm.type = response.data.type;
                cashFlowForm.description = response.data.description;
                cashFlowForm.image = response.data.image;
                cashFlowForm.amount = response.data.amount;
                cashFlowForm.new_amount = response.data.amount;
                cashFlowForm.cashflow_id = cashflow_id;
            })
            .catch((error) => {
                page.props.flash.message = error;
            });
    }
};

const closeModal = () => {
    modal.value = false;
    cashFlowForm.reset();
    cashFlowForm.clearErrors();
};

const cashFlowSubmit = () => {
    if (titleModal == "Modal Tambah") {
        cashFlowForm.post(route("cashflow.store"), {
            preserveScroll: true,
            onSuccess: () => {
                modal.value = false;
                cashFlowForm.reset();
                cashFlowForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    } else {
        cashFlowForm.post(route("cashflow.update"), {
            preserveScroll: true,
            onStart: () => {
                progress = true;
            },
            onSuccess: () => {
                modal.value = false;
                cashFlowForm.reset();
                cashFlowForm.clearErrors();
                setTimeout(() => {
                    page.props.flash.message = null;
                }, 2000);
            },
        });
    }
};

const openModalHapus = (cashflow_id, cashflow_title) => {
    modalHapus.value = true;
    formHapus.cashflow_id = cashflow_id;
    formHapus.cashflow_title = cashflow_title;
};

const closeModalHapus = () => {
    modalHapus.value = false;
    formHapus.reset();
    formHapus.clearErrors();
};

const destroyCashFlow = () => {
    formHapus.delete(route("cashflow.destroy", formHapus.cashflow_id), {
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
    router.visit("cashflow", {
        data: {
            search: filterForm.search,
            type: filterForm.type,
        },
        replace: true,
        preserveState: true,
    });
};

</script>

<template>
    <AppLayout title="Cash Flow">
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Cash Flow
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
                        <div class="join w-full sm:justify-end text-white">
                                    <input
                                        v-model.lazy="filterForm.search"
                                        class="input input-bordered join-item w-auto"
                                        placeholder="Cari Judul"
                                    />
                            <select
                                v-model.lazy="filterForm.type"
                                class="select select-bordered join-item w-auto sm:w-32"
                            >
                                <option value="" selected>Semua Jenis</option>
                                <option value="1">Pemasukan</option>
                                <option value="2">Pengeluaran</option>
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
                            'User',
                            'Judul',
                            'Tanggal',
                            'Jenis',
                            'Deskripsi',
                            'Thumbnail',
                            'Jumlah',
                            'Aksi',
                        ]"
                        :empty="isTableEmpty"
                        :current_page="props.cashflows.current_page"
                        :next_page="props.cashflows.next_page_url"
                        :prev_page="
                            route('cashflow.index') +
                            '?page=' +
                            (props.cashflows.current_page - 1)
                        "
                    >
                        <template #content>
                            <tr
                                v-for="cashflow in props.cashflows.data"
                                :key="cashflow.id" class="hover hover:text-white"
                            >
                                <td>{{ cashflow.user.name }}</td>
                                <td>{{ cashflow.title }}</td>
                                <td>
                                    {{new Date(cashflow.created_at).toLocaleDateString("id-ID")}}
                                </td>
                                <td>
                                    <div
                                        class="badge"
                                        :class="
                                            cashflow.type == '1'
                                                ? 'badge-success'
                                                : 'badge-error'
                                        "
                                    >
                                        {{
                                            cashflow.type == "1"
                                                ? "Pemasukan"
                                                : "Pengeluaran"
                                        }}
                                    </div>
                                </td>
                                <td>{{ cashflow.description }}</td>
                                <td>
                                    <div
                                        class="avatar"
                                        v-if="cashflow.image != null"
                                    >
                                        <div class="w-24 rounded">
                                            <a
                                                :href="
                                                    '/storage/cashflow/original/' +
                                                    cashflow.image
                                                "
                                                target="_blank"
                                            >
                                                <img
                                                    :src="
                                                        '/storage/cashflow/thumbnail/' +
                                                        cashflow.image
                                                    "
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <span v-else> Tidak ada data </span>
                                </td>
                                <td>Rp.
                                    {{
                                        new Intl.NumberFormat("id-ID").format(cashflow.amount)
                                    }}
                                </td>
                                <td>
                                    <button
                                        class="mr-3 text-warning"
                                        @click="
                                            openModal('Modal Ubah', cashflow.id)
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
                                                cashflow.id,
                                                cashflow.title,
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
                        <InputLabel for="title" value="Title" />
                        <TextInput
                            id="title"
                            v-model.lazy="cashFlowForm.title"
                            type="text"
                            class="mt-1 block w-full"
                            autocomplete="title"
                            :readonly="cashFlowForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.title"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="type" value="Jenis" class="mb-2" />
                        <label class="mr-2">
                            <span class="inline mr-2">Pemasukan</span>
                            <input
                                type="radio"
                                name="radio-10"
                                checked
                                value="1"
                                v-model.lazy="cashFlowForm.type"
                                :readonly="cashFlowForm.processing"
                            />
                        </label>
                        <label>
                            <span class="inline mr-2">Pengeluaran</span>
                            <input
                                type="radio"
                                name="radio-10"
                                value="2"
                                v-model.lazy="cashFlowForm.type"
                                :readonly="cashFlowForm.processing"
                            />
                        </label>
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.type"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="description" value="Deskripsi" />
                        <TextArea
                            id="description"
                            v-model.lazy="cashFlowForm.description"
                            class="mt-1 block w-full"
                            :readonly="cashFlowForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.description"
                        />
                    </div>

                    <div
                        v-if="titleModal == 'Modal Tambah'"
                        class="col-span-6 sm:col-span-4"
                    >
                        <InputLabel for="image" value="Foto" />
                        <input
                            type="file"
                            class="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            @input="cashFlowForm.image = $event.target.files[0]"
                            :readonly="cashFlowForm.processing"
                        />
                        <br />
                        <progress
                            class="progress progress-success w-56"
                            v-if="cashFlowForm.progress"
                            :value="cashFlowForm.progress.percentage"
                            max="100"
                        >
                            {{ cashFlowForm.progress.percentage }}%
                        </progress>
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.image"
                        />
                    </div>
                    <div v-else class="col-span-6 sm:col-span-4">
                        <InputLabel for="new_image" value="Foto Baru" />
                        <input
                            type="file"
                            class="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            @input="
                                cashFlowForm.new_image = $event.target.files[0]
                            "
                            :readonly="cashFlowForm.processing"
                        />
                        <br />
                        <progress
                            class="progress progress-success w-56"
                            v-if="cashFlowForm.progress"
                            :value="cashFlowForm.progress.percentage"
                            max="100"
                        >
                            {{ cashFlowForm.progress.percentage }}%
                        </progress>
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.new_image"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="amount" :value="'Jumlah (Rp.'+new Intl.NumberFormat('id-ID').format(titleModal == 'Modal Tambah' ? cashFlowForm.amount : cashFlowForm.new_amount)+')'" />
                        <TextInput
                            v-if="titleModal == 'Modal Tambah'"
                            id="amount"
                            v-model.lazy="cashFlowForm.amount"
                            type="number"
                            min="0"
                            class="mt-1 block w-full"
                            autocomplete="amount"
                            :readonly="cashFlowForm.processing"
                        />
                        <TextInput
                            v-else
                            id="amount"
                            v-model.lazy="cashFlowForm.new_amount"
                            type="number"
                            min="0"
                            class="mt-1 block w-full"
                            autocomplete="amount"
                            :readonly="cashFlowForm.processing"
                        />
                        <InputError
                            class="mt-2"
                            :message="cashFlowForm.errors.amount"
                        />
                    </div>
                </div>
            </template>
            <template #footer>
                <PrimaryButton
                    :disabled="cashFlowForm.processing"
                    @click="cashFlowSubmit"
                    class="mr-2 btn-primary"
                    ><span
                        v-if="cashFlowForm.processing"
                        class="loading loading-spinner loading-xs"
                    ></span>
                    Simpan</PrimaryButton
                >
                <SecondaryButton
                    :type="'button'"
                    :disabled="cashFlowForm.processing"
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
                    <b>{{ formHapus.cashflow_title }}</b> ?
                </p>
            </template>
            <template #footer>
                <DangerButton
                    :disabled="formHapus.processing"
                    @click="destroyCashFlow"
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
