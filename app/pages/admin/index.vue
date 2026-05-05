<template>
  <div class="admin-layout">

    <!-- SIDEBAR -->
    <nav class="sidebar">
      <div class="logo-area">
        <div class="logo-tag">Admin Panel</div>
        <div class="logo-name">Shop<span>HQ</span></div>
      </div>

      <div class="nav-section">
        <div class="nav-label">Main</div>
        <a class="nav-item" :class="{ active: page === 'home' }" @click="page = 'home'">
          <IconHome class="nav-icon" />
          Home
        </a>

        <div class="nav-label">Commerce</div>
        <a class="nav-item" :class="{ active: page === 'orders' }" @click="page = 'orders'">
          <IconShoppingBag class="nav-icon" />
          Orders Sent
          <span class="nav-badge">{{ orders.length }}</span>
        </a>
        <a class="nav-item" :class="{ active: page === 'listing' }" @click="page = 'listing'">
          <IconPlus class="nav-icon" />
          Add Listing
        </a>
      </div>

      <div class="sidebar-footer">
        <div class="admin-chip">
          <div class="admin-avatar">A</div>
          <div class="admin-info">
            <div class="admin-name">Admin</div>
            <div class="admin-role">● SUPER ADMIN</div>
          </div>
        </div>
      </div>
    </nav>

    <!-- MAIN -->
    <div class="main">

      <!-- TOPBAR -->
      <div class="topbar">
        <div>
          <div class="page-title">{{ pageMeta[page].title }}</div>
          <div class="page-subtitle">{{ pageMeta[page].subtitle }}</div>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-primary" @click="page = 'listing'">+ New Product</button>
        </div>
      </div>

      <div class="content">

        <!-- HOME -->
        <div v-if="page === 'home'">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Revenue</div>
              <div class="stat-value">₦{{ totalRevenue.toLocaleString() }}</div>
              <div class="stat-delta up">↑ from orders</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Orders Sent</div>
              <div class="stat-value">{{ orders.length }}</div>
              <div class="stat-delta up">All time</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Active Listings</div>
              <div class="stat-value">{{ products.length }}</div>
              <div class="stat-delta">In your store</div>
            </div>
          </div>

          <div class="section-title">Recent Orders</div>
          <div class="table-card">
            <div class="table-head home-cols">
              <div class="th">Order ID</div>
              <div class="th">Customer</div>
              <div class="th">Product</div>
              <div class="th">Amount</div>
              <div class="th">Status</div>
            </div>
            <div
              v-for="order in orders.slice(0, 5)"
              :key="order.id"
              class="table-row home-cols"
            >
              <div class="order-id">#{{ order.id }}</div>
              <div>{{ order.customerName }}</div>
              <div class="muted small">{{ order.productName }}</div>
              <div>₦{{ order.amount.toLocaleString() }}</div>
              <div><span class="status-chip" :class="order.status">{{ order.status }}</span></div>
            </div>
          </div>
        </div>

        <!-- ORDERS -->
        <div v-else-if="page === 'orders'">
          <div class="filter-bar">
            <button
              v-for="f in ['All', 'pending', 'shipped', 'delivered']"
              :key="f"
              class="filter-btn"
              :class="{ active: activeFilter === f }"
              @click="activeFilter = f"
            >{{ f === 'All' ? 'All Orders' : f.charAt(0).toUpperCase() + f.slice(1) }}</button>
          </div>

          <div class="table-card">
            <div class="table-head order-cols">
              <div class="th">Order ID</div>
              <div class="th">Customer</div>
              <div class="th">Product</div>
              <div class="th">Date</div>
              <div class="th">Amount</div>
              <div class="th">Status</div>
            </div>
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="table-row order-cols"
            >
              <div class="order-id">#{{ order.id }}</div>
              <div>{{ order.customerName }}</div>
              <div class="muted small">{{ order.productName }}</div>
              <div class="mono small muted">{{ order.date }}</div>
              <div>₦{{ order.amount.toLocaleString() }}</div>
              <div><span class="status-chip" :class="order.status">{{ order.status }}</span></div>
            </div>
            <div v-if="filteredOrders.length === 0" class="empty-state">
              No orders match this filter.
            </div>
          </div>
        </div>

        <!-- ADD LISTING -->
        <div v-else-if="page === 'listing'">
          <div class="listing-grid">
            <!-- LEFT: FORM -->
            <div class="form-card">
              <div class="form-card-title">Product Details</div>

              <div class="field">
                <label>Product Name</label>
                <input v-model="form.name" type="text" placeholder="e.g. Air Force 1 Low '07" />
              </div>

              <div class="field-row">
                <div class="field">
                  <label>Price (₦)</label>
                  <input v-model.number="form.price" type="number" placeholder="25000" />
                </div>
                <div class="field">
                  <label>Stock Qty</label>
                  <input v-model.number="form.stock" type="number" placeholder="50" />
                </div>
              </div>

              <div class="field">
                <label>Category</label>
                <select v-model="form.category">
                  <option value="">Select category</option>
                  <option>Footwear</option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                  <option>Electronics</option>
                  <option>Bags</option>
                </select>
              </div>

              <div class="field">
                <label>Description</label>
                <textarea v-model="form.description" placeholder="Describe the product — materials, sizing, key features..." />
              </div>
            </div>

            <!-- RIGHT: IMAGE + PREVIEW -->
            <div class="right-col">
              <div class="form-card">
                <div class="form-card-title">Product Image</div>
                <div class="upload-zone" @click="triggerUpload">
                  <div class="upload-icon">📦</div>
                  <div class="upload-text"><strong>Click to upload</strong> via Cloudinary</div>
                  <div class="upload-hint">PNG, JPG, WEBP · max 5MB</div>
                </div>
                <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="handleImageUpload" />
                <div v-if="imagePreview" class="img-preview">
                  <img :src="imagePreview" alt="preview" />
                </div>
              </div>

              <div class="form-card">
                <div class="form-card-title">Live Preview</div>
                <div class="preview-stack">
                  <div class="preview-field">
                    <span class="key">Name</span>
                    <span class="val">{{ form.name || '—' }}</span>
                  </div>
                  <div class="preview-field">
                    <span class="key">Price</span>
                    <span class="val">{{ form.price ? '₦' + form.price.toLocaleString() : '—' }}</span>
                  </div>
                  <div class="preview-field">
                    <span class="key">Category</span>
                    <span class="val">{{ form.category || '—' }}</span>
                  </div>
                  <div class="preview-field">
                    <span class="key">Stock</span>
                    <span class="val">{{ form.stock ? form.stock + ' units' : '—' }}</span>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button class="btn-submit" :disabled="submitting" @click="submitProduct">
                  {{ submitting ? 'Publishing...' : 'Publish Product →' }}
                </button>
                <button class="btn-reset" @click="resetForm">Reset</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- TOAST -->
    <div class="toast" :class="{ show: toast.show }">{{ toast.message }}</div>

  </div>
