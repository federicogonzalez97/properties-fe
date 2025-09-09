import axiosInstance from './axios.config'
import { API_ENDPOINTS } from '@/config/env'
import type {
  DashboardMetricsDTO,
  RevenueResponseDTO,
  SalesDistributionResponseDTO,
  RecentTransactionDTO,
  Paginated,
  TopPropertyDTO,
  Period,
} from '@/interfaces/dashboard.interface'

const DASHBOARD = API_ENDPOINTS.DASHBOARD

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetricsDTO> {
    const { data } = await axiosInstance.get<DashboardMetricsDTO>(DASHBOARD.METRICS)
    return data
  },

  async getRevenue(period: Period = 'Yearly'): Promise<RevenueResponseDTO> {
    const { data } = await axiosInstance.get<RevenueResponseDTO>(DASHBOARD.REVENUE, {
      params: { period },
    })
    return data
  },

  async getSalesDistribution(period: Period = 'Yearly'): Promise<SalesDistributionResponseDTO> {
    const { data } = await axiosInstance.get<SalesDistributionResponseDTO>(DASHBOARD.SALES_DISTRIBUTION, {
      params: { period },
    })
    return data
  },

  async getRecentTransactions(page = 1, limit = 10): Promise<Paginated<RecentTransactionDTO>> {
    const { data } = await axiosInstance.get<Paginated<RecentTransactionDTO>>(DASHBOARD.RECENT_TRANSACTIONS, {
      params: { page, limit },
    })
    return data
  },

  async getTopProperties(limit = 10): Promise<TopPropertyDTO[]> {
    const { data } = await axiosInstance.get<TopPropertyDTO[]>(DASHBOARD.TOP_PROPERTIES, {
      params: { limit },
    })
    return data
  },
}

export default dashboardService
