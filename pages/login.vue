<script setup lang="ts">
import { useIsLoadingStore, useAuthStore } from '@/store/auth.store';
import { v4 as uuid } from 'uuid';

useHead({
  title: 'Nuxt-CRM | Login',
});

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  isLoadingStore.set(true);
  await account.createEmailSession(emailRef.value, passwordRef.value);
  const response = await account.get();
  if (response) {
    authStore.set({
      email: response.email,
      name: response.email,
      status: response.status,
    });
  }

  emailRef.value = '';
  passwordRef.value = '';
  nameRef.value = '';

  await router.push('/');
  isLoadingStore.set(false);
};

const register = async () => {
  await account.create(
    uuid(),
    emailRef.value,
    passwordRef.value,
    nameRef.value
  );

  await login();
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <CnInput
          placeholder="Email"
          type="email"
          class="mb-3"
          v-model="emailRef"
        />
        <CnInput
          placeholder="Password"
          type="password"
          class="mb-3"
          v-model="passwordRef"
        />
        <CnInput
          placeholder="Name"
          type="name"
          class="mb-3"
          v-model="nameRef"
        />
        <div class="flex items-center justify-center gap-5">
          <CnButton type="button" @click="login">Login</CnButton>
          <CnButton type="button" @click="register">Register</CnButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
