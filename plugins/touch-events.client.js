import Vue from 'vue'
import Hammer from 'hammerjs'
import getCompositeSymbol from 'composite-symbol'

const listeners = {}
const hammers = {}

function wrapListener(listener, modifiers) {
  return evt => {
    if (modifiers.prevent) {
      evt.preventDefault()
    }

    if (modifiers.stop) {
      evt.stopPropagation()
    }

    return listener(evt)
  }
}

let globalHammer

Vue.directive('touch', {
  bind(el, { arg, modifiers, value }) {
    if (!globalHammer) {
      globalHammer = new Hammer(document)
    }

    const elementRef = getCompositeSymbol(el)
    const hammer = new Hammer(el)
    hammers[elementRef] = hammer

    if (typeof value === 'function') {
      const symbol = getCompositeSymbol(el, arg)

      listeners[symbol] = wrapListener(value, modifiers)

      if (modifiers.global) {
        globalHammer.on(arg, listeners[symbol])
      } else {
        hammer.on(arg, listeners[symbol])
      }
    }
  },
  update(el, { arg, modifiers, value, oldValue }) {
    if (value !== oldValue) {
      const eventRef = getCompositeSymbol(el, arg)
      const elementRef = getCompositeSymbol(el)

      if (eventRef in listeners) {
        if (modifiers.global) {
          globalHammer.off(arg, listeners[eventRef])
        } else {
          hammers[elementRef].off(arg, listeners[eventRef])
        }

        el.removeEventListener(listeners[eventRef])
      }

      if (typeof value === 'function') {
        listeners[eventRef] = wrapListener(value, modifiers)

        if (modifiers.global) {
          globalHammer.on(arg, listeners[symbol])
        } else {
          hammers[elementRef].on(arg, listeners[symbol])
        }
      }
    }
  },
  unbind(el, { arg, modifiers }) {
    const elementRef = getCompositeSymbol(el)
    const eventRef = getCompositeSymbol(el, arg)

    if (eventRef in listeners) {
      if (modifiers.global) {
        globalHammer.off(arg, listeners[eventRef])
      } else {
        hammers[elementRef].off(arg, listeners[eventRef])
      }

      delete listeners[eventRef]
    }

    hammers[elementRef].destroy()
    delete hammers[elementRef]
  }
})
