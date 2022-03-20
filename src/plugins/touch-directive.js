import Hammer from 'hammerjs'
import getCompositeSymbol from 'composite-symbol'

function wrapListener(listener, modifiers) {
  return event => {
    if (modifiers.prevent) {
      event.preventDefault()
    }

    if (modifiers.stop) {
      event.stopPropagation()
    }

    return listener(event)
  }
}

/**
 * @param {import('vue').App} app
 */
export default app => {
  let listeners = {}
  let hammers = {}

  let globalHammer

  app.directive('touch', {
    mounted(el, { arg, modifiers, value }) {
      if (!globalHammer) {
        globalHammer = new Hammer(document)
      }

      let elementRef = getCompositeSymbol(el)
      let hammer = new Hammer(el)
      hammers[elementRef] = hammer

      if (typeof value === 'function') {
        let symbol = getCompositeSymbol(el, arg)

        listeners[symbol] = wrapListener(value, modifiers)

        if (modifiers.global) {
          globalHammer.on(arg, listeners[symbol])
        } else {
          hammer.on(arg, listeners[symbol])
        }
      }
    },
    updated(el, { arg, modifiers, value, oldValue }) {
      if (value !== oldValue) {
        let eventRef = getCompositeSymbol(el, arg)
        let elementRef = getCompositeSymbol(el)

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
    unmounted(el, { arg, modifiers }) {
      let elementRef = getCompositeSymbol(el)
      let eventRef = getCompositeSymbol(el, arg)

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
}
