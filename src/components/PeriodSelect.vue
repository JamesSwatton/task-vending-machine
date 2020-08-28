<template>
    <div class="inline-block pt-16 pb-16 pl-8">
        <button
            class="period-btn"
            :class="{ current: selected === 1 }"
            value="1"
            @click="emitPeriod"
        >
            Today
        </button>
        <button
            class="period-btn"
            :class="{ current: selected === 2 }"
            value="2"
            @click="emitPeriod"
        >
            This Week
        </button>
        <button
            class="period-btn"
            :class="{ current: selected === 3 }"
            value="3"
            @click="emitPeriod"
        >
            This Month
        </button>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    name: "PeriodSelect",
    data() {
        return {
            selected: 1
        };
    },
    methods: {
        emitPeriod(event) {
            const selected = parseInt(event.target.value);
            console.log(`selected period: ${selected}`);

            this.selected = selected;
            eventBus.$emit("selectedPeriod", selected);
        }
    }
};
</script>

<style scoped>
.period-btn {
    @apply inline-block px-4 leading-none text-3xl text-gray-500;
}

.current {
    @apply text-gray-900 text-5xl font-semibold;
}
</style>
