<template>
  <div class="revenue-chart" @wheel.prevent="onWheel">
    <div v-if="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
    <apexchart
      width="100%"
      height="365"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
  
</template>
  
  <script setup lang="ts">
  import { computed, ref, watch, onMounted } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { dashboardService } from '@/services/dashboard.service'
  
  const apexchart = VueApexCharts as unknown as any;
  
  type Period = 'Yearly' | 'Monthly' | 'Weekly' | 'Today';
  
  const props = defineProps<{ selectedPeriod?: Period }>();
  
  const isLoading = ref(true)
  const fetchedPoints = ref<{ month: string; sales: number; revenue: number }[]>([
    { month: 'Jan', sales: 0, revenue: 0 },
    { month: 'Feb', sales: 100, revenue: 45 },
    { month: 'Mar', sales: 40, revenue: 10 },
    { month: 'Apr', sales: 110, revenue: 75 },
    { month: 'May', sales: 60, revenue: 35 },
    { month: 'Jun', sales: 140, revenue: 94 },
    { month: 'Jul', sales: 55, revenue: 40 },
    { month: 'Aug', sales: 130, revenue: 115 },
    { month: 'Sep', sales: 65, revenue: 30 },
    { month: 'Oct', sales: 180, revenue: 105 },
    { month: 'Nov', sales: 75, revenue: 65 },
    { month: 'Dec', sales: 115, revenue: 110 }
  ])
  
  const levelIndex = ref<number>(0); 
  const centerMonthIndex = ref<number>(7); 
  
  const periodData = computed(() => fetchedPoints.value)
  
  const load = async () => {
    try {
      isLoading.value = true
      const p = (props.selectedPeriod || 'Yearly') as Period
      const res = await dashboardService.getRevenue(p)
      fetchedPoints.value = res.points.map(pt => ({
        month: pt.label,
        sales: pt.sales,
        revenue: pt.revenue,
      }))
      levelIndex.value = 0
      centerMonthIndex.value = periodData.value.length - 1
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(load)
  watch(() => props.selectedPeriod, load)
  
  const visibleData = computed(() => {
    const data = periodData.value;
    const total = data.length;
    
    const levels = [total, 7, 4, 3];
    const idx = Math.min(levelIndex.value, levels.length - 1);
    const count = Math.min(levels[idx], total);
    
    if (levelIndex.value === 0) {
      return data;
    }
    
    const center = Math.min(centerMonthIndex.value, total - 1);
    const halfCount = Math.floor(count / 2);
    const start = Math.max(0, center - halfCount);
    const end = Math.min(total, start + count);
    
    if (end === total && start > 0) {
      const newStart = Math.max(0, total - count);
      return data.slice(newStart, total);
    }
    
    return data.slice(start, end);
  });
  
  const series = computed(() => [
    {
      name: 'No. of Sales',
      data: visibleData.value.map(d => d.sales),
      color: '#94a3b8'
    },
    {
      name: 'Revenue',
      data: visibleData.value.map(d => d.sales + d.revenue),
      color: '#16a34a'
    }
  ]);
  
  const chartOptions = computed(() => ({
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#6b7280',
      fontFamily: 'Roboto, Helvetica Neue, sans-serif'
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [2, 2],
      dashArray: [0, 5]
    },
    colors: ['#16a34a', '#94a3b8'],
    markers: {
      size: 0,
      strokeWidth: 0,
      hover: { size: 0 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 8,
      labels: { colors: '#1e293b', fontSize: '18px' },
      markers: {
        width: 12,
        height: 6,
        radius: 0,
        offsetX: -4
      },
      itemMargin: {
        horizontal: 16,
        vertical: 0
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 3
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      marker: { show: false },
      custom: function({ dataPointIndex }: { dataPointIndex: number }) {
        const data = visibleData.value[dataPointIndex];
        if (!data) return '';

        const sales = data.sales;
        const revenue = data.revenue;

        return `<div class="apexcharts-tooltip-custom">
          <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${data.month}</div>
          <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: #94a3b8"></span>
            <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
              <div class="apexcharts-tooltip-y-group">
                <span class="apexcharts-tooltip-text-y-label">No. of Sales: </span>
                <span class="apexcharts-tooltip-text-y-value">${sales}</span>
              </div>
            </div>
          </div>
          <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 2; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: #16a34a"></span>
            <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
              <div class="apexcharts-tooltip-y-group">
                <span class="apexcharts-tooltip-text-y-label">Revenue: </span>
                <span class="apexcharts-tooltip-text-y-value">${revenue}</span>
              </div>
            </div>
          </div>
        </div>`;
      }
    },
    xaxis: {
      categories: visibleData.value.map(d => d.month),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#6b7280', fontSize: '12px' } },
      tooltip: { enabled: true }
    },
    yaxis: {
      decimalsInFloat: 0,
      labels: { style: { colors: '#6b7280', fontSize: '12px' } },
      max: 300
    }
  }));
  
  const onWheel = (e: WheelEvent) => {
    const delta = Math.sign(e.deltaY);
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const chartWidth = rect.width;
    const monthWidth = chartWidth / periodData.value.length;
    const estimatedMonthIndex = Math.floor(mouseX / monthWidth);
    
    centerMonthIndex.value = Math.max(0, Math.min(estimatedMonthIndex, periodData.value.length - 1));
    
    if (delta < 0) {
      levelIndex.value = Math.min(levelIndex.value + 1, 3); 
    } else if (delta > 0) {
      levelIndex.value = Math.max(levelIndex.value - 1, 0);
    }
  };
</script>

<style scoped>
  .revenue-chart {
    width: 100%;
  }

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
  .revenue-chart { position: relative; }
  .spinner {
    width: 28px;
    height: 28px;
    border: 3px solid #e5e7eb;
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

:deep(.apexcharts-legend-marker) {
  border-radius: 0 !important;
  width: 12px !important;
  height: 6px !important;
}
</style>