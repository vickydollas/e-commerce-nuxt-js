<script setup lang="ts">
// definePageMeta({
//     layout: false
// })
const user = useCookie('jwt_token')
const handleLogout = () => {
  user.value = null
  if(!user.value) return setTimeout(() => navigateTo('/login'), 1000)
}
</script>
<template>
  <div class="fixed t0p-50 inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm">
    
    <div class="w-full max-w-md scale-100 rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out sm:p-8">
      
      <div class="flex items-center gap-4 border-b border-zinc-100 pb-5">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-zinc-950">Confirm Logout</h3>
          <p class="mt-1 text-sm text-zinc-500">Are you sure you want to end your session?</p>
        </div>
      </div>

      <div class="my-6">
        <p class="text-base text-zinc-600">
          You are about to log out of your account. You will need to enter your credentials again to access your dashboard.
        </p>
      </div>

      <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end sm:gap-4">
        
        <button @click="$emit('cancel')" type="button" class="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 sm:w-auto">
          Cancel, Stay Logged In
        </button>
        
        <button @click="handleLogout" type="button" class="inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700 sm:w-auto">
          Yes, Logout Now
        </button>
        
      </div>
    </div>
  </div>
</template>