<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Редактирование {{ (data as unknown as ICustomerFormState)?.name }}
    </h1>

    <form @submit="onSubmit" class="form">
      <CnInput
        placeholder="Наименование"
        v-model="name"
        v-bind="nameProps"
        type="text"
        class="input"
      />
      <CnInput
        placeholder="Email"
        v-model="email"
        v-bind="emailProps"
        type="text"
        class="input"
      />
      <CnInput
        placeholder="Откуда пришел"
        v-model="fromSource"
        v-bind="fromSourceProps"
        type="text"
        class="input"
      />
      <CnButton :disabled="isPending" variant="secondary" class="mt-3">
        {{ isPending ? 'Загрузка...' : 'Сохранить' }}
      </CnButton>

      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt="company image"
        width="50"
        height="50"
        class="rounded-full my-4"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">Логотип</div>
          <CnInput
            type="file"
            :onChange="(e: InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePending"
          />
        </label>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storage } from '@/utils/appwrite';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { v4 as uuidv4 } from 'uuid';
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types';

interface ICustomerFormState
  extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

useSeoMeta({
  title: `Редактирование компании`,
});

const route = useRoute();
const customerId = route.params.id as string;

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const { data, isSuccess } = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});

watch(isSuccess, () => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData.email,
    avatar_url: initialData.avatar_url,
    from_source: initialData.from_source,
    name: initialData.name,
  });
});

const [name, nameProps] = defineField('name');
const [email, emailProps] = defineField('email');
const [fromSource, fromSourceProps] = defineField('from_source');

const { mutate, isPending } = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (data: ICustomerFormState) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
});

// UPLOAD IMAGE
const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ['uploadImage'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuidv4(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.$id);
    setFieldValue('avatar_url', response.href);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<style scoped>
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
