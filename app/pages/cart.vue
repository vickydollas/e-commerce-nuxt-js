<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBasic } from "../composables/useBasic";

definePageMeta({
  middleware: "auth",
});
const {
  cartArray,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  initializeCart,
  subtotal,
  tax,
  total,
  shipping
} = useBasic();

onMounted(() => {
  initializeCart();
});
const toast = useToast();
const token = useCookie("jwt_token");
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "Nigeria",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  payMethod: "card" as "card" | "transfer",
});

const formatCard = (e: Event) => {
  const input = e.target as HTMLInputElement;
  input.value = input.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
  form.value.cardNumber = input.value;
};
const formatExpiry = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let v = input.value.replace(/\D/g, "");
  if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
  input.value = v;
  form.value.expiry = v;
};
const step = ref<1 | 2 | 3>(1);
const placing = ref(false);
const placed = ref(false);
const validateStep1 = () => {
    if(!token.value) {
        navigateTo('/login')
        toast.error({
            title: 'Login Required',
            message: 'Please log in to proceed with the checkout.'
        })
        return
    }
    step.value = 2
}
const placeOrder = async () => {
  placing.value = true;
  await new Promise((r) => setTimeout(r, 1800));
  placing.value = false;
  placed.value = true;
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-950 text-gray-100 font-nunito px-4 py-10 md:px-8"
  >
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <!-- ══ SUCCESS STATE ══ -->
    <Transition name="pop">
      <div
        v-if="placed"
        class="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center gap-6 text-center px-6"
      >
        <div
          class="success-ring w-24 h-24 rounded-full border-4 border-amber-400 flex items-center justify-center text-5xl text-amber-400 font-syne font-extrabold"
        >
          ✓
        </div>
        <h1 class="font-syne font-extrabold text-3xl md:text-4xl">
          Order Placed!
        </h1>
        <p class="text-gray-400 max-w-sm">
          Thanks for your purchase. You'll receive a confirmation email shortly.
        </p>
        <div
          class="bg-white/5 border border-amber-400/20 rounded-2xl px-8 py-4 text-center"
        >
          <p
            class="text-gray-500 text-xs font-syne uppercase tracking-widest mb-1"
          >
            Order Total
          </p>
          <p class="font-syne font-extrabold text-amber-400 text-3xl">
            ${{ total.toFixed(2) }}
          </p>
        </div>
        <NuxtLink
          to="/shop"
          class="mt-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-syne font-bold px-8 py-3 rounded-full transition-colors"
        >
          Continue Shopping →
        </NuxtLink>
      </div>
    </Transition>

    <div v-if="!placed" class="max-w-6xl mx-auto">
      <!-- ── Header ── -->
      <div class="mb-10">
        <NuxtLink
          to="/shop"
          class="text-gray-500 hover:text-amber-400 text-sm transition-colors inline-flex items-center gap-1.5 mb-4"
        >
          ← Back to Shop
        </NuxtLink>
        <h1 class="font-syne font-extrabold text-3xl md:text-4xl">Checkout</h1>
      </div>

      <!-- ── Step Indicator ── -->
      <div class="flex items-center gap-3 mb-10">
        <div
          v-for="(label, i) in ['Cart Review', 'Delivery', 'Payment']"
          :key="i"
          class="flex items-center gap-2"
        >
          <div
            :class="[
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-syne font-bold border transition-all',
              step > i + 1
                ? 'bg-amber-400 border-amber-400 text-gray-900'
                : step === i + 1
                  ? 'bg-amber-400/15 border-amber-400 text-amber-400'
                  : 'bg-transparent border-white/10 text-gray-600',
            ]"
          >
            <span v-if="step > i + 1">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span
            :class="[
              'text-sm font-syne hidden sm:block',
              step === i + 1 ? 'text-gray-100' : 'text-gray-600',
            ]"
          >
            {{ label }}
          </span>
          <div v-if="i < 2" class="w-8 md:w-16 h-px bg-white/10 mx-1" />
        </div>
      </div>

      <!-- ── Main Grid ── -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- LEFT COLUMN -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          <!-- ══ STEP 1 — Cart Review ══ -->
          <Transition name="fadeslide" mode="out-in">
            <div v-if="step === 1" key="step1">
              <div
                class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
              >
                <h2
                  class="font-syne font-extrabold text-base text-gray-100 mb-5"
                >
                  Review Items
                </h2>

                <div
                  v-if="!cartArray.length"
                  class="flex flex-col items-center justify-center gap-3 py-10 text-center"
                >
                  <span class="text-4xl">🛒</span>
                  <p class="font-syne font-bold text-gray-400">
                    Your cart is empty
                  </p>
                  <NuxtLink
                    to="/shop"
                    class="mt-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-syne font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
                    >Browse Shop →</NuxtLink
                  >
                </div>

                <TransitionGroup
                  v-else
                  name="item"
                  tag="div"
                  class="flex flex-col gap-3"
                >
                  <div
                    v-for="item in cartArray"
                    :key="item.id"
                    class="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] hover:border-amber-400/20 rounded-xl transition-colors"
                  >
                    <div
                      class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0"
                    >
                      {{ item.emoji }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="font-syne font-bold text-sm text-gray-100 truncate"
                      >
                        {{ item.name }}
                      </p>
                      <p class="text-gray-500 text-xs mt-0.5">
                        {{ item.category }}
                      </p>
                      <p
                        class="font-syne font-extrabold text-amber-400 text-sm mt-1"
                      >
                        ${{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                    <div class="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        @click="decreaseQuantity(item.id)"
                        class="w-6 h-6 rounded-md bg-white/[0.07] border border-white/10 text-gray-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:text-amber-400 transition-all flex items-center justify-center text-base font-bold leading-none cursor-pointer"
                      >
                        −
                      </button>
                      <span
                        class="font-syne font-bold text-white text-sm w-5 text-center"
                        >{{ item.quantity }}</span
                      >
                      <button
                        @click="increaseQuantity(item.id)"
                        class="w-6 h-6 rounded-md bg-white/[0.07] border border-white/10 text-gray-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:text-amber-400 transition-all flex items-center justify-center text-base font-bold leading-none cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        @click="removeFromCart(item.id)"
                        class="w-6 h-6 rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/15 hover:border-red-500/50 transition-all flex items-center justify-center text-xs ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </TransitionGroup>
              </div>

              <button
                v-if="cartArray.length"
                @click="validateStep1()"
                class="w-full mt-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-syne font-bold px-6 py-3 rounded-full transition-colors text-center cursor-pointer"
              >
                Continue to Delivery →
              </button>
            </div>
          </Transition>
        </div>

        <!-- RIGHT COLUMN — Order Summary -->
        <aside class="lg:col-span-2">
          <div
            class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 sticky top-6"
          >
            <h2 class="font-syne font-extrabold text-base text-gray-100 mb-5">
              Order Summary
            </h2>

            <div class="flex flex-col gap-2 mb-5">
              <div
                v-for="item in cartArray"
                :key="item.id"
                class="flex items-center gap-2 text-sm"
              >
                <span class="text-lg">{{ item.emoji }}</span>
                <span class="flex-1 text-gray-300 truncate">{{
                  item.name
                }}</span>
                <span class="text-gray-500 text-xs">×{{ item.quantity }}</span>
                <span class="font-syne font-bold text-gray-200"
                  >${{ (item.price * item.quantity).toFixed(2) }}</span
                >
              </div>
            </div>

            <div
              class="border-t border-white/[0.07] pt-4 flex flex-col gap-2.5 text-sm"
            >
              <div class="flex justify-between">
                <span class="text-gray-500">Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Shipping</span>
                <span :class="shipping === 0 ? 'text-green-400 font-bold' : ''">
                  {{ shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Tax (7.5%)</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div
                class="flex justify-between items-center border-t border-white/[0.07] pt-3 mt-1"
              >
                <span class="font-syne font-extrabold text-base">Total</span>
                <span class="font-syne font-extrabold text-amber-400 text-xl"
                  >${{ total.toFixed(2) }}</span
                >
              </div>
            </div>

            <div
              v-if="shipping > 0"
              class="mt-4 bg-amber-400/[0.08] border border-amber-400/20 rounded-xl p-3 text-xs text-amber-300"
            >
              Add <strong>${{ (150 - subtotal).toFixed(2) }}</strong> more for
              free shipping!
            </div>
            <div
              v-else
              class="mt-4 bg-green-400/[0.08] border border-green-400/20 rounded-xl p-3 text-xs text-green-300"
            >
              ✓ You've unlocked free shipping!
            </div>

            <div class="mt-5 flex flex-wrap gap-2 justify-center">
              <span
                class="bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 text-[0.7rem] text-gray-500 font-syne font-bold"
                >🔒 Secure</span
              >
              <span
                class="bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 text-[0.7rem] text-gray-500 font-syne font-bold"
                >↩ 30-day returns</span
              >
              <span
                class="bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 text-[0.7rem] text-gray-500 font-syne font-bold"
                >⚡ Fast delivery</span
              >
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap");

.font-syne {
  font-family: "Syne", sans-serif;
}
.font-nunito {
  font-family: "Nunito", sans-serif;
}
.font-mono {
  font-family: "Courier New", monospace;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(17, 24, 39, 0.3);
  border-top-color: #111827;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success ring */
.success-ring {
  animation: pulse-ring 1s ease-out forwards;
}
@keyframes pulse-ring {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

/* Vue transitions */
.fadeslide-enter-active,
.fadeslide-leave-active {
  transition: all 0.25s ease;
}
.fadeslide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.fadeslide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.item-enter-active {
  transition: all 0.25s ease;
}
.item-leave-active {
  transition: all 0.2s ease;
}
.item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.pop-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* Thin scrollbar */
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 2px;
}
</style>
