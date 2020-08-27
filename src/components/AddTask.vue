<template>
    <div>
        <button
            class="flex items-center justify-center block w-8 h-8 mb-5 text-white bg-gray-900 rounded-full"
        >
            +
        </button>
        <button
            class="bg-blue-400 rnd-btn hover:bg-blue-500"
            :class="{ 'border border-gray-900': selected === 1 }"
            id="blue"
            value="1"
            @click="emitColour"
        ></button>
        <button
            class="bg-green-400 rnd-btn hover:bg-green-500"
            :class="{ 'border border-gray-900': selected === 2 }"
            id="blue"
            value="2"
            @click="emitColour"
        ></button>
        <button
            class="bg-yellow-400 rnd-btn hover:bg-yellow-500"
            :class="{ 'border border-gray-900': selected === 3 }"
            id="blue"
            value="3"
            @click="emitColour"
        ></button>
    </div>
</template>

<script>
export default {
    name: "AddTask",
    data() {
        return {
            selected: 1
        };
    },
    methods: {
        emitColour(event) {
            const selected = parseInt(event.target.value);
            console.log(`selected colour: ${selected}`);

            this.selected = selected;
            this.$emit("selectedColour", selected);
        }
    }
};
</script>

<style scoped>
.rnd-btn {
    @apply block rounded-full w-6 h-6 mb-3;
}
</style>
