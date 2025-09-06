<template>
  <div class="area-map-card card">
    <div class="area-map-header card-header">
      <h3>Area Map</h3>
      <span class="last-update-text">Last update 5 days ago</span>
    </div>

    <div class="area-map-container">
      <div class="map-wrapper" @mouseleave="hideTooltip">
        <div ref="mapContainer"></div>
        
        <div 
          ref="customTooltip"
          v-show="tooltipVisible"
          class="custom-tooltip"
          :style="tooltipStyle"
        >
          {{ tooltipContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'

const mapRef = ref()
const mapContainer = ref()
const customTooltip = ref()
const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipStyle = ref<{left: string, top: string, zIndex?: string}>({
  left: '0px',
  top: '0px'
})

const markers = computed(() => [
  { name: 'Canada', coords: [56.1304, -106.3468], active: true },
  { name: 'Greenland', coords: [71.7069, -42.6043], active: true },
  { name: 'Russia', coords: [61, 105], active: false },
  { name: 'Palestine', coords: [31.9522, 35.2332], active: false }
])


const mapOptions = {
  map: 'world_merc',
  backgroundColor: '#ffffff',
  regionStyle: { 
    initial: { 
      fill: '#e5e7eb',
      stroke: '#ffffff',
      strokeWidth: 1
    },
    hover: {
      fill: '#d1d5db',
      fillOpacity: 1,
      cursor: 'pointer'
    }
  },
  markers: [
    { name: 'Canada', coords: [56.1304, -106.3468] },
    { name: 'Greenland', coords: [71.7069, -42.6043] },
    { name: 'Russia', coords: [61, 105] },
    { name: 'Palestine', coords: [31.9522, 35.2332] }
  ],
  markerStyle: {
    initial: { 
      fill: '#10b981',
      stroke: '#ffffff',
      strokeWidth: 5,
      strokeOpacity: 0.5,
      r: 7
    },
    hover: {
      fill: '#06b6d4',
      strokeWidth: 5,
      strokeOpacity: 0.8
    },
    selected: {
      fill: '#10b981',
      strokeWidth: 5,
      strokeOpacity: 1
    }
  },
  showTooltip: true,
  zoomButtons: false,
  zoomOnScroll: false
}

const updateAllMarkers = () => {
  if (!mapRef.value) {
    return
  }
  
  markers.value.forEach((_, index) => {
    let fillColor, strokeOpacity
    
    if (index === 0 || index === 1) { 
      fillColor = '#10b981' 
      strokeOpacity = 0.5
    } else { 
      fillColor = '#9ca3af' 
      strokeOpacity = 0.3
    }
    
    try {
      if (mapRef.value.markers && mapRef.value.markers[index]) {
        const markerElement = mapRef.value.markers[index].element
        if (markerElement && markerElement.node) {
          const circle = markerElement.node.querySelector('circle')
          if (circle) {
            circle.setAttribute('fill', fillColor)
            circle.setAttribute('stroke-opacity', strokeOpacity.toString())
            circle.setAttribute('stroke-width', '5')
            circle.setAttribute('r', '7')
          }
        }
      }
    } catch (error) {
    }
  })
}

const computeMapSize = () => {
  const w = window.innerWidth
  if (w <= 480) {
    return { w: 290, h: 195 }
  }
  if (w <= 768) {
    return { w: 320, h: 220 }
  }
  return { w: 340, h: 240 }
}

const applyMapSize = () => {
  const sizes = computeMapSize()
  const container = mapContainer.value?.querySelector('.jvm-container') as HTMLElement | null
  const svg = mapContainer.value?.querySelector('svg') as SVGElement | null
  if (container) {
    container.style.width = `${sizes.w}px`
    container.style.height = `${sizes.h}px`
    container.style.overflow = 'hidden'
    container.style.margin = '0 auto'
  }
  if (svg) {
    svg.setAttribute('width', `${sizes.w}`)
    svg.setAttribute('height', `${sizes.h}`)
    svg.setAttribute('viewBox', `0 0 ${sizes.w} ${sizes.h}`)
    ;(svg as any).style.width = `${sizes.w}px`
    ;(svg as any).style.height = `${sizes.h}px`
  }
}

const handleRegionOver = (event: any, code: string) => {
  const countryName = getCountryName(code)
  showTooltip(event, countryName)
}

const handleRegionOut = () => {
  hideTooltip()
}

const showTooltip = (event: any, content: string) => {
  tooltipContent.value = content
  tooltipVisible.value = true
  
  if (event && mapContainer.value) {
    const rect = mapContainer.value.getBoundingClientRect()
    
    let x = 0, y = 0
    
    if (event.offsetX !== undefined && event.offsetY !== undefined) {
      x = event.offsetX
      y = event.offsetY
    } else if (event.layerX !== undefined && event.layerY !== undefined) {
      x = event.layerX
      y = event.layerY
    } else {
      x = (event.clientX || event.pageX || 0) - rect.left
      y = (event.clientY || event.pageY || 0) - rect.top
    }
    
    tooltipStyle.value = {
      left: `${x + 10}px`,
      top: `${y - 30}px`
    }
  }
}

const hideTooltip = () => {
  tooltipVisible.value = false
}

const getCountryName = (code: string): string => {
  const countryNames: { [key: string]: string } = {
    'AD': 'Andorra', 'AE': 'United Arab Emirates', 'AF': 'Afghanistan', 'AG': 'Antigua and Barbuda',
    'AI': 'Anguilla', 'AL': 'Albania', 'AM': 'Armenia', 'AO': 'Angola', 'AQ': 'Antarctica',
    'AR': 'Argentina', 'AS': 'American Samoa', 'AT': 'Austria', 'AU': 'Australia', 'AW': 'Aruba',
    'AX': 'Åland Islands', 'AZ': 'Azerbaijan', 'BA': 'Bosnia and Herzegovina', 'BB': 'Barbados',
    'BD': 'Bangladesh', 'BE': 'Belgium', 'BF': 'Burkina Faso', 'BG': 'Bulgaria', 'BH': 'Bahrain',
    'BI': 'Burundi', 'BJ': 'Benin', 'BL': 'Saint Barthélemy', 'BM': 'Bermuda', 'BN': 'Brunei',
    'BO': 'Bolivia', 'BQ': 'Caribbean Netherlands', 'BR': 'Brazil', 'BS': 'Bahamas', 'BT': 'Bhutan',
    'BV': 'Bouvet Island', 'BW': 'Botswana', 'BY': 'Belarus', 'BZ': 'Belize', 'CA': 'Canada',
    'CC': 'Cocos Islands', 'CD': 'Democratic Republic of the Congo', 'CF': 'Central African Republic',
    'CG': 'Republic of the Congo', 'CH': 'Switzerland', 'CI': 'Côte d\'Ivoire', 'CK': 'Cook Islands',
    'CL': 'Chile', 'CM': 'Cameroon', 'CN': 'China', 'CO': 'Colombia', 'CR': 'Costa Rica',
    'CU': 'Cuba', 'CV': 'Cape Verde', 'CW': 'Curaçao', 'CX': 'Christmas Island', 'CY': 'Cyprus',
    'CZ': 'Czech Republic', 'DE': 'Germany', 'DJ': 'Djibouti', 'DK': 'Denmark', 'DM': 'Dominica',
    'DO': 'Dominican Republic', 'DZ': 'Algeria', 'EC': 'Ecuador', 'EE': 'Estonia', 'EG': 'Egypt',
    'EH': 'Western Sahara', 'ER': 'Eritrea', 'ES': 'Spain', 'ET': 'Ethiopia', 'FI': 'Finland',
    'FJ': 'Fiji', 'FK': 'Falkland Islands', 'FM': 'Micronesia', 'FO': 'Faroe Islands', 'FR': 'France',
    'GA': 'Gabon', 'GB': 'United Kingdom', 'GD': 'Grenada', 'GE': 'Georgia', 'GF': 'French Guiana',
    'GG': 'Guernsey', 'GH': 'Ghana', 'GI': 'Gibraltar', 'GL': 'Greenland', 'GM': 'Gambia',
    'GN': 'Guinea', 'GP': 'Guadeloupe', 'GQ': 'Equatorial Guinea', 'GR': 'Greece', 'GS': 'South Georgia',
    'GT': 'Guatemala', 'GU': 'Guam', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HK': 'Hong Kong',
    'HM': 'Heard Island', 'HN': 'Honduras', 'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary',
    'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel', 'IM': 'Isle of Man', 'IN': 'India',
    'IO': 'British Indian Ocean Territory', 'IQ': 'Iraq', 'IR': 'Iran', 'IS': 'Iceland', 'IT': 'Italy',
    'JE': 'Jersey', 'JM': 'Jamaica', 'JO': 'Jordan', 'JP': 'Japan', 'KE': 'Kenya', 'KG': 'Kyrgyzstan',
    'KH': 'Cambodia', 'KI': 'Kiribati', 'KM': 'Comoros', 'KN': 'Saint Kitts and Nevis', 'KP': 'North Korea',
    'KR': 'South Korea', 'KW': 'Kuwait', 'KY': 'Cayman Islands', 'KZ': 'Kazakhstan', 'LA': 'Laos',
    'LB': 'Lebanon', 'LC': 'Saint Lucia', 'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia',
    'LS': 'Lesotho', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'LV': 'Latvia', 'LY': 'Libya',
    'MA': 'Morocco', 'MC': 'Monaco', 'MD': 'Moldova', 'ME': 'Montenegro', 'MF': 'Saint Martin',
    'MG': 'Madagascar', 'MH': 'Marshall Islands', 'MK': 'North Macedonia', 'ML': 'Mali', 'MM': 'Myanmar',
    'MN': 'Mongolia', 'MO': 'Macao', 'MP': 'Northern Mariana Islands', 'MQ': 'Martinique', 'MR': 'Mauritania',
    'MS': 'Montserrat', 'MT': 'Malta', 'MU': 'Mauritius', 'MV': 'Maldives', 'MW': 'Malawi',
    'MX': 'Mexico', 'MY': 'Malaysia', 'MZ': 'Mozambique', 'NA': 'Namibia', 'NC': 'New Caledonia',
    'NE': 'Niger', 'NF': 'Norfolk Island', 'NG': 'Nigeria', 'NI': 'Nicaragua', 'NL': 'Netherlands',
    'NO': 'Norway', 'NP': 'Nepal', 'NR': 'Nauru', 'NU': 'Niue', 'NZ': 'New Zealand',
    'OM': 'Oman', 'PA': 'Panama', 'PE': 'Peru', 'PF': 'French Polynesia', 'PG': 'Papua New Guinea',
    'PH': 'Philippines', 'PK': 'Pakistan', 'PL': 'Poland', 'PM': 'Saint Pierre and Miquelon',
    'PN': 'Pitcairn', 'PR': 'Puerto Rico', 'PS': 'Palestine', 'PT': 'Portugal', 'PW': 'Palau',
    'PY': 'Paraguay', 'QA': 'Qatar', 'RE': 'Réunion', 'RO': 'Romania', 'RS': 'Serbia',
    'RU': 'Russia', 'RW': 'Rwanda', 'SA': 'Saudi Arabia', 'SB': 'Solomon Islands', 'SC': 'Seychelles',
    'SD': 'Sudan', 'SE': 'Sweden', 'SG': 'Singapore', 'SH': 'Saint Helena', 'SI': 'Slovenia',
    'SJ': 'Svalbard and Jan Mayen', 'SK': 'Slovakia', 'SL': 'Sierra Leone', 'SM': 'San Marino',
    'SN': 'Senegal', 'SO': 'Somalia', 'SR': 'Suriname', 'SS': 'South Sudan', 'ST': 'São Tomé and Príncipe',
    'SV': 'El Salvador', 'SX': 'Sint Maarten', 'SY': 'Syria', 'SZ': 'Eswatini', 'TC': 'Turks and Caicos',
    'TD': 'Chad', 'TF': 'French Southern Territories', 'TG': 'Togo', 'TH': 'Thailand', 'TJ': 'Tajikistan',
    'TK': 'Tokelau', 'TL': 'East Timor', 'TM': 'Turkmenistan', 'TN': 'Tunisia', 'TO': 'Tonga',
    'TR': 'Turkey', 'TT': 'Trinidad and Tobago', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TZ': 'Tanzania',
    'UA': 'Ukraine', 'UG': 'Uganda', 'UM': 'US Minor Outlying Islands', 'US': 'United States',
    'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VA': 'Vatican City', 'VC': 'Saint Vincent and the Grenadines',
    'VE': 'Venezuela', 'VG': 'British Virgin Islands', 'VI': 'US Virgin Islands', 'VN': 'Vietnam',
    'VU': 'Vanuatu', 'WF': 'Wallis and Futuna', 'WS': 'Samoa', 'YE': 'Yemen', 'YT': 'Mayotte',
    'ZA': 'South Africa', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
  }
  
  return countryNames[code] || code
}

onMounted(async () => {
  await nextTick()
  
  if (mapContainer.value) {
    try {
      new (window as any).jsVectorMap({
        selector: mapContainer.value,
        ...mapOptions,
        onLoaded: (map: any) => {
          mapRef.value = map
          
          setTimeout(() => {
            applyMapSize()
            updateAllMarkers()
          }, 200)
        },
        onRegionTooltipShow: (event: any, tooltip: any, code: string) => {
          if (tooltip && tooltip.hide) {
            tooltip.hide()
          }
          handleRegionOver(event, code)
        },
        onRegionOver: (event: any, code: string) => {
          handleRegionOver(event, code)
        },
        onRegionOut: (_event: any) => {
          handleRegionOut()
        }
      })
    } catch (error) {
    }
  }
})

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    applyMapSize()
  })
}
</script>

