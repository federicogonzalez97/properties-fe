<template>
  <div class="dashboard" :class="dashboardClass">
    <aside class="dashboard__sidebar" :class="sidebarClass">
      <div class="page-wrapper">
        <div class="sidebar-wrapper">
          <div class="sidebar-brand">
            <a href="#" class="sidebar-logo">
              <img
                src="/images/Hously.png"
                alt="Hously Logo"
                class="sidebar-logo__img"
              />
            </a>

            <button
              class="dashboard__sidebar-close"
              @click="toggleSidebar"
              v-if="isMobile"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav class="dashboard__sidebar-nav">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#" class="nav-link active">
                  <i class="mdi mdi-chart-bell-curve-cumulative"></i>
                  <span class="nav-link__text">Dashboard</span>
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-home-city"></i>
                  <span class="nav-link__text">Explore Properties</span>
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-home-heart"></i>
                  <span class="nav-link__text">Favorite Properties</span>
                </a>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="mdi mdi-home-plus"></i>
                  <span class="nav-link__text">Add Properties</span>
                </a>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('apps')">
                  <i class="mdi mdi-apps"></i>
                  <span class="nav-link__text">Apps</span>
                  <span class="nav-link__badge">New</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.apps }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.apps">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--apps"></span>Chat</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--apps"></span>Email</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--apps"></span>Calendar</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('userProfile')">
                  <i class="mdi mdi-account-edit"></i>
                  <span class="nav-link__text">User Profile</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.userProfile }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.userProfile">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--userProfile"></span>Profile</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--userProfile"></span>Profile Settings</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('blog')">
                  <i class="mdi mdi-post-outline"></i>
                  <span class="nav-link__text">Blog</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.blog }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.blog">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--blog"></span>Blogs</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--blog"></span>Blogs Detail</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('invoice')">
                  <i class="mdi mdi-receipt-text"></i>
                  <span class="nav-link__text">Invoice</span>
                  <span class="nav-link__badge">New</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.invoice }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.invoice">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--invoice"></span>Invoice List</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--invoice"></span>Invoice Preview</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('pages')">
                  <i class="mdi mdi-file-document-outline"></i>
                  <span class="nav-link__text">Pages</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.pages }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.pages">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>Starter</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>FAQs</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>Pricing</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>Review</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>Privacy Policy</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--pages"></span>Terms & Condition</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('authentication')">
                  <i class="mdi mdi-login"></i>
                  <span class="nav-link__text">Authentication</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.authentication }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.authentication">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--authentication"></span>Login</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--authentication"></span>Signup</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--authentication"></span>Signup Success</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--authentication"></span>Reset Password</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--authentication"></span>Lockscreen</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item sidebar-dropdown">
                <a href="javascript:void(0)" class="nav-link" @click="toggleDropdown('miscellaneous')">
                  <i class="mdi mdi-layers"></i>
                  <span class="nav-link__text">Miscellaneous</span>
                  <i class="mdi mdi-chevron-right dropdown-arrow" :class="{ 'rotated': openDropdowns.miscellaneous }"></i>
                </a>
                <div class="sidebar-submenu" v-show="openDropdowns.miscellaneous">
                  <ul>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--miscellaneous"></span>Coming Soon</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--miscellaneous"></span>Maintenance</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--miscellaneous"></span>Error</a></li>
                    <li><a href="#" @click.prevent="navigateToHome"><span class="submenu-dot submenu-dot--miscellaneous"></span>Thank You</a></li>
                  </ul>
                </div>
              </li>
              
              <li class="nav-item dashboard-upgrade-item">
                <div class="dashboard-upgrade">
                  <div class="dashboard-upgrade__content">
                    <h4 class="dashboard-upgrade__title">Upgrade to Pro</h4>
                    <p class="dashboard-upgrade__desc">
                      Get one month free and subscribe to pro
                    </p>
                    <button class="dashboard-upgrade__btn">Subscribe</button>
                  </div>
                  <i class="dashboard-upgrade__bg-icon mdi mdi-home-city-outline"></i>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>

    <main class="dashboard__main">
      <header class="dashboard__header">
      <div class="header-bar">
        <div class="header-bar__left">
          <div class="header-bar__logo-tablet">
            <img
              src="/images/Hously2.png"
              alt="Hously Logo"
              class="header-bar__logo-tablet-img"
            />
          </div>

          <button class="header-bar__hamburger" @click="toggleSidebar">
            <svg
              class="header-bar__hamburger-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div class="header-bar__search">
            <svg
              class="header-bar__search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              class="header-bar__search-input"
              placeholder="Search..."
              name="s"
              id="searchItem"
            />
          </div>
        </div>

        <div class="header-bar__right">
          <button class="header-bar__icon-btn header-bar__icon-btn--flag">
            <img src="/images/usa.png" alt="USA Flag" />
          </button>

          <button
            class="header-bar__icon-btn header-bar__icon-btn--notification"
          >
            <svg
              class="header-bar__icon-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="notification-badge"></span>
          </button>

          <button class="header-bar__icon-btn">
            <img
              src="/images/user.jpg"
              alt="Profile"
              class="header-bar__icon-btn-profile"
            />
          </button>
        </div>
      </div>
    </header>

      <DashboardView @toggleSidebar="toggleSidebar" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import DashboardView from './DashboardView.vue';

