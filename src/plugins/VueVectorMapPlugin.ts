import type { App } from 'vue'
import { defineComponent, ref, onMounted, onBeforeUnmount, h } from 'vue'
// @ts-ignore
import jsvectormap from 'jsvectormap'
// @ts-ignore
import 'jsvectormap/dist/maps/world-merc'

const VueVectorMap = defineComponent({
  name: 'VueVectorMap',
  props: {
    width: {
      type: [String, Number],
      default: 500
    },
    height: {
      type: [String, Number], 
      default: 300
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['loaded', 'regionTooltipShow', 'markerClick'],
  setup(props, { emit }) {
    const mapContainer = ref<HTMLElement>()
    let map: any = null

    const createMap = () => {
      if (!mapContainer.value) return

      const mapOptions = {
        ...props.options,
        onLoaded: (mapInstance: any) => {
          map = mapInstance
          emit('loaded', mapInstance)
        },
        onRegionTooltipShow: (_event: any, tooltip: any, code: string) => {
          emit('regionTooltipShow', tooltip, code)
        },
        onMarkerClick: (event: any, index: number) => {
          emit('markerClick', event, index)
        }
      }

      map = new jsvectormap({
        selector: mapContainer.value,
        ...mapOptions
      })
    }

    onMounted(() => {
      createMap()
    })

    onBeforeUnmount(() => {
      if (map) {
        map.destroy()
      }
    })

    return () => h('div', {
      ref: mapContainer,
      style: {
        width: typeof props.width === 'number' ? `${props.width}px` : props.width,
        height: typeof props.height === 'number' ? `${props.height}px` : props.height
      }
    })
  }
})

export default {
  install(app: App, _options = {}) {
    app.component('vuevectormap', VueVectorMap)
  }
}

export { VueVectorMap }