</template>

<script setup>
definePageMeta({ layout: false })

// ─── Page state ───────────────────────────────────────────────
const page = ref('home')
const activeFilter = ref('All')

const pageMeta = {
  home:    { title: 'Overview',    subtitle: "Welcome back — here's what's happening" },
  orders:  { title: 'Orders Sent', subtitle: 'Track and manage all outgoing orders' },
  listing: { title: 'Add Listing', subtitle: 'Add a new product to your store' },
}

// ─── Mock data (replace with useFetch from your API) ──────────
const products = ref([])
const orders = ref([
  { id: 'ORD-0091', customerName: 'Amaka Obi',     productName: 'Running Shoes', amount: 24500, date: 'May 4, 2026', status: 'shipped' },
  { id: 'ORD-0090', customerName: 'Tunde Bello',   productName: 'Wireless Earbuds', amount: 18000, date: 'May 4, 2026', status: 'pending' },
  { id: 'ORD-0089', customerName: 'Chisom Eze',    productName: 'Sneakers (x2)', amount: 49000, date: 'May 3, 2026', status: 'delivered' },
  { id: 'ORD-0088', customerName: 'Kemi Adeyemi',  productName: 'Handbag', amount: 31200, date: 'May 3, 2026', status: 'shipped' },
  { id: 'ORD-0087', customerName: 'Biodun Adewale',productName: 'Cap + T-Shirt', amount: 12800, date: 'May 2, 2026', status: 'delivered' },
])

