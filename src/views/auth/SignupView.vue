<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const school = ref('');
const department = ref('');
const level = ref('');
const error = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleSignup = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.signup({
      full_name: name.value,
      email: email.value,
      password: password.value,
      school: school.value,
      department: department.value,
      level: parseInt(level.value),
    });
    // Auto login or redirect to login
    await authStore.login({ username: email.value, password: password.value });
    router.push('/');
  } catch {
    error.value = 'Failed to create account. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4 py-12">
    <div class="w-full max-w-md bg-surface p-8 rounded-xl border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,46,33,1)]">
      <h1 class="text-4xl font-extrabold text-primary mb-2 text-center tracking-tight">Join Campulse</h1>
      <p class="text-secondary text-center mb-8">Your smart academic companion awaits</p>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-secondary mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-secondary mb-1">Email Address</label>
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
          <label for="password" class="block text-sm font-medium text-secondary mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
            placeholder="••••••••"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label for="school" class="block text-sm font-medium text-secondary mb-1">University/School</label>
            <input
              v-model="school"
              type="text"
              id="school"
              required
              class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
              placeholder="UNILAG"
            />
          </div>
          
          <div>
            <label for="department" class="block text-sm font-medium text-secondary mb-1">Department</label>
            <input
              v-model="department"
              type="text"
              id="department"
              required
              class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all placeholder:text-secondary/50"
              placeholder="Computer Science"
            />
          </div>

          <div>
            <label for="level" class="block text-sm font-medium text-secondary mb-1">Level</label>
            <select
              v-model="level"
              id="level"
              required
              class="w-full bg-background border-2 border-primary/20 rounded-lg px-4 py-3 text-primary font-medium focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,46,33,0.1)] transition-all appearance-none"
            >
              <option value="" disabled>Select</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-accent text-primary font-bold py-3 rounded-lg border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,46,33,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          <span v-if="loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-secondary">
        Already have an account?
        <router-link to="/login" class="text-accent hover:text-blue-400 font-medium transition-colors">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>
