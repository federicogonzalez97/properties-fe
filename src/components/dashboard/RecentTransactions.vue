<template>
  <div class="recent-tx card">
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Header -->
    <div class="recent-tx__header card-header">

      <h3>Recent Transactions</h3>
      <a href="#" class="link-underline-anim link-primary">
        View orders
        <i class="mdi mdi-arrow-right"></i>
      </a>

    </div>

    <!-- Tabla -->
    <div class="recent-tx__table-wrapper">
      <table class="recent-tx__table">
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.id">
            <td>
              <img :src="tx.image" alt="property" />
            </td>
            <td class="text-muted">{{ tx.date }}</td>
            <td class="font-semibold">{{ tx.name }}</td>
            <td class="text-muted">{{ tx.price }}</td>
            <td class="font-semibold">{{ tx.type }}</td>
            <td>
              <span :class="['badge', getStatusClass(tx.status)]">
                {{ tx.status }}
              </span>
            </td>
          </tr>

          <!-- Estado vacío -->
          <tr v-if="!transactions.length">
            <td colspan="6" class="text-empty">
              No transactions available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { dashboardService } from '@/services/dashboard.service'

type TransactionStatus = 'Paid' | 'Unpaid' | 'Pending'

interface Transaction {
  id: number
  image: string
  date: string
  name: string
  price: string
  type: string
  status: TransactionStatus
}

const isLoading = ref(true)
const transactions = ref<Transaction[]>([])

const formatPrice = (price: unknown, currency?: string): string => {
  if (typeof price === 'string') return price
  if (typeof price === 'number') {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD' }).format(price)
    } catch {
      return `$${price.toLocaleString()}`
    }
  }
  return ''
}

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await dashboardService.getRecentTransactions(1, 10)
    transactions.value = res.data.map((it: any) => ({
      id: it.id,
      image: it.image,
      date: it.date,
      name: it.name,
      price: formatPrice(it.price, it.currency),
      type: it.type,
      status: it.status,
    }))
    if (!transactions.value.length) {
      transactions.value = []
    }
  } finally {
    isLoading.value = false
  }
})

const getStatusClass = (status: TransactionStatus) => {
  if (status === 'Paid') return 'badge-green'
  if (status === 'Unpaid') return 'badge-red'
  return 'badge-amber'
}
</script>

<style scoped>
.recent-tx__header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

/* 3. CONTENEDOR DE LA TABLA (CUERPO) */
.recent-tx__table-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0 24px;
  scroll-behavior: smooth;
  scrollbar-width: none; 
}

/* --- DESKTOP --- */
@media (min-width: 1000px) {
  .recent-tx__table-wrapper {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar {
    width: 10px;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
    border: 2px solid #f1f5f9;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
  }
}

/* --- MOBILE --- */
@media (max-width: 999px) {
  .recent-tx__table-wrapper {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar {
    width: 5px;
  }

  .recent-tx__table-wrapper::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 10px;
  }
}

.recent-tx__table-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}
.recent-tx__table-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.recent-tx__table-wrapper::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.recent-tx__table-wrapper:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}

/* TABLA */
.recent-tx__table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
}

.recent-tx__table th,
.recent-tx__table td {
  padding: 14px 4px;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center; /* CENTRADO */
}

/* HEADER SIN STICKY */
.recent-tx__table th {
  font-weight: 600;
  font-size: 0.9rem;
  background-color: var(--color-white, #ffffff);
  border-bottom: 1px solid var(--color-slate-100, #f1f5f9);
}

/* Primera columna (imagen) */
.recent-tx__table th:first-child,
.recent-tx__table td:first-child {
  text-align: left;
}

/* Segunda columna (Date) */
.recent-tx__table th:nth-child(2),
.recent-tx__table td:nth-child(2) {
  text-align: left;
}

/* Tercera columna (Name) */
.recent-tx__table th:nth-child(3),
.recent-tx__table td:nth-child(3) {
  text-align: left;
}

/* Cuarta columna (Price) */
.recent-tx__table th:nth-child(4),
.recent-tx__table td:nth-child(4) {
  text-align: left;
}

/* Quinta columna (Type) */
.recent-tx__table th:nth-child(5),
.recent-tx__table td:nth-child(5) {
  text-align: center;
}

/* Sexta columna (Status) */
.recent-tx__table th:last-child,
.recent-tx__table td:last-child {
  text-align: right;
}



.recent-tx__table td img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}

.recent-tx__table tbody tr {
  border-top: 1px solid var(--color-slate-100, #e5e7eb);
  transition: background-color 0.2s ease-in-out;
}

.recent-tx__table tbody tr:hover {
  background-color: var(--color-slate-50, #f8fafc);
  cursor: pointer;
}

.recent-tx__table td img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}

.text-empty {
  text-align: center;
  color: var(--color-slate-400, #94a3b8);
  padding: 16px 0;
  border:1px solid #e7000b ;
}


/* Spinner overlay */
.recent-tx { position: relative; }
.spinner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  z-index: 2;
  border-radius: var(--radius-lg);
}
.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e5e7eb;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>