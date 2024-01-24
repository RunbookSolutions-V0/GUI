<template>
    <WidgetInterface
        v-bind="$props"
    >
        <PVCard
            v-if="location"
            class="h-full w-full"
            :pt-options="{mergeProps: false, mergeSections: true}"
            :pt="{
                body: 'py-5 h-full flex flex-col',
                content: 'px-5 md:px-6 flex flex-grow justify-center',
            }"
        >
            <template #title>
                Location Chart
            </template>
            <template #content>
                <PVOrganizationChart
                    v-if="chart"
                    :value="chart"
                    :collapsible="false"
                >
                    <template #BUILDING="slotProps">
                        <span>Building: {{ slotProps.node.label }}</span>
                    </template>
                    <template #OTHER="slotProps">
                        <span>OTHER: {{ slotProps.node.label }}</span>
                    </template>
                    <template #LOAD_MORE="slotProps">
                        <button @click="getChildren(slotProps.node.parent_id)">
                            Load Children Locations
                        </button>
                    </template>
                    <template #default="slotProps">
                        <span>
                            DEFAULT: 
                            <RouterLink
                                :to="{
                                    name: 'core.location.view',
                                    params: {
                                        id: slotProps.node.key,
                                    }
                                }"
                            >
                                {{ slotProps.node.label }}
                            </RouterLink>
                        </span>
                    </template>
                </PVOrganizationChart>
            </template>
        </PVCard>
        <div v-else>
            Loading...
        </div>
    </WidgetInterface>
</template>
<script lang="ts">
import gql from "graphql-tag";
import { defineComponent } from 'vue';

// Prime Vue
import PVCard from 'primevue/card';
import PVOrganizationChart, { type OrganizationChartNode } from 'primevue/organizationchart';

// Widgets
import type { AllTypes as T } from "s7k-widgets-core";
import { WidgetInterface, defaultWidgetComponent } from "s7k-widgets-core";

// GraphQL
import { useWidgetCoreLocationTreeQuery } from "@/graphql"
import type { CoreLocation } from "@/graphql"

export default defineComponent({
    name: 'WidgetCoreLocationTree',
    components: {
        PVCard,
        PVOrganizationChart,

        WidgetInterface
    },
    data(){
        return {
            location: null as CoreLocation | null,
            chart: undefined as OrganizationChartNode | undefined,
            queryID: "" as string | number
        }
    },
    props: {
        ...defaultWidgetComponent.props as T.RequiredWidgetsProps,
    },
    watch: {
        content: {
            handler(newContent, oldContent) {
                if(!newContent.data) return;
                this.location = newContent.data as CoreLocation;
                this.queryID = this.location.id
                if(this.chart == undefined)
                    this.initializeChart();
            },
            deep: true
        },
    },
    apollo: {
        children: {
            loadingKey: 'widgetCoreLocationTree',
            manual: false,
            query: gql`query widgetCoreLocationTree($parentId: ID) {
                core {
                    location {
                        list(parentId: $parentId) {
                            data {
                                id
                                name
                                type
                            }
                        }
                    }
                }
            }`,
            variables() {
                return {
                    parentId: this.queryID || null
                }
            },
            update(data) {
                return data.core.location.list.data;
            },
            result ({ data, loading, networkStatus }) {
                if(!data || !data.core.location.list.data) return;
                const rawChildren = data.core.location.list.data as CoreLocation[];
                const children = [] as OrganizationChartNode[];

                rawChildren.forEach((location) => {
                    children.push({
                        key: location.id,
                        label: location.name,
                        type: location.type,
                        children: [
                            {
                                key: 'none',
                                type: 'LOAD_MORE',
                                parent_id: location.id,
                                label: 'Load Children',
                            },
                        ]
                    });
                });

                this.addItemToChart(this.queryID, children);
            },
        }
    },
    mounted() {
        this.initializeChart();
    },
    methods: {
        initializeChart() {
            if(!this.location) return;
            this.chart = {
                key: this.location.id,
                label: this.location.name,
                type: this.location.type,
                children: [
                    
                    {
                        key: 'none',
                        type: 'LOAD_MORE',
                        parent_id: this.location.id,
                        label: 'Load Children',
                    },
                ]
            }
        },
        getChildren(parent_id: string | number) {
            this.queryID = parent_id;
            this.$apollo.queries.children.refetch();
        },
        addItemToChart(key: string | number, children = [] as OrganizationChartNode[]) {
            if(!this.chart) {
                return;
            }
            if (key === this.chart?.key) {
                if(!this.chart.children) {
                    console.error("No Children!");
                }
                this.chart.children?.concat(children);
            }

            const findAndAddChildren = (node) => {
                if(!node) return;
                if (node.key === key) {
                    // Found the node, append children and remove the 'none' child
                    children.forEach((child) => {
                        node.children.push(child);
                    });
                    // node.children = my_child;
                    node.children = (node.children as OrganizationChartNode[])
                        .filter(child => child.key !== 'none');
                    return;
                }

                // If the current node has children, recursively search in each child
                if (node.children && node.children.length > 0) {
                    for (const child of node.children) {
                        findAndAddChildren(child);
                    }
                }
            };
            findAndAddChildren(this.chart)
        },
    }
});


</script>