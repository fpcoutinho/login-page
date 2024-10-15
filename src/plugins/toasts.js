import { ref } from 'vue'

const queue = ref([])

export default {
  install: (app) => {
    // Adds new toast to queue
    const enqueue = (toastData, timeout = 3200) => {
      toastData = Object.assign({ id: Date.now() }, toastData)
      queue.value.push(toastData)

      if (timeout) {
        setTimeout(() => {
          dequeue(toastData.id)
        }, timeout)
      }

      return toastData.id
    }

    // Removes toast by id from queue
    const dequeue = (id) => {
      return queue.value.splice(
        queue.value.findIndex((n) => n.id === id),
        1
      )
    }

    // Removes all toasts from queue
    const dequeueAll = () => {
      queue.value.length = 0
    }

    const toastsApi = {
      queue: queue.value,
      enqueue,
      dequeue,
      dequeueAll
    }

    // Provides Toasts API for external usage
    app.config.globalProperties.$toasts = toastsApi
    app.provide('toasts', toastsApi)
  }
}
