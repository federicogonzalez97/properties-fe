<template>
  <footer class="footer-bar">
    <div class="footer-inner">
      <p class="footer-text">
        © 2025 Hously. Design with
        <i class="mdi mdi-heart text-red-600" aria-hidden="true"></i>
        by Shreethemes.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-bar {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 62.63px; 
  background: transparent; 
  border: none;
  border-top: 1px solid var(--color-slate-100, #f1f5f9);
  box-shadow: 0 -1px 0 rgba(0,0,0,0.04);
}

.footer-inner {
  width: 100%;
  max-width: 1354px; 
  height: 100%;
  padding: 16px 24px; 
  align-items: center;
  justify-content: center; 
}

.footer-text {
  margin: 0;
  max-width: 1306px;
  line-height: 24px; 
  height: 24px;
  text-align: left;
  color: oklch(0.704 0.04 256.788); 
  font-size: 14px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>