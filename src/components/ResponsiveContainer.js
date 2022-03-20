import { h } from 'vue'
import { throttle } from 'lodash-es'

export default {
  props: {
    defaultBreakpoint: {
      type: String,
      required: true
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    },
    strategy: {
      type: String,
      default: 'mobile-first'
    },
    throttle: {
      type: Number,
      default: 200
    },
    tag: {
      type: [String, Object, null],
      default: 'div'
    }
  },
  data: vm => ({
    width: 0,
    observer: vm.$isServer
      ? null
      : new ResizeObserver(
          throttle(entries => {
            vm.width = entries[0].contentRect.width
          }, vm.throttle)
        )
  }),
  computed: {
    isMobileFirst: vm => vm.strategy === 'mobile-first',
    api() {
      return {
        is: {
          exactly: this.exactly,
          largerThan: this.gt,
          smallerThan: this.lt,
          atLeast: this.gte,
          atMost: this.lte
        },
        breakpoint: this.currentBreakpoint,
        defaultBreakpoint: this.defaultBreakpoint,
        breakpoints: this.breakpoints,
        strategy: this.strategy,
        larger: this.largerBreakpoints,
        smaller: this.smallerBreakpoints,
        width: this.width
      }
    },
    // The provided breakpoints object as iterable breakpoints array
    // e.g. { a: 100, b: 200, c: 300 } => [{ name: 'a', width: 100 }, { name: 'b', width: 200 }, { name: 'c', width: 300 }]
    iterableBreakpoints() {
      return Object.entries(this.breakpoints).map(([name, width]) => ({
        name,
        width
      }))
    },
    iterableBreakpointsWithDefault() {
      if (this.isMobileFirst) {
        return [
          {
            name: this.defaultBreakpoint
          },
          ...this.iterableBreakpoints
        ]
      } else {
        return [
          ...this.iterableBreakpoints,
          {
            name: this.defaultBreakpoint
          }
        ]
      }
    },
    // The iterable breakpoints array, sorted by size
    sizeSortedBreakpoints() {
      return this.iterableBreakpoints
        .slice(0)
        .sort(({ width: aWidth }, { width: bWidth }) => aWidth - bWidth)
    },
    // The iterable breakpoints array, sorted by size depending on the strategy (ascending for desktop-first, descending for mobile-first)
    strategicSizeSortedBreakpoints() {
      return this.isMobileFirst
        ? this.sizeSortedBreakpoints.slice(0).reverse()
        : this.sizeSortedBreakpoints.slice(0)
    },
    currentBreakpoint() {
      for (const { name, width } of this.strategicSizeSortedBreakpoints) {
        if (this.isMobileFirst) {
          if (this.width >= width) return name
        } else {
          if (this.width <= width) return name
        }
      }

      return this.defaultBreakpoint
    },
    // Names of breakpoints smaller than the current breakpoint
    smallerBreakpoints() {
      if (this.currentBreakpoint === this.defaultBreakpoint) {
        if (this.isMobileFirst) {
          return []
        } else {
          return this.sizeSortedBreakpoints.map(({ name }) => name)
        }
      }

      const defaultBreakpointContainer = []
      if (this.isMobileFirst) {
        defaultBreakpointContainer.push(this.defaultBreakpoint)
      }

      return defaultBreakpointContainer.concat(
        this.sizeSortedBreakpoints
          .slice(
            0,
            this.sizeSortedBreakpoints.findIndex(
              ({ name }) => name === this.currentBreakpoint
            )
          )
          .map(({ name }) => name)
      )
    },
    // Names of breakpoints larger than the current breakpoint
    largerBreakpoints() {
      if (this.currentBreakpoint === this.defaultBreakpoint) {
        if (this.isMobileFirst) {
          return this.sizeSortedBreakpoints.map(({ name }) => name)
        } else {
          return []
        }
      }

      const defaultBreakpointContainer = []
      if (!this.isMobileFirst) {
        defaultBreakpointContainer.push(this.defaultBreakpoint)
      }

      return this.sizeSortedBreakpoints
        .slice(
          this.sizeSortedBreakpoints.findIndex(
            ({ name }) => name === this.currentBreakpoint
          ) + 1
        )
        .map(({ name }) => name)
        .concat(defaultBreakpointContainer)
    },
    exactly() {
      return this.iterableBreakpointsWithDefault.reduce(
        (carry, { name }) => ({
          ...carry,
          [name]: name === this.currentBreakpoint
        }),
        {}
      )
    },
    gt() {
      return this.iterableBreakpointsWithDefault.reduce(
        (carry, { name }) => ({
          ...carry,
          [name]: this.smallerBreakpoints.includes(name)
        }),
        {}
      )
    },
    gte() {
      return {
        ...this.gt,
        [this.currentBreakpoint]: true
      }
    },
    lt() {
      return this.iterableBreakpointsWithDefault.reduce(
        (carry, { name }) => ({
          ...carry,
          [name]: this.largerBreakpoints.includes(name)
        }),
        {}
      )
    },
    lte() {
      return {
        ...this.lt,
        [this.currentBreakpoint]: true
      }
    }
  },
  render() {
    const slot = this.$slots.default(this.api)
    if (this.tag === null) {
      return slot
    } else {
      return h(this.tag, [slot])
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$el instanceof Element) {
        this.observer.observe(this.$el)
      }
    })
  },
  destroyed() {
    this.observer.disconnect()
  }
}
