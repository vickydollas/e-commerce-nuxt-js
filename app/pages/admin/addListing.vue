<script setup>
definePageMeta({ layout: "admin" });
// const form = reactive({
//   name: "",
//   price: null,
//   stock: null,
//   category: "",
//   description: "",
// });
const page = ref('home')
const activeFilter = ref('All')
 
const pageMeta = {
  home:    { title: 'Overview',    subtitle: "Welcome back — here's what's happening today" },
  orders:  { title: 'Orders Sent', subtitle: 'Track and manage all outgoing orders' },
  listing: { title: 'Add Listing', subtitle: 'Add a new product to your store' },
}
 
function navClass(p) {
  const base = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all mb-1 border cursor-pointer '
  return page.value === p
    ? base + 'bg-amber-400 text-gray-900 border-amber-400'
    : base + 'text-gray-400 hover:text-gray-100 hover:bg-gray-800 border-transparent'
}
 
function chipClass(status) {
  return {
    pending:   'bg-orange-500/10 text-orange-400',
    shipped:   'bg-amber-400/10 text-amber-400',
    delivered: 'bg-green-500/10 text-green-400',
  }[status] || 'bg-gray-700 text-gray-400'
}
 
const products = ref([])
const orders = ref([
  { id: 'ORD-0091', customerName: 'Amaka Obi',      productName: 'Running Shoes',    amount: 24500, date: 'May 4, 2026', status: 'shipped'   },
  { id: 'ORD-0090', customerName: 'Tunde Bello',    productName: 'Wireless Earbuds', amount: 18000, date: 'May 4, 2026', status: 'pending'   },
  { id: 'ORD-0089', customerName: 'Chisom Eze',     productName: 'Sneakers (x2)',    amount: 49000, date: 'May 3, 2026', status: 'delivered' },
  { id: 'ORD-0088', customerName: 'Kemi Adeyemi',   productName: 'Handbag',          amount: 31200, date: 'May 3, 2026', status: 'shipped'   },
  { id: 'ORD-0087', customerName: 'Biodun Adewale', productName: 'Cap + T-Shirt',    amount: 12800, date: 'May 2, 2026', status: 'delivered' },
])
 
const totalRevenue = computed(() =>
  orders.value.filter(o => o.status !== 'pending').reduce((s, o) => s + o.amount, 0)
)
const filteredOrders = computed(() =>
  activeFilter.value === 'All' ? orders.value : orders.value.filter(o => o.status === activeFilter.value)
)
 
const fileInput = ref(null)
const imagePreview = ref(null)
const submitting = ref(false)
const form = reactive({ name: '', price: null, stock: null, category: '', description: '' })
 
const previewFields = computed(() => [
  { key: 'Name',     val: form.name  || '—' },
  { key: 'Price',    val: form.price ? '₦' + Number(form.price).toLocaleString() : '—' },
  { key: 'Category', val: form.category || '—' },
  { key: 'Stock',    val: form.stock ? form.stock + ' units' : '—' },
])
 
function triggerUpload() { fileInput.value?.click() }
 
function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  // TODO: Upload to Cloudinary, save URL to form.imageUrl
  const reader = new FileReader()
  reader.onload = ev => { imagePreview.value = ev.target.result }
  reader.readAsDataURL(file)
}
 
async function submitProduct() {
  if (!form.name || !form.price) { showToast('⚠ Name and price are required'); return }
  submitting.value = true
  try {
    // await $fetch('/api/products', { method: 'POST', body: { ...form } })
    await new Promise(r => setTimeout(r, 800))
    showToast(`✓ "${form.name}" published!`)
    resetForm()
  } catch {
    showToast('✗ Failed to publish product')
  } finally {
    submitting.value = false
  }
}
 
function resetForm() {
  Object.assign(form, { name: '', price: null, stock: null, category: '', description: '' })
  imagePreview.value = null
}
 
const toast = reactive({ show: false, message: '' })
function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 3000)
}
</script>

<template>
  <div class="flex gap-5">
    <!-- Form -->
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-7">
      <h3 class="text-sm font-extrabold mb-5 pb-4 border-b border-gray-800">
        Product Details
      </h3>

      <div class="mb-5">
        <label
          class="block text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2"
          >Product Name</label
        >
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Air Force 1 Low '07"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 outline-none focus:border-amber-400 transition-colors placeholder-gray-600"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            class="block text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2"
            >Price (₦)</label
          >
          <input
            v-model.number="form.price"
            type="number"
            placeholder="25000"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 outline-none focus:border-amber-400 transition-colors placeholder-gray-600"
          />
        </div>
        <div>
          <label
            class="block text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2"
            >Stock Qty</label
          >
          <input
            v-model.number="form.stock"
            type="number"
            placeholder="50"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 outline-none focus:border-amber-400 transition-colors placeholder-gray-600"
          />
        </div>
      </div>

      <div class="mb-5">
        <label
          class="block text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2"
          >Category</label
        >
        <select
          v-model="form.category"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 outline-none focus:border-amber-400 transition-colors"
        >
          <option value="">Select category</option>
          <option>Footwear</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Electronics</option>
          <option>Bags</option>
        </select>
      </div>

      <div>
        <label
          class="block text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-2"
          >Description</label
        >
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Describe the product — materials, sizing, key features..."
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 outline-none focus:border-amber-400 transition-colors placeholder-gray-600 resize-y"
        />
      </div>
    </div>

    <!-- Right col -->
    <div class="flex flex-col gap-5">
      <!-- Image upload -->
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-7">
          <h3 class="text-sm font-extrabold mb-5 pb-4 border-b border-gray-800">
            Product Image
          </h3>
          <div
            @click="triggerUpload"
            class="border-2 border-dashed border-gray-700 hover:border-amber-400 bg-gray-800 hover:bg-amber-400/5 rounded-xl p-9 text-center cursor-pointer transition-all"
          >
            <div class="text-3xl mb-2">📦</div>
            <p class="text-sm text-gray-400">
              <strong class="text-amber-400">Click to upload</strong> via
              Cloudinary
            </p>
            <p class="text-[10px] font-mono text-gray-600 mt-1">
              PNG, JPG, WEBP · max 5MB
            </p>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
          <div
            v-if="imagePreview"
            class="mt-4 rounded-lg overflow-hidden border border-gray-700"
          >
            <img
              :src="imagePreview"
              alt="preview"
              class="w-full h-40 object-cover block"
            />
          </div>
        </div>

      <!-- Live preview -->
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-7">
          <h3 class="text-sm font-extrabold mb-5 pb-4 border-b border-gray-800">
            Live Preview
          </h3>
          <div class="divide-y divide-gray-800">
            <div
              v-for="item in previewFields"
              :key="item.key"
              class="flex justify-between items-center py-3"
            >
              <span class="text-[11px] font-mono text-gray-500">{{
                item.key
              }}</span>
              <span class="text-sm font-bold">{{ item.val }}</span>
            </div>
          </div>
        </div>

      <!-- Submit -->
      <div class="flex gap-3">
          <button
            @click="submitProduct"
            :disabled="submitting"
            class="flex-1 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 text-sm font-extrabold rounded-lg transition-all"
          >
            {{ submitting ? "Publishing..." : "Publish Product →" }}
          </button>
          <button
            @click="resetForm"
            class="px-5 py-3 border border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-400 text-sm font-bold rounded-lg transition-all"
          >
            Reset
          </button>
        </div>
    </div>
  </div>
</template>
