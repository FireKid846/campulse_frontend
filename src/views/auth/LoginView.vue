<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login({ username: email.value, password: password.value });
    router.push('/');
  } catch {
    error.value = 'Invalid email or password';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md bg-surface p-8 rounded-xl border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,46,33,1)]">
      <h1 class="text-4xl font-extrabold text-primary mb-2 text-center tracking-tight">Welcome Back</h1>
      <p class="text-secondary text-center mb-8">Sign in to continue to Campulse</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-secondary mb-2">Email Address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
            placeholder="student@university.edu.ng"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-secondary mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-accent text-primary font-bold py-3 rounded-lg border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,46,33,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-secondary">
        Don't have an account?
        <router-link to="/signup" class="text-accent hover:text-blue-400 font-medium transition-colors">
          Create one
        </router-link>
      </div>
    </div>
  </div>
</template>