const totalRevenue = computed(() =>
  orders.value.filter(o => o.status !== 'pending').reduce((sum, o) => sum + o.amount, 0)
)

const filteredOrders = computed(() =>
  activeFilter.value === 'All' ? orders.value : orders.value.filter(o => o.status === activeFilter.value)
)

// ─── Form ──────────────────────────────────────────────────────
const fileInput = ref(null)
const imagePreview = ref(null)
const submitting = ref(false)
const form = reactive({ name: '', price: null, stock: null, category: '', description: '' })

function triggerUpload() { fileInput.value?.click() }

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  // TODO: Upload to Cloudinary here, then store the returned URL in form.imageUrl
  const reader = new FileReader()
  reader.onload = ev => { imagePreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

async function submitProduct() {
  if (!form.name || !form.price) { showToast('⚠ Product name and price are required'); return }
  submitting.value = true
  try {
    // Replace this with your actual API call:
    // await $fetch('/api/products', { method: 'POST', body: { ...form, imageUrl: form.imageUrl } })
    await new Promise(r => setTimeout(r, 800)) // simulate
    products.value.push({ ...form })
    showToast(`✓ "${form.name}" published successfully!`)
    resetForm()
  } catch (err) {
    showToast('✗ Failed to publish product')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  Object.assign(form, { name: '', price: null, stock: null, category: '', description: '' })
  imagePreview.value = null
}

// ─── Toast ─────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '' })
function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 3200)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; }

:root {
  --bg: #0d0d0f;
  --surface: #141416;
  --surface2: #1c1c20;
  --border: #2a2a30;
  --accent: #e8ff47;
  --accent2: #ff6b35;
  --text: #f0f0f2;
  --muted: #6b6b78;
  --sidebar-w: 240px;
}

.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: 'Syne', sans-serif;
}

/* ── SIDEBAR ── */
.sidebar {
  width: var(--sidebar-w);
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.logo-area {
  padding: 28px 24px 20px;
  border-bottom: 1px solid var(--border);
}
.logo-tag {
  font-size: 10px; font-family: 'DM Mono', monospace;
  color: var(--accent); letter-spacing: 0.2em;
  text-transform: uppercase; margin-bottom: 4px;
}
.logo-name { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
.logo-name span { color: var(--accent); }

.nav-section { padding: 20px 12px; flex: 1; }
.nav-label {
  font-family: 'DM Mono', monospace; font-size: 9px;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--muted); padding: 0 12px;
  margin-bottom: 8px; margin-top: 16px;
}
.nav-label:first-child { margin-top: 0; }

.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 8px; cursor: pointer;
  color: var(--muted); font-size: 14px; font-weight: 600;
  transition: all 0.15s; margin-bottom: 2px;
  border: 1px solid transparent; user-select: none;
}
.nav-item:hover { color: var(--text); background: var(--surface2); border-color: var(--border); }
.nav-item.active { color: var(--bg); background: var(--accent); border-color: var(--accent); }
.nav-icon { width: 17px; height: 17px; flex-shrink: 0; }
.nav-badge {
  margin-left: auto; font-family: 'DM Mono', monospace;
  font-size: 10px; background: var(--surface2);
  color: var(--muted); padding: 2px 7px; border-radius: 20px;
}
.nav-item.active .nav-badge { background: rgba(0,0,0,0.15); color: var(--bg); }

.sidebar-footer { padding: 16px 12px; border-top: 1px solid var(--border); }
.admin-chip {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; background: var(--surface2);
  border-radius: 8px; border: 1px solid var(--border);
}
.admin-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); display: flex; align-items: center;
  justify-content: center; font-size: 13px;
  font-weight: 800; color: var(--bg); flex-shrink: 0;
}
.admin-name { font-size: 13px; font-weight: 700; color: var(--text); }
.admin-role { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--accent); }

/* ── MAIN ── */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px; border-bottom: 1px solid var(--border);
  background: var(--surface); flex-shrink: 0;
}
.page-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
.page-subtitle { font-size: 12px; color: var(--muted); margin-top: 2px; font-family: 'DM Mono', monospace; }

