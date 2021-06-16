<template>
  <Button
    class="icon-button"
    :class="{ 'icon-button--pressed': pressed }"
    :style="{ '--hover-color': color }"
    v-bind="$attrs"
    v-on="listeners"
    @contextmenu.native.prevent
    v-touch:press="press"
    v-touch:pressup="release"
    v-touch:panend="release"
    :title="tooltip || false"
  >
    <Tooltip v-if="tooltip" :visible="tooltipVisible">{{ tooltip }}</Tooltip>
    <slot/>
  </Button>
</template>

<script>
import Button from './Button'
import Tooltip from '../Util/Tooltip'

export default {
  components: { Button, Tooltip },
  props: {
    color: {
      type: String,
      default: '#182024'
    },
    pressed: {
      type: Boolean,
      default: false
    },
    tooltip: String,
    tooltipDuration: {
      type: Number,
      default: 500,
      validator: value => value > 0 && Number.isInteger(value)
    }
  },
  data: () => ({
    pressing: false,
    tooltipVisible: false
  }),
  computed: {
    listeners() {
      if (this.pressing) {
        return {
          click(evt) {
            evt.preventDefault()
          }
        }
      } else {
        return this.$listeners
      }
    }
  },
  watch: {
    pressing(pressing) {
      this.$bus.emit('cm-inert', pressing, this)
    }
  },
  methods: {
    press() {
      this.pressing = true

      this.showTooltip()
    },
    release() {
      // $nextTick is not sufficient here
      setTimeout(() => {
        this.pressing = false
      }, 0)

      this.hideTooltip()
    },
    showTooltip() {
      if (!this.tooltip) {
        return
      }

      clearTimeout(this.tooltipTimeoutId)
      this.tooltipVisible = true
    },
    hideTooltip() {
      if (!this.tooltip) {
        return
      }

      this.tooltipTimeoutId = setTimeout(() => {
        this.tooltipVisible = false
      }, this.tooltipDuration)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-button {
  position: relative;
  flex-grow: 1;
  margin: 0 0.5em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &--pressed {
    background-color: #e8edef;
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    color: var(--hover-color);
  }

  ::v-deep {
    & > svg {
      width: auto;
      height: 24px;
    }
  }
}
</style>
