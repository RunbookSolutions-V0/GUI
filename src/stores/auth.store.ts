import { defineStore } from 'pinia';
import { type RouteLocationNormalizedLoaded } from 'vue-router';
import router from "@/router"

import type { CurrentUser } from "@/graphql/apollo.generated";
import { useLoginMutation } from "@/graphql/apollo.generated";

import { apolloClient } from "@/graphql/apollo.client";
import {
    provideApolloClient,
} from '@vue/apollo-composable';


export const useAuthStore = defineStore({
    id: 'auth',
    persist: true,
    state: () => ({
        user: null as CurrentUser | null,
        refreshTokenTimeout: null as number | null | NodeJS.Timeout
    }),
    actions: {
        login(username: string, password: string, route: RouteLocationNormalizedLoaded | null) {
            provideApolloClient(apolloClient);
            const { mutate: login, onDone, loading } = useLoginMutation();
            login({input: { username, password}});
            onDone((result) => {
                if (!result.data || !result.data.auth.login || ! result.data.auth.login.user) {
                    return;
                }
                const response = result.data.auth.login;
                this.user = response.user as CurrentUser;
                this.startRefreshTokenTimer(response.expires_in as number);
                router.push(route?.query.returnUrl as string || '/');
            });
        },
        logout() {
            this.user = null;
            this.refreshTokenTimeout = null;
            router.push({name: "login"});
        },
        refreshToken() {
            console.log("Refresh The Token!");
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