.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 8px; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all 0.15s; }
.btn-primary { background: var(--accent); color: var(--bg); }
.btn-primary:hover { background: #d4eb2e; }

.content { flex: 1; overflow-y: auto; padding: 32px; }
.content::-webkit-scrollbar { width: 4px; }
.content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ── STATS ── */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
.stat-card:hover { border-color: var(--accent); }
.stat-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.stat-value { font-size: 32px; font-weight: 800; letter-spacing: -1px; }
.stat-delta { font-family: 'DM Mono', monospace; font-size: 11px; margin-top: 6px; color: var(--muted); }
.stat-delta.up { color: var(--accent); }

/* ── TABLE ── */
.section-title { font-size: 15px; font-weight: 800; margin-bottom: 16px; }
.table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.home-cols  { display: grid; grid-template-columns: 1fr 1.2fr 0.8fr 0.8fr 0.7fr; }
.order-cols { display: grid; grid-template-columns: 0.8fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr; }
.table-head { padding: 14px 20px; border-bottom: 1px solid var(--border); background: var(--surface2); }
.th { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }
.table-row { padding: 15px 20px; border-bottom: 1px solid var(--border); font-size: 13px; align-items: center; transition: background 0.15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: var(--surface2); }
.order-id { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--accent); }
.muted { color: var(--muted); }
.small { font-size: 12px; }
.mono { font-family: 'DM Mono', monospace; }
.empty-state { padding: 32px; text-align: center; color: var(--muted); font-family: 'DM Mono', monospace; font-size: 13px; }

.status-chip { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; text-transform: capitalize; }
.status-chip.pending   { background: rgba(255,107,53,0.12); color: var(--accent2); }
.status-chip.shipped   { background: rgba(232,255,71,0.1);  color: var(--accent); }
.status-chip.delivered { background: rgba(100,220,140,0.1); color: #64dc8c; }

/* ── FILTER ── */
.filter-bar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.filter-btn { padding: 8px 16px; border-radius: 6px; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; border: 1px solid var(--border); background: var(--surface); color: var(--muted); transition: all 0.15s; }
.filter-btn:hover, .filter-btn.active { border-color: var(--accent); color: var(--accent); }

/* ── LISTING FORM ── */
.listing-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; }
.right-col { display: flex; flex-direction: column; gap: 18px; }
.form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 28px; }
.form-card-title { font-size: 14px; font-weight: 800; margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
.field { margin-bottom: 18px; }
.field label { display: block; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 7px; }
.field input, .field textarea, .field select {
  width: 100%; padding: 11px 14px; background: var(--surface2);
  border: 1px solid var(--border); border-radius: 8px;
  color: var(--text); font-family: 'Syne', sans-serif; font-size: 14px;
  outline: none; transition: border-color 0.15s;
}
.field input:focus, .field textarea:focus, .field select:focus { border-color: var(--accent); }
.field textarea { resize: vertical; min-height: 90px; }
.field select option { background: var(--surface2); }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.upload-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: var(--surface2); }
.upload-zone:hover { border-color: var(--accent); background: rgba(232,255,71,0.03); }
.upload-icon { font-size: 32px; margin-bottom: 10px; }
.upload-text { font-size: 13px; color: var(--muted); }
.upload-text strong { color: var(--accent); }
.upload-hint { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); margin-top: 6px; }
.img-preview { margin-top: 14px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); }
.img-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }

.preview-stack { display: flex; flex-direction: column; gap: 0; }
.preview-field { display: flex; justify-content: space-between; font-size: 13px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.preview-field:last-child { border-bottom: none; }
.preview-field .key { color: var(--muted); font-family: 'DM Mono', monospace; font-size: 11px; }
.preview-field .val { color: var(--text); font-weight: 600; }

.form-actions { display: flex; gap: 10px; }
.btn-submit { flex: 1; padding: 13px; background: var(--accent); color: var(--bg); border: none; border-radius: 8px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.15s; }
.btn-submit:hover:not(:disabled) { background: #d4eb2e; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-reset { padding: 13px 20px; background: transparent; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.btn-reset:hover { border-color: var(--accent2); color: var(--accent2); }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 28px; right: 28px;
  background: var(--surface); border: 1px solid var(--accent);
  border-radius: 10px; padding: 14px 20px;
  font-size: 13px; font-weight: 700; color: var(--accent);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transform: translateY(80px); opacity: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 999; font-family: 'DM Mono', monospace;
  pointer-events: none;
}
.toast.show { transform: translateY(0); opacity: 1; }
</style>