
export type Period = 'Yearly' | 'Monthly' | 'Weekly' | 'Today'

export interface DashboardMetricsDTO {
  revenue: number
  visitors: number
  propertiesTotal: number
  propertiesForSale: number
  propertiesForRent: number
}

export interface RevenuePointDTO {
  label: string 
  sales: number
  revenue: number
}

export interface RevenueResponseDTO {
  period: Period
  points: RevenuePointDTO[]
}

export interface SalesDistributionItemDTO {
  label: string
  value: number 
}

export interface SalesDistributionResponseDTO {
  period: Period
  items: SalesDistributionItemDTO[]
}

export type TransactionStatus = 'Paid' | 'Unpaid' | 'Pending'
export type TransactionType = 'Rent' | 'Sell'

export interface RecentTransactionDTO {
  id: number
  image: string 
  date: string 
  name: string 
  price: number 
  currency: string
  type: TransactionType
  status: TransactionStatus
}

export interface Paginated<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export type PropertyTrendStatus = 'High' | 'Medium' | 'Low'

export interface TopPropertyDTO {
  id: number
  image: string
  name: string
  location: string
  price?: number
  currency?: string
  percentage: number
  status: PropertyTrendStatus
}
