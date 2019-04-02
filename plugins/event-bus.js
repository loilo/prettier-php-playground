import Vue from 'vue'

/**
 * Event emitter using .on(), .once(), .off() and .emit()
 */
class EventEmitter {
  /**
   * Attach a new EventEmitter to an object,
   * giving them an "on", "once" and "off" method
   * @param  {Object} target  Any object to attach the emitter to
   * @return {Function}       The `emit` method of the created EventEmitter
   */
  static attachTo(target) {
    const instance = new this()
    instance.attachTo.call(instance, target)
    return instance.emit
  }

  /**
   * Create a new EventEmitter
   */
  constructor() {
    this.listeners = []

    this.original = null
    this.passHandled = null

    // Bind the methods
    this.on = this.on.bind(this)
    this.once = this.once.bind(this)
    this.off = this.off.bind(this)
    this.emit = this.emit.bind(this)
  }

  /**
   * Matches a bunch of event name descriptors against an actual event name
   * @param  {String|RegExp|Function} matcher    The event name descriptor to match
   * @param  {String}                 eventName  The actual event name
   * @return {Boolean}                If matcher and event name to match
   */
  matchEventName(matcher, eventName) {
    if (typeof matcher === 'function') {
      return matcher(eventName)
    } else if (matcher instanceof RegExp) {
      return !eventName.startsWith('--') && matcher.test(eventName)
    } else {
      return matcher
        .split(' ')
        .filter(name => !!name.length)
        .includes(eventName)
    }
  }

  /**
   * Create an EventEmitter object that acts as proxy for this emitter. It has its own listeners and passes emitted events to this emitter.
   * @param  {Boolean} passHandled  If events handled by the proxy should be passed to the original emitter
   * @return {EventEmitter}  The proxy emitter
   */
  proxy(passHandled = false) {
    const instance = new EventEmitter()
    instance.passHandled = passHandled
    instance.original = this
    return instance
  }

  /**
   * Attach the EventEmitter instance to a target object,
   * giving them an "on", "once" and "off" method
   * @param  {Object} target  Any object to attach the emitter to
   */
  attachTo(target) {
    target.on = this.on
    target.once = this.once
    target.off = this.off
  }

  /**
   * Get all non-meta event listener objects
   * @return {Object[]} The event listener objects
   */
  get eventListeners() {
    return this.listeners.filter(listener => !listener.meta)
  }

  /**
   * Attaches a new listener for the given event
   * @param  {String|RegExp|Function}   event     The event to listen for. Multiple may be separated by spaces.
   * @param  {Function}                 listener  A callback to run when the event is emitted
   * @return {EventEmitter}             The EventEmitter instance
   */
  on(event, listener) {
    const results = this.emit('--will-attach-raw', event, listener)
    if (results.includes(false)) return this
    ;(typeof event === 'string' ? event.split(' ') : [event]).forEach(event => {
      const metaListener = typeof event === 'string' && event.startsWith('--')

      const listenerData = {
        event,
        callback: listener,
        once: false,
        meta: metaListener
      }

      const first = this.eventListeners.length === 0

      if (!listenerData.meta) {
        const results = this.emit('--will-attach', listenerData)
        if (results.includes(false)) return
      }
      this.listeners.push(listenerData)
      if (!listenerData.meta) this.emit('--attached', listenerData)
      if (first && !listenerData.meta) this.emit('--attached-first')
    })

    return this
  }

  /**
   * Attaches a new one-time listener for the given event.
   * Auto-detaches after usage.
   * @param  {String|RegExp|Function}   event     The event(s) to listen for. Multiple may be separated by spaces.
   * @param  {Function}                 listener  A callback to run when the event is emitted
   * @return {EventEmitter}             The EventEmitter instance
   */
  once(event, listener) {
    const results = this.emit('--will-attach-once-raw', event, listener)
    if (results.includes(false)) return this
    ;(typeof event === 'string' ? event.split(' ') : [event]).forEach(event => {
      const metaListener = typeof event === 'string' && event.startsWith('--')

      const listenerData = {
        event,
        callback: listener,
        once: true,
        meta: metaListener
      }

      const first = this.eventListeners.length === 0

      if (!listenerData.meta) {
        const results = this.emit('--will-attach', listenerData)
        if (results.includes(false)) return
      }
      this.listeners.push(listenerData)
      if (!listenerData.meta) this.emit('--attached', listenerData)
      if (first && !listenerData.meta) this.emit('--attached-first')
    })
    return this
  }