<style scoped>

@media (max-width: 768px) {
  .area-map-card {
    height: 340px;
    min-width: 280px;
  }
}

@media (max-width: 480px) {
  .area-map-card {
    height: 300px;
    min-width: 250px;
  }
}


@media (max-width: 768px) {
  .area-map-header {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .area-map-header {
    padding: 12px 16px;
  }
}

.area-map-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.area-map-actions {
  display: flex;
  align-items: center;
}

.last-update-text {
  font-size: 17px;
  color: oklch(0.704 0.04 256.788);
  font-weight: 400;
}

.area-map-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 0 24px;
  margin-top:40px;
  margin-bottom: 40px;
  overflow: hidden;
  min-height: 0;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .area-map-container {
    padding: 0 20px 0 20px;
  }
}

@media (max-width: 480px) {
  .area-map-container {
    padding: 12px 16px;
  }
}

.map-wrapper {
  width: 100%;
  height: 100%;
  min-height: 250px;
  border-radius: 8px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .map-wrapper {
    min-height: 260px;
  }
}

@media (max-width: 480px) {
  .map-wrapper {
    min-height: 220px;
  }
}


.custom-tooltip {
  position: absolute;
  background-color: #3b82f6;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001 !important;
  pointer-events: none;
  white-space: nowrap;
  opacity: 1;
  display: block;
  cursor: default;
  user-select: none;
}

