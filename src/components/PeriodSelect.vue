<template>
    <div>
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
export default {
    name: "PeriodSelect",
    data() {
        return {
            selected: 1
        };
    },
    methods: {
        emitPeriod(event) {
            console.log(`selected period: ${event.target.value}`);

            this.selected = parseInt(event.target.value);
            this.$emit("selectedPeriod", event.target.value);
        }
    }
};
</script>

<style scoped>
.period-btn {
    @apply inline-block px-4 leading-none text-3xl text-gray-500 font-thin;
}

.current {
    @apply text-gray-900 text-5xl font-normal;
}
</style>
