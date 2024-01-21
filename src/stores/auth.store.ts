import { defineStore } from 'pinia';
import { type RouteLocationNormalizedLoaded } from 'vue-router';
import router from "@/router"

import type { CurrentUser } from "@/graphql/apollo.generated";
import { useLoginMutation, useRefreshTokenMutation } from "@/graphql/apollo.generated";

import { apolloClient } from "@/graphql/apollo.client";
import {
    provideApolloClient,
} from '@vue/apollo-composable';

type TokenInfo = {
    access_token: string,
    refresh_token: string,
    token_type: string
}

export const useAuthStore = defineStore({
    id: 'auth',
    persist: true,
    state: () => ({
        user: null as CurrentUser | null,
        selectedTeam: null as string | null,
        tokenInfo: null as TokenInfo | null,
        refreshTokenTimeout: null as number | null | NodeJS.Timeout
    }),
    getters: {
        getToken(): string | null { 
            if (!this.tokenInfo) return null;
            return this.tokenInfo.token_type + " " + this.tokenInfo.access_token; 
        },
        team(): string | null {
            return this.selectedTeam;
        }
    },
    actions: {
        login(username: string, password: string, route: RouteLocationNormalizedLoaded | null) {
            provideApolloClient(apolloClient);
            const { mutate: login, onDone } = useLoginMutation();
            login({input: { username, password}});
            onDone((result) => {
                if (!result.data || !result.data.auth.login || ! result.data.auth.login.user) {
                    return;
                }
                const response = result.data.auth.login;
                this.user = response.user as CurrentUser;
                this.selectedTeam = this.user.personal_team.id;
                this.tokenInfo = {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    token_type: response.token_type
                } as TokenInfo;
                this.startRefreshTokenTimer(response.expires_in as number);
                router.push(route?.query.returnUrl as string || '/');
            });
        },
        logout() {
            this.user = null;
            this.tokenInfo = null;
            this.refreshTokenTimeout = null;
            router.push({name: "auth.login"});
        },
        refreshToken() {
            if (!this.tokenInfo) return;
            const { mutate: refresh, onDone } = useRefreshTokenMutation();
            refresh({input: { refresh_token: this.tokenInfo.refresh_token}});
            onDone((result) => {
                if (!result.data || !result.data.auth.refreshToken) return;
                const response = result.data.auth.refreshToken;
                this.tokenInfo = {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    token_type: response.token_type
                } as TokenInfo;
                this.startRefreshTokenTimer(response.expires_in as number);
            });

        },
        startRefreshTokenTimer(seconds: number) {
            const timeout = (seconds * 1000) - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },
        stopRefreshTokenTimer() {
            if (this.refreshTokenTimeout === null) return;
            clearTimeout(this.refreshTokenTimeout);
        }
    }
});