<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import dayjs from 'dayjs';

useSeoMeta({
  title: 'Home | Nuxt CRM-System',
});

const dragCard = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Nuxt CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="column in data" :key="column.id">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <CnCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-3"
              draggable="true"
            >
              <CnCardHeader role="button">
                <CnCardTitle>
                  {{ card.name }}
                </CnCardTitle>
                <CnCardDescription class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </CnCardDescription>
              </CnCardHeader>
              <CnCardContent class="text-xs"
                >Компания {{ card.companyName }}</CnCardContent
              >
              <CnCardFooter>{{
                dayjs(card.$createdAt).format('DD MMMM YYYY')
              }}</CnCardFooter>
            </CnCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