const router = useRouter();

const isSidebarExpanded = ref(false); 
const isMobile = ref(false);

const openDropdowns = ref({
  apps: false,
  userProfile: false,
  blog: false,
  invoice: false,
  pages: false,
  authentication: false,
  miscellaneous: false
});

const toggleDropdown = (dropdownName: string) => {
  Object.keys(openDropdowns.value).forEach(key => {
    if (key !== dropdownName) {
      openDropdowns.value[key as keyof typeof openDropdowns.value] = false;
    }
  });
  
  openDropdowns.value[dropdownName as keyof typeof openDropdowns.value] = 
    !openDropdowns.value[dropdownName as keyof typeof openDropdowns.value];
};

const navigateToHome = () => {
  router.push('/');
};

const dashboardClass = computed(() => ({
  "dashboard--sidebar-expanded": isSidebarExpanded.value,
  "dashboard--sidebar-collapsed": !isSidebarExpanded.value,
}));

const sidebarClass = computed(() => ({
  "dashboard__sidebar--expanded": isSidebarExpanded.value,
  "dashboard__sidebar--collapsed": !isSidebarExpanded.value,
}));

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const checkMobile = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 768;
  
  if (width <= 1000) {
    isSidebarExpanded.value = false;
  } else {
    if (!isSidebarExpanded.value) {
      isSidebarExpanded.value = true;
    }
  }
};




onMounted(() => {
  checkMobile();
  let resizeTimeout: number;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      checkMobile();
    }, 100); 
  };
  
  window.addEventListener("resize", handleResize);
  
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(resizeTimeout);
  });
});
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-slate-50);
  position: relative; 
}

@media (max-width: 1000px) {
  .dashboard {
    display: flex;
    min-height: auto;
  }
  
  .dashboard__sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
  }
  
  .dashboard__main {
    margin-left: 0;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .dashboard__sidebar--expanded + .dashboard__main {
    margin-left: 0;
    width: 100%;
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0;
    width: 100%;
  }
}

@media (min-width: 1001px) {
  .dashboard {
    display: flex;
  }
  
  .dashboard__sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
  }
  
  .dashboard__main {
    margin-left: 0;
    width: 100%;
  }
  
  .dashboard__sidebar--expanded + .dashboard__main {
    margin-left: 300px;
    width: calc(100% - 300px);
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0;
    width: 100%;
  }
}

.dashboard__sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: var(--color-slate-900);
  transition: all 0.5s ease-in-out;
  z-index: 50; 
  display: flex;
  flex-direction: column;
  font-family: var(--font-league-regular);
  font-weight: var(--font-league-400);
}

.dashboard__sidebar--collapsed {
  width: 0; 
  overflow: hidden;
}

.dashboard__sidebar--expanded {
  width: 300px; 
}

