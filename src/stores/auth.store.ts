import { defineStore } from 'pinia'
import { type RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@/router'

import type { CurrentUser, Team } from '@/graphql'
import { useCurrentUserQuery, useLoginMutation, useRefreshTokenMutation } from '@/graphql'

import { apolloClient } from '@/graphql/apollo.client'
import { provideApolloClient } from '@vue/apollo-composable'

import { useAlertStore } from './alert.store'

type TokenInfo = {
  access_token: string
  refresh_token: string
  token_type: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  persist: true,
  state: () => ({
    user: null as CurrentUser | null,
    teams: [] as Team[],
    selectedTeam: null as string | null,
    tokenInfo: null as TokenInfo | null,
    refreshTokenTimeout: null as number | null
  }),
  getters: {
    getToken(): string | null {
      if (!this.tokenInfo) return null
      return this.tokenInfo.token_type + ' ' + this.tokenInfo.access_token
    },
    team(): string | null {
      return this.selectedTeam
    }
  },
  actions: {
    login(username: string, password: string, route: RouteLocationNormalizedLoaded | null) {
      provideApolloClient(apolloClient)
      const { mutate: login, onDone } = useLoginMutation()
      login({ input: { username, password } })
      const alertStore = useAlertStore()
      onDone((result) => {
        if (!result.data || !result.data.auth.login || !result.data.auth.login.user) {
          return
        }
        const response = result.data.auth.login
        if (!response.user) {
          alertStore.add({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Unable to get user info during Login.',
            life: 3000
          })
          console.error("We didn't recieve the user when logging in!")
          this.logout()
          return
        }
        this.user = response.user as CurrentUser
        this.teams = response.user.teams as Team[]
        this.selectedTeam = this.user.personal_team.id
        this.tokenInfo = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          token_type: response.token_type
        } as TokenInfo
        this.startRefreshTokenTimer(response.expires_in as number)
        alertStore.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Welcome Back!',
          life: 3000
        })
        router.push((route?.query.returnUrl as string) || '/')
      })
    },
    logout() {
      this.user = null
      this.tokenInfo = null
      this.refreshTokenTimeout = null
      const alertStore = useAlertStore()
      alertStore.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Logged Out. Come Back Soon!',
        life: 3000
      })
      router.push({ name: 'auth.login' })
    },
    refreshUser() {
      if (!this.tokenInfo) return
      provideApolloClient(apolloClient)
      const { onResult } = useCurrentUserQuery()
      onResult((result) => {
        if (!result.data || !result.data.user.me) return
        this.user = result.data.user.me as CurrentUser
        this.teams = result.data.user.me.teams
      })
    },
    refreshToken() {
      if (!this.tokenInfo) return
      provideApolloClient(apolloClient)
      const { mutate: refresh, onDone } = useRefreshTokenMutation()
      const alertStore = useAlertStore()
      refresh({ input: { refresh_token: this.tokenInfo.refresh_token } })
      onDone((result) => {
        if (!result.data || !result.data.auth.refreshToken) return
        alertStore.add({
          severity: 'info',
          summary: 'Information Message',
          detail: 'Successfully Refreshed Access Token',
          life: 3000
        })
        const response = result.data.auth.refreshToken
        this.tokenInfo = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          token_type: response.token_type
        } as TokenInfo
        this.startRefreshTokenTimer(response.expires_in as number)
      })
    },
    startRefreshTokenTimer(seconds: number) {
      const timeout = seconds * 1000 - 60 * 1000
      this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
    },
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout === null) return
      clearTimeout(this.refreshTokenTimeout)
    }
  }
})
