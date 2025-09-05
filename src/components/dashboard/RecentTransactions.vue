<template>
  <div class="recent-tx">
    <!-- Header -->
    <div class="recent-tx__header">
      <h3>Recent Transactions</h3>
      <a href="#">
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
              <span :class="getStatusClass(tx.status)">
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
import { ref } from 'vue'

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

const transactions = ref<Transaction[]>([
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 15, 2024', 
    name: 'Sarah Johnson', 
    price: '$2,350', 
    type: 'Rent', 
    status: 'Paid' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 12, 2024', 
    name: 'Michael Chen', 
    price: '$485,000', 
    type: 'Sell', 
    status: 'Unpaid' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 10, 2024', 
    name: 'Emma Rodriguez', 
    price: '$1,850', 
    type: 'Rent', 
    status: 'Paid' 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 8, 2024', 
    name: 'David Thompson', 
    price: '$325,750', 
    type: 'Sell', 
    status: 'Paid' 
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 5, 2024', 
    name: 'Lisa Martinez', 
    price: '$1,100', 
    type: 'Rent', 
    status: 'Unpaid' 
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=48&h=48&fit=crop&crop=center', 
    date: 'Dec 3, 2024', 
    name: 'James Wilson', 
    price: '$1,500', 
    type: 'Rent', 
    status: 'Paid' 
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=48&h=48&fit=crop&crop=center', 
    date: 'Nov 28, 2024', 
    name: 'Amanda Foster', 
    price: '$310,000', 
    type: 'Sell', 
    status: 'Pending' 
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=48&h=48&fit=crop&crop=center', 
    date: 'Nov 25, 2024', 
    name: 'Robert Kim', 
    price: '$1,100', 
    type: 'Rent', 
    status: 'Paid' 
  },
])

const getStatusClass = (status: TransactionStatus) => ({
  'status-paid': status === 'Paid',
  'status-unpaid': status === 'Unpaid',
  'status-pending': status === 'Pending',
})
</script>

<style scoped>
/* 1. CONTENEDOR PRINCIPAL: Alineado con el estilo de .area-map-card */
.recent-tx {
  background-color: var(--color-white, #ffffff);
  border: 1px solid var(--color-slate-100, #f1f5f9);
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  height: 360px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

/* 2. HEADER: Alineado con el estilo de .area-map-header */
.recent-tx__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 24px;
  border-bottom: 1px solid var(--color-slate-100, #f1f5f9);
  flex-shrink: 0;
}

.recent-tx__header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.recent-tx__header a {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  color: oklch(0.704 0.04 256.788);
  text-decoration: none;
  padding-bottom: 5px;
  transition: color 0.2s ease-in-out;
}

.recent-tx__header a:hover {
  color: var(--color-primary, #00a63e);
}

.recent-tx__header a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary, #00a63e);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-in-out, ease-in-out);
}

.recent-tx__header a:hover::after {
  transform: scaleX(1);
}

.recent-tx__header a .mdi {
  margin-left: 4px;
  font-size: 1.1em;
  transition: transform 0.2s ease-in-out;
}

.recent-tx__header a:hover .mdi {
  transform: translateX(3px);
}

/* 3. CONTENEDOR DE LA TABLA (CUERPO) */
.recent-tx__table-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
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
  height: 5px;
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

/* ESTILOS RESTANTES */
.text-muted {
  color: var(--color-slate-400, #6474b8);
}
.font-semibold {
  font-weight: 600;
}
.status-paid, .status-unpaid, .status-pending {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  display: inline-block;
}
.status-paid { background-color: #d1fae5; color: #009966; }
.status-unpaid { background-color: #fee2e2; color: #e7000b; }
.status-pending { background-color: #ffedd5; color: #9a3412; }
.text-empty {
  text-align: center;
  color: var(--color-slate-400, #94a3b8);
  padding: 16px 0;
  border:1px solid #e7000b ;
}
</style>