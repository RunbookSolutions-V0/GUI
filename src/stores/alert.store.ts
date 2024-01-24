import { defineStore } from 'pinia'
import { type ToastMessageOptions } from 'primevue/toast'

type State = {
  alerts: ToastMessageOptions[]
}

export const useAlertStore = defineStore({
  id: 'alerts',
  persist: true,
  state: (): State => ({
    alerts: []
  }),
  actions: {
    add(alert: ToastMessageOptions) {
      this.alerts.push(alert)
    }
  }
})