.dashboard__main {
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.5s ease-in-out, width 0.5s ease-in-out;
  min-height: calc(100vh - 70px); 
  background-color: var(--color-slate-50);
  position: relative;
  z-index: 1; 
  width: 100%; 
  overflow-x: hidden; 
  min-width: 0;
}

.dashboard__sidebar--expanded + .dashboard__main {
  margin-left: 300px;
  width: calc(100% - 300px);
}

.dashboard__header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  box-shadow: var(--tw-shadow);
  font-family: var(--font-league-regular);
  font-weight: var(--font-league-400);
}

.dashboard__content {
  padding: calc(var(--spacing) * 6);
}

.dashboard-view {
  width: 100%;
  min-width: 0;
  overflow: visible;
}

.dashboard-view__content {
  width: 100%;
  min-width: 0;
  overflow: visible;
}

@media (max-width: 1000px) {
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0 !important;
    width: 100% !important;
    min-height: auto !important;
  }
  
  .dashboard__main {
    margin-left: 0 !important;
    width: 100% !important;
    min-height: auto !important;
  }
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: calc(var(--spacing) * 6); 
  background-color: var(--color-white);
  position: relative;
  box-shadow: var(--tw-shadow);
  font-family: var(--font-league-regular);
  font-weight: var(--font-league-400);
}

.header-bar__left {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 4); 
}

.header-bar__right {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 3); 
}

.header-bar__hamburger {
  width: 32px;
  height: 32px;
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--default-transition-duration)
    var(--default-transition-timing-function);
}

.header-bar__hamburger:hover {
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
}

.header-bar__hamburger-icon {
  width: 16px;
  height: 16px;
  color: var(--color-slate-700);
}

.header-bar__search {
  position: relative;
  width: 224px; 
}

.header-bar__search-input {
  width: 100%;
  height: 32px; 
  padding: 8px 12px 8px 36px; 
  background-color: transparent;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  outline: none;
  font-size: var(--text-sm);
  transition: border-color var(--default-transition-duration)
    var(--default-transition-timing-function);
}

.header-bar__search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 166, 62, 0.1);
}

.header-bar__search-input::placeholder {
  color: var(--color-gray-400);
}

.header-bar__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-gray-400);
  pointer-events: none;
}

.header-bar__icon-btn {
  width: 32px; 
  height: 32px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--default-transition-duration)
    var(--default-transition-timing-function);
}

.header-bar__icon-btn-icon {
  width: 16px;
  height: 16px;
  color: var(--color-slate-700);
}

.header-bar__icon-btn--flag img {
  width: 24px; 
  height: 24px; 
  border-radius: var(--radius-md);
}

.header-bar__icon-btn-profile {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  object-fit: cover;
}

.header-bar__icon-btn--notification {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px; 
  height: 8px; 
  background-color: var(--color-red-600);
  border-radius: 50%;
  animation: pulse-wave 2s infinite;
}

.notification-badge::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-red-600);
  border-radius: 50%;
  animation: wave-expand 2s infinite;
}

.notification-badge::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-red-600);
  border-radius: 50%;
  animation: wave-expand 2s infinite 0.5s;
}

