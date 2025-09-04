<template>
  <div class="area-map-card">
    <div class="area-map-header">
      <h3>Area Map</h3>
      <span class="last-update-text">Last update 5 days ago</span>
    </div>

    <div class="area-map-container">
      <div class="map-wrapper" style="width: 457px; height: 284px;">
        <div ref="mapContainer" style="width: 323px; height: 226px;"></div>
        
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
import { ref, onMounted, computed, nextTick, onUnmounted, watch } from 'vue'

const mapRef = ref()
const mapContainer = ref()
const customTooltip = ref()
const selectedMarkers = ref<Set<number>>(new Set()) 
const tooltipVisible = ref(false)
const tooltipContent = ref('')
const tooltipStyle = ref<{left: string, top: string, zIndex?: string}>({
  left: '0px',
  top: '0px'
})

// Marcadores según la imagen de referencia
const markers = computed(() => [
  { name: 'Canada', coords: [56.1304, -106.3468], active: true },
  { name: 'Greenland', coords: [71.7069, -42.6043], active: true },
  { name: 'Russia', coords: [61, 105], active: false },
  { name: 'Palestine', coords: [31.9522, 35.2332], active: false }
])

const mapOptions = {
  map: 'world_merc',
  backgroundColor: '#ffffff',
  width: 323,
  height: 226,
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


watch(selectedMarkers, () => {
  nextTick(() => {
    updateAllMarkers()
  })
}, { deep: true })

const updateAllMarkers = () => {
  if (!mapRef.value) {
    console.log('Map ref not available yet')
    return
  }
  
  console.log('Updating markers, selected:', Array.from(selectedMarkers.value))
  
  markers.value.forEach((_, index) => {
    let fillColor, strokeOpacity
    
    if (index === 0 || index === 1) { 
      fillColor = '#10b981' 
      strokeOpacity = 0.5
    } else { 
      fillColor = '#9ca3af' 
      strokeOpacity = 0.3
    }
    
    console.log(`Marker ${index}: color=${fillColor}, opacity=${strokeOpacity}`)
    
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
            console.log(`Updated marker ${index}: color=${fillColor}, opacity=${strokeOpacity}`)
          }
        }
      }
    } catch (error) {
      console.error('Error updating marker:', error)
    }
  })
}

const handleRegionOver = (event: any, code: string) => {
  const countryName = getCountryName(code)
  showTooltip(event, countryName)
}

const handleRegionOut = () => {
  hideTooltip()
}



const showTooltip = (event: any, content: string) => {
  console.log('Showing tooltip:', content)
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
    console.log('Tooltip positioned at:', tooltipStyle.value)
  }
}

const hideTooltip = () => {
  console.log('Hiding tooltip')
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
          console.log('Map loaded, setting up markers')
          
          setTimeout(() => {
            const container = mapContainer.value?.querySelector('.jvm-container')
            const svg = mapContainer.value?.querySelector('svg')
            
            if (container) {
              container.style.width = '323px'
              container.style.height = '226px'
              container.style.maxWidth = '323px'
              container.style.maxHeight = '226px'
            }
            
            if (svg) {
              svg.setAttribute('width', '323')
              svg.setAttribute('height', '226')
              svg.setAttribute('viewBox', '0 0 323 226')
              svg.style.width = '323px'
              svg.style.height = '226px'
              svg.style.maxWidth = '323px'
              svg.style.maxHeight = '226px'
              console.log('SVG dimensions forced to 323x226')
            }
            updateAllMarkers()
          }, 200)
        },
        onMarkerClick: (_event: MouseEvent, index: number) => {
          console.log('Marker clicked:', index)
        },
        onMarkerTooltipShow: (event: any, _tooltip: any, index: number) => {
          const marker = markers.value[index]
          if (marker) {
            showTooltip(event, marker.name)
          }
        },
        onRegionTooltipShow: (event: any, tooltip: any, code: string) => {
          console.log('Region tooltip show:', code)
          if (tooltip && tooltip.hide) {
            tooltip.hide()
          }
          handleRegionOver(event, code)
        },
        onRegionOver: (event: any, code: string) => {
          console.log('Region over:', code)
          handleRegionOver(event, code)
        },
        onRegionOut: (_event: any, code: string) => {
          console.log('Region out:', code)
          handleRegionOut()
        }
      })
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }
})

onUnmounted(() => {
})
</script>

<style scoped>
.area-map-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  min-width: 300px;
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .area-map-card {
    height: 300px;
    min-width: 280px;
  }
}

@media (max-width: 480px) {
  .area-map-card {
    height: 250px;
    min-width: 250px;
  }
}

.area-map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
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
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

@media (max-width: 768px) {
  .area-map-container {
    padding: 16px 20px;
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
  overflow: hidden;
  position: relative;
}

@media (max-width: 768px) {
  .map-wrapper {
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .map-wrapper {
    min-height: 150px;
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
  z-index: 1000;
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
  width: 323px !important;
  height: 226px !important;
  max-width: 323px !important;
  max-height: 226px !important;
}

:deep(.jvm-container svg) {
  width: 323px !important;
  height: 226px !important;
  max-width: 323px !important;
  max-height: 226px !important;
  padding-top: 16px;
}

:deep(svg) {
  width: 323px !important;
  height: 226px !important;
  max-width: 323px !important;
  max-height: 226px !important;
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
</style>