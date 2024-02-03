<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Наши клиенты</h1>
    <div v-if="isLoading">Loading...</div>
    <CnTable v-else>
      <CnTableHeader>
        <CnTableRow>
          <CnTableHead class="w-[200px]">Изображение</CnTableHead>
          <CnTableHead class="w-[300px]">Наименование</CnTableHead>
          <CnTableHead class="w-[300px]">Email</CnTableHead>
          <CnTableHead>Откуда пришел</CnTableHead>
        </CnTableRow>
      </CnTableHeader>

      <CnTableBody>
        <CnTableRow
          v-for="customer in (customers?.documents as unknown as ICustomer[])"
          :key="customer.$id"
        >
          <CnTableCell>
            <NuxtLink :href="`/customers/edit/${customer.$id}`">
              <NuxtImg
                :src="customer.avatar_url"
                :alt="customer.name"
                width="50"
                height="50"
                class="rounded-full"
              />
            </NuxtLink>
          </CnTableCell>
          <CnTableCell class="font-medium">
            {{ customer.name }}
          </CnTableCell>
          <CnTableCell>{{ customer.email }}</CnTableCell>
          <CnTableCell>{{ customer.from_source }}</CnTableCell>
        </CnTableRow>
      </CnTableBody>
    </CnTable>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals/types';

useSeoMeta({
  title: 'Customers | Nuxt CRM-System',
});

const { data: customers, isLoading } = useQuery({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});
</script>

<style scoped></style>