@keyframes wave-expand {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes pulse-wave {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.page-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-wrapper .sidebar-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page-wrapper .sidebar-wrapper .sidebar-brand {
  align-items: center;
  display: flex;
  height: 70px;
  padding-block: calc(var(--spacing) * 2.5);
  padding-inline: calc(var(--spacing) * 5);
  border-bottom: 1px solid var(--color-slate-700);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  color: var(--color-white);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  font-size: var(--text-xl);
}

.sidebar-logo__img {
  height: auto;
  max-width: 100%;
}

.sidebar-logo__text {
  opacity: 1;
  transition: opacity var(--default-transition-duration)
    var(--default-transition-timing-function);
}

.dashboard__sidebar--collapsed .sidebar-logo__text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.dashboard__sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #fafafa1a transparent;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .dashboard__sidebar-nav::-webkit-scrollbar {
    width: 1px;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-thumb {
    background-color: var(--color-slate-900);
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }

  .dashboard__sidebar-nav:hover::-webkit-scrollbar-thumb {
    background-color: #fafafa1a;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .dashboard__sidebar-nav::-webkit-scrollbar {
    width: 1px;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-thumb {
    background-color: var(--color-slate-900);
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }

  .dashboard__sidebar-nav:hover::-webkit-scrollbar-thumb {
    background-color: #fafafa1a;
  }
}

@media (min-width: 1000px) {
  .dashboard__sidebar-nav::-webkit-scrollbar {
    width: 1px;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .dashboard__sidebar-nav::-webkit-scrollbar-thumb {
    background-color: var(--color-slate-900);
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }

  .dashboard__sidebar-nav:hover::-webkit-scrollbar-thumb {
    background-color: #fafafa1a;
  }
}

.dashboard-upgrade-item {
  margin-bottom: 0;
  margin-top: 36px;
  padding-top: 5px;
}

.dashboard-upgrade {
  position: relative;
  padding: 40px 14px;
  margin: 18px;
  height: 240px;
  background: linear-gradient(to bottom, #243146 0%, transparent 100%);
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
}

.dashboard-upgrade__content {
  position: relative;
  z-index: 2;
}

.dashboard-upgrade__title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-white);
  margin: 0 0 8px;
}

.dashboard-upgrade__desc {
  font-weight: 500;
  font-size: 14px;
  color: #90a1b9;
  margin-top: 15px;
  margin-bottom: 20px;
  padding: 0 20px;
}

.dashboard-upgrade__btn {
  display: inline-block;
  width: 70%;
  text-align: center;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: var(--font-weight-medium);
  font-family: "Roboto", "Helvetica Neue", sans-serif;
  color: rgba(255, 255, 255, 0.5);
  background: linear-gradient(to bottom, #243146 0%, transparent 100%);
  border: 1px solid #5a597059;
  border-radius: 6px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.dashboard-upgrade__btn:hover {
  background: #ffffff80;
  border-color: #ffffff80;
}

.dashboard-upgrade__bg-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 160px;
  color: var(--color-white);
  opacity: 0.02;
  z-index: 1;
  pointer-events: none;
}



.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: calc(var(--spacing) * 2);
  margin-top: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  width: 300px;
  height: 48px;
  padding: 12px 24px 12px 20px; 
  color: #ffffff;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--default-transition-duration)
    var(--default-transition-timing-function);
  white-space: nowrap;
  font-family: "Roboto", "Helvetica Neue", sans-serif;
  font-size: 9px;
  position: relative; 
}

@media (max-width: 768px) {
  .nav-link {
    width: 100%; 
    max-width: 260px; 
    padding: 12px 16px; 
  }
  
  .sidebar-submenu {
    padding-left: 55px;
  }
  
  .dashboard__sidebar .nav-link .dropdown-arrow,
  .dashboard__sidebar .nav-link i.mdi-chevron-right {
    right: 10px !important;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .nav-link {
    width: 300px;
    padding: 12px 24px 12px 20px;
  }
  
  .sidebar-submenu {
    padding-left: 59px;
  }
  
  .dashboard__sidebar .nav-link .dropdown-arrow,
  .dashboard__sidebar .nav-link i.mdi-chevron-right {
    right: 10px !important;
  }
}

@media (min-width: 1000px) {
  .nav-link {
    width: 300px;
    padding: 12px 24px 12px 20px;
  }
  
  .sidebar-submenu {
    padding-left: 59px;
  }
  
  .nav-link .dropdown-arrow,
  .nav-link i.mdi-chevron-right {
    right: 10px !important;
  }
}

.nav-link:hover {
  color: var(--color-white);
}

.nav-link:hover i:not(.dropdown-arrow) {
  background-color: #fafafa1a;
  color: #ffffff;
}

.nav-link:hover .nav-link__text {
  color: #ffffff;
}

.nav-link:hover .dropdown-arrow,
.nav-link:hover i.mdi-chevron-right {
  color: #ffffff !important;
}

.nav-link.active {
  color: var(--color-white);
}

.nav-link.active i:not(.dropdown-arrow) {
  background-color: #fafafa1a;
  color: #ffffff;
}

.nav-link.active .nav-link__text {
  color: #ffffff;
}

.nav-link.active .dropdown-arrow,
.nav-link.active i.mdi-chevron-right {
  color: #ffffff !important;
}

.dashboard ::selection {
  background-color: var(--color-primary-dark);
  color: #ffffff !important;
  font-weight: 700;
  font-weight: var(--font-weight-medium);
}

.dashboard ::-moz-selection {
  background-color: var(--color-primary-dark);
  color: #ffffff !important;
  font-size: 15px;
  font-weight: var(--font-weight-medium);
}

.nav-link .dropdown-arrow {
  position: absolute !important;
  right: 30px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 16px !important;
  color: #ffffff80 !important;
  transition: all 0.3s ease !important;
  background-color: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: auto !important;
  min-height: auto !important;
  z-index: 10 !important;
  opacity: 1 !important;
  visibility: visible !important;
  font-family: "Material Design Icons" !important;
}

.nav-link i.mdi-chevron-right {
  position: absolute !important;
  right: 30px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 16px !important;
  color: #ffffff80 !important;
  background-color: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: auto !important;
  min-height: auto !important;
  z-index: 10 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.nav-link .dropdown-arrow.rotated {
  transform: translateY(-50%) rotate(90deg) !important;
}

.sidebar-dropdown {
  position: relative;
}

.sidebar-submenu {
  margin-top: 4px;
  padding-right: 39px;
}

.sidebar-submenu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-submenu li {
  margin: 0;
}

.sidebar-submenu a {
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 0;
  color: #ffffff80;
  text-decoration: none;
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.sidebar-submenu a:hover {
  color: var(--color-white);
  background-color: transparent;
}

.sidebar-submenu a:hover .submenu-dot {
  background-color: var(--color-white) !important;
}

.submenu-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.submenu-dot--apps {
  background-color: #fafafa1a;
}

.submenu-dot--userProfile {
  background-color: #fafafa1a;
}

.submenu-dot--blog {
  background-color: #fafafa1a;
}

.submenu-dot--invoice {
  background-color: #fafafa1a;
}

.submenu-dot--pages {
  background-color: #fafafa1a;
}

.submenu-dot--authentication {
  background-color: #fafafa1a;
}

.submenu-dot--miscellaneous {
  background-color: #fafafa1a;
}

.nav-link__icon {
  width: 17px;
  height: 24px;
  flex-shrink: 0;
  color: #ffffff;
  padding: 4px;
  border-radius: 4px;
  margin: 0 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  font-size: 17px;
}

.nav-link__text {
  font-weight: var(--font-weight-medium);
  font-size: 15px;
  padding: 8px 0;
  transition: color 0.3s ease, font-weight 0.3s ease;
}

.nav-link__badge {
  background-color: var(--color-yellow-500);
  color: var(--color-white);
  font-size: 12px;
  font-weight: var(--font-weight-bold);
  width: 39px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  margin-left: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.dashboard__sidebar--collapsed .nav-link__text,
.dashboard__sidebar--collapsed .nav-link__badge {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.dashboard__sidebar-upgrade {
  padding: calc(var(--spacing) * 4);
  border-top: 1px solid var(--color-slate-700);
}

.upgrade-card {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 4);
  text-align: center;
  color: var(--color-white);
}

.upgrade-card__title {
  font-weight: var(--font-weight-bold);
  font-size: var(--text-sm);
  margin-bottom: calc(var(--spacing) * 2);
}

.upgrade-card__description {
  font-size: var(--text-sm);
  margin-bottom: calc(var(--spacing) * 3);
  opacity: 0.9;
}

.upgrade-card__button {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: none;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--default-transition-duration)
    var(--default-transition-timing-function);
}

.upgrade-card__button:hover {
  background-color: var(--color-gray-100);
  transform: translateY(-1px);
}

.dashboard__sidebar--collapsed .upgrade-card__title,
.dashboard__sidebar--collapsed .upgrade-card__description,
.dashboard__sidebar--collapsed .upgrade-card__button {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.dashboard__sidebar-close {
  display: none;
  position: absolute;
  top: calc(var(--spacing) * 4);
  right: calc(var(--spacing) * 4);
  width: 32px;
  height: 32px;
  background-color: var(--color-slate-700);
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-white);
  cursor: pointer;
}

.header-bar__logo-tablet {
  display: none; 
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.header-bar__logo-tablet-img {
  width: 98px; 
  height: 28px;   
  object-fit: contain;
}

.header-bar__logo-tablet-text {
  color: var(--color-slate-900);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-2xl);
}


.nav-link i:not(.dropdown-arrow) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 17px;
  padding: 4px;
  border-radius: 8px;
  background-color: #fafafa1a;
  color: #ffffff80;
  margin-right: 7px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

@media (max-width: 999px) {
  .header-bar {
    padding: calc(1.5rem);
    box-shadow: var(--tw-shadow);
  }

  .header-bar__left {
    gap: 10px; 
  }

  .header-bar__logo-tablet {
    display: flex;
  }

  .header-bar__search {
    width: 200px; 
  }

  .dashboard__sidebar {
    top: 70px; 
    height: calc(100vh - 70px); 
  }

  .dashboard__sidebar--expanded {
    width: 300px; 
  }

  .dashboard__header {
    width: 100vw; 
    left: 0;
    right: 0;
    position: fixed; 
    z-index: 1000;
  }

  .dashboard__sidebar--expanded + .dashboard__main {
    margin-left: 300px; 
    width: calc(100vw - 300px); 
  }
  
  .dashboard__main {
    width: 100vw;
    margin-left: 0;
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0;
    width: 100vw;
  }

  .page-wrapper .sidebar-wrapper .sidebar-brand {
    display: none !important; 
  }
}

@media (min-width: 1000px) {
  .dashboard__sidebar {
    height: 100vh;
    top: 0;
  }
  
  .dashboard__sidebar--expanded {
    height: 100vh;
  }
  
  .page-wrapper {
    height: 100vh;
  }
  
  .page-wrapper .sidebar-wrapper {
    height: 100vh;
  }
  
  .dashboard__sidebar-nav {
    flex: 1;
    min-height: 0;
  }
  
  .dashboard__header {
    position: fixed;
    top: 0;
    left: 300px;
    right: 0;
    z-index: 1000;
    width: calc(100% - 300px);
    box-shadow: none !important;
    transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
  }
  
  .header-bar {
    transition: all 0.5s ease-in-out;
  }
  
  .dashboard__main {
    padding-top: 70px;
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main .dashboard__header {
    left: 0;
    width: 100%;
    transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0;
    width: 100%;
  }
}


@media (max-width: 768px) {
  body {
    min-height: 100vh;
    overflow-x: hidden; 
  }
  
  .dashboard {
    min-height: auto;
    height: auto; 
    overflow: visible; 
  }
  
  .dashboard__sidebar {
    top: 70px; 
    height: calc(100vh - 70px);  
    transform: translateX(-100%);
  }

  .dashboard__sidebar--expanded {
    transform: translateX(0);
    width: 260px; 
    height: calc(100vh - 70px); 
  }
  
  .dashboard__sidebar--expanded + .dashboard__main {
    margin-left: 260px; 
    width: calc(100vw - 260px); 
  }
  
  .dashboard__main {
    min-height: auto;
    height: auto;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .dashboard__sidebar--collapsed + .dashboard__main {
    margin-left: 0;
    width: 100vw;
  }
}

@media (max-width: 720px) {
  .header-bar__logo-tablet-img {
    content: url("/images/Hously3.png");
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 640px) {
  .header-bar__search {
    display: none !important;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", "Helvetica Neue", sans-serif;
  background-color: var(--color-slate-50);
  color: var(--color-slate-900);
}

.nav-link.active .nav-link__text {
  color: #ffffff; 
  font-weight: 600; 
}
</style>
