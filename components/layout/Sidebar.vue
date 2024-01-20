<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="logo" width="100px" class="mx-auto" />
    </NuxtLink>
    <button
      @click="logout"
      class="absolute top-2 right-3 transition-colors hover:text-primary"
    >
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store';

const router = useRouter();

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession('current');
  authStore.clear();
  await router.push('/login');
  isLoadingStore.set(false);
};
</script>

<style scoped></style>