  /**
   * Removes listeners for the given event
   * @param  {String|RegExp|Function}   event     The event to remove listeners from
   * @param  {Function}                 callback  The listener to remove. If this is omitted, all listeners for the given event are removed.
   * @return {EventEmitter}             The EventEmitter instance
   */
  off(event, callback) {
    const results = this.emit('--will-detach-raw', event, callback)
    if (results.includes(false)) return this
    ;(typeof event === 'string' ? event.split(' ') : [event]).forEach(event => {
      const detached = []
      this.listeners = this.listeners.filter(listener => {
        let keep
        if (typeof event === 'string') {
          keep = !(
            event.includes(listener.event) &&
            (callback == null || listener.callback === callback)
          )
        } else if (event instanceof RegExp) {
          keep = !listener.event.match(event)
        } else {
          keep = listener.event !== event
        }

        if (!keep) {
          if (!listener.meta) {
            const results = this.emit('--will-detach', listener)
            if (results.includes(false)) {
              keep = true
            } else {
              detached.push(listener)
            }
          }
        }

        return keep
      })

      detached.forEach(listener => {
        this.emit('--detached', listener)
      })

      if (!this.eventListeners.length && detached.length)
        this.emit('--detached-last')
    })

    return this
  }

  hasListenersFor(event) {
    return this.listeners
      .map(listener => ({
        listener,
        stringEvent: typeof listener.event === 'string'
      }))
      .some(meta => this.matchEventName(meta.listener.event, event))
  }

  /**
   * Emits an event
   * @param  {string}    event  The name of the event to be emitted
   * @param  {...mixed}  params An arbitrary number of parameters to pass to the listeners
   * @return {mixed[]}   An array with the return values of the executed listeners ("undefined" exluded)
   */
  emit(event, ...params) {
    const applicableListeners = this.listeners
      .map(listener => ({
        listener,
        stringEvent: typeof listener.event === 'string'
      }))
      .filter(meta => this.matchEventName(meta.listener.event, event))

    return applicableListeners
      .map(({ stringEvent, listener }) => {
        const result = stringEvent
          ? listener.callback(...params)
          : listener.callback(event, ...params)

        if (listener.once) {
          if (!listener.meta) {
            const results = this.emit('--will-detach', listener)
            if (results.includes(false)) return
          }

          this.listeners = this.listeners.filter(
            current => current !== listener
          )

          if (!this.eventListeners.length && !listener.meta)
            this.emit('--detached-last')
          if (!listener.meta) this.emit('--detached', listener)
        }
        return result
      })
      .concat(
        this.original && (!applicableListeners.length || this.passHandled)
          ? this.original.emit(event, ...params)
          : []
      )
      .filter(result => typeof result !== 'undefined')
  }
}

const BusPlugin = {
  install(Vue) {
    const bus = new EventEmitter()

    // Add the global bus to the `Vue` constructor
    Vue.bus = bus

    Vue.mixin({
      beforeCreate() {
        if (!('computed' in this.$options)) {
          this.$options.computed = Object.create(null)
        }

        // Add $bus to each component
        this.$options.computed.$bus = () => bus

        // Handle declarative `bus` listeners
        if ('bus' in this.$options) {
          const busListeners = this.$options.bus

          this.$$busListeners = Object.entries(busListeners).map(
            ([event, listener]) => {
              let normalizedListener = { event, once: false }
              switch (typeof listener) {
                case 'string':
                  normalizedListener.handler = this[listener]
                  break

                case 'function':
                  normalizedListener.handler = listener
                  break

                case 'object':
                  normalizedListener.handler =
                    typeof listener.handler === 'string'
                      ? this[listener.handler]
                      : listener.handler
                  normalizedListener.once = listener.once || false
                  break

                default:
                  throw new Error('Invalid bus listener configuration')
              }

              normalizedListener.handler = normalizedListener.handler.bind(this)

              return normalizedListener
            }
          )
        } else {
          this.$$busListeners = []
        }
      },

      // Attach declarative bus listeners
      created() {
        for (const { event, handler, once } of this.$$busListeners) {
          const method = once ? 'once' : 'on'
          this.$bus[method](event, handler)
        }
      },

      // Detach declarative bus listeners
      destroyed() {
        for (const { event, handler } of this.$$busListeners) {
          this.$bus.off(event, handler)
        }
      }
    })
  }
}

Vue.use(BusPlugin)
