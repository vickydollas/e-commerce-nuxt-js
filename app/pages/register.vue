<template>
  <div class="bg-gray-950 text-white font-nunito min-h-screen flex flex-col">
    <div
      class="flex flex-1 items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      <!-- Decorative twinkling stars -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          v-for="star in bgStars"
          :key="star.id"
          class="absolute rounded-full twinkle"
          :style="star.style"
        />
        <!-- Soft amber glow behind the card -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="w-full max-w-md relative z-10">
        <!-- Floating star icon -->
        <div class="flex justify-center mb-6">
          <div
            class="float w-16 h-16 bg-amber-400/10 border border-amber-400/25 rounded-2xl flex items-center justify-center"
          >
            <svg class="w-8 h-8 star-glow" viewBox="0 0 32 32" fill="none">
              <polygon
                points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
                fill="#f59e0b"
                stroke="#fcd34d"
                stroke-width="0.5"
              />
            </svg>
          </div>
        </div>

        <!-- Heading -->
        <div class="text-center mb-8">
          <h1 class="font-syne text-3xl font-extrabold mb-2">WELCOME</h1>
          <p class="text-gray-400 text-sm">
            Sign up to own a<span class="text-amber-400 font-semibold">
              RisingStar</span
            >
            account
          </p>
        </div>

        <!-- ── Login Card ── -->
        <div
          class="bg-gray-900/80 border border-white/8 rounded-2xl p-8 backdrop-blur-sm"
        >
          <form @submit.prevent="handleLogin">
            <!-- Username -->
            <div class="mb-5">
              <label
                for="username"
                class="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase font-syne"
              >
                Username
              </label>
              <div class="relative">
                <svg
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  placeholder="Enter your username"
                  autocomplete="username"
                  class="input-field"
                  :class="
                    errors.username
                      ? 'border-red-500/60 focus:border-red-500/80'
                      : ''
                  "
                  @input="errors.username = ''"
                />
              </div>
              <p
                v-if="errors.username"
                class="text-red-400 text-xs mt-1.5 flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.username }}
              </p>
            </div>

            <!-- Password -->
            <div class="mb-2">
              <div class="mb-2">
                <label
                  for="password"
                  class="block text-xs font-semibold text-gray-400 tracking-wide uppercase font-syne"
                >
                  Password
                </label>
              </div>
              <div class="relative">
                <svg
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  class="input-field pr-11"
                  :class="
                    errors.password
                      ? 'border-red-500/60 focus:border-red-500/80'
                      : ''
                  "
                  @input="errors.password = ''"
                />
                <!-- Show / hide toggle -->
                <button
                  type="button"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <!-- Eye open -->
                  <svg
                    v-if="!showPassword"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <!-- Eye closed -->
                  <svg
                    v-else
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                    />
                    <path
                      d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                    />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
              <p
                v-if="errors.password"
                class="text-red-400 text-xs mt-1.5 flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.password }}
              </p>
            </div>
            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="login-btn w-full bg-amber-400 hover:bg-amber-300 active:scale-98 text-gray-900 font-syne font-extrabold text-sm py-2.5 mt-10 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                v-if="isLoading"
                class="w-2 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>{{ isLoading ? "Signing up…" : "Sign up →" }}</span>
            </button>

            <!-- Success message -->
            <Transition name="fade">
              <div
                v-if="loginSuccess"
                class="mt-4 bg-green-400/10 border border-green-400/25 rounded-xl p-3 text-center"
              >
                <p class="text-green-400 text-sm font-semibold font-syne">
                  ✓ Signed in successfully! Redirecting…
                </p>
              </div>
            </Transition>

            <!-- General error -->
            <Transition name="fade">
              <div
                v-if="loginError"
                class="mt-4 bg-red-400/10 border border-red-400/25 rounded-xl p-3 text-center"
              >
                <p class="text-red-400 text-sm font-semibold font-syne">
                  {{ loginError }}
                </p>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: false,
});
const router = useRouter();

// ── Form state ─────────────────────────────────────────────────────────────
const form = reactive({
  username: "",
  password: "",
  remember: false,
});

const errors = reactive({
  username: "",
  password: "",
});

const showPassword = ref(false);
const isLoading = ref(false);
const loginSuccess = ref(false);
const loginError = ref("");

// ── Decorative background stars ────────────────────────────────────────────
const bgStars = [
  {
    id: 1,
    style:
      "top:64px;left:48px;width:6px;height:6px;background:#fcd34d;animation-delay:0s",
  },
  {
    id: 2,
    style:
      "top:33%;left:32px;width:4px;height:4px;background:white;animation-delay:0.7s",
  },
  {
    id: 3,
    style:
      "top:80px;right:80px;width:6px;height:6px;background:#fde68a;animation-delay:1.3s",
  },
  {
    id: 4,
    style:
      "bottom:128px;right:48px;width:4px;height:4px;background:white;animation-delay:0.4s",
  },
  {
    id: 5,
    style:
      "bottom:80px;left:25%;width:6px;height:6px;background:#fcd34d;animation-delay:1.8s",
  },
  {
    id: 6,
    style:
      "top:50%;right:25%;width:4px;height:4px;background:white;animation-delay:1s",
  },
];

// ── Validation ─────────────────────────────────────────────────────────────
function validate() {
  let valid = true;
  errors.username = "";
  errors.password = "";

  if (!form.username.trim()) {
    errors.username = "Please enter your username.";
    valid = false;
  }
  if (!form.password.trim()) {
    errors.password = "Please enter your password.";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
    valid = false;
  }

  return valid;
}
const toast = useToast()
// ── Submit handler ─────────────────────────────────────────────────────────
async function handleLogin() {
    // if (form.password) {
        
    // }
  const { signUp } = useAuth();
  signUp(form.username, form.password)
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap");

.font-syne {
  font-family: "Syne", sans-serif;
}
.font-nunito {
  font-family: "Nunito", sans-serif;
}

.star-glow {
  filter: drop-shadow(0 0 10px #f59e0b);
}

/* Floating icon animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
.float {
  animation: float 5s ease-in-out infinite;
}

/* Twinkling background stars */
@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}
.twinkle {
  animation: twinkle 2.5s ease-in-out infinite;
}

/* Input styling */
.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 13px 16px 13px 44px;
  font-size: 14px;
  color: #fff;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  font-family: "Nunito", sans-serif;
}
.input-field:focus {
  border-color: rgba(245, 158, 11, 0.6);
  background: rgba(245, 158, 11, 0.03);
}
.input-field::placeholder {
  color: #4b5563;
}

/* Success/error fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