:deep(.jvm-container) {
  background-color: #ffffff !important;
  border-radius: 8px;
  width: 340px !important;
  height: 240px !important;
  overflow: hidden;
  margin: 0 auto; 
}

:deep(.jvm-container svg) {
  width: 340px !important;
  height: 240px !important;
}

:deep(svg) {
  width: 340px !important;
  height: 240px !important;
}

:deep(.jvm-marker) {
  cursor: pointer;
  transition: all 0.2s ease;
}

:deep(.jvm-region) {
  cursor: pointer;
  transition: fill 0.2s ease;
}

:deep(.jvm-region:hover) {
  transition: fill 0.1s ease;
}

:deep(.jvm-tooltip) {
  display: none !important;
}

@media (max-width: 999px) {
  .country-labels { display: none; }
}

@media (max-width: 768px) {
  :deep(.jvm-container) {
    width: 320px !important;
    height: 220px !important;
    margin: 0 auto; 
  }
  :deep(.jvm-container svg),
  :deep(svg) {
    width: 320px !important;
    height: 220px !important;
  }
}

@media (max-width: 480px) {
  :deep(.jvm-container) {
    width: 290px !important;
    height: 195px !important;
    margin: 0 auto; 
  }
  :deep(.jvm-container svg),
  :deep(svg) {
    width: 290px !important;
    height: 195px !important;
  }
  .country-labels {
    display: none;
  }
}
</style>