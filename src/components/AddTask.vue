<template>
    <div
        class="fixed inline-flex flex-col items-center w-20 h-screen pt-20 bg-white border-r border-gray-300"
    >
        <button
            class="flex items-center justify-center w-8 h-8 mb-6 bg-gray-900 rounded-full"
        >
            <svg
                class="w-6 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                />
            </svg>
        </button>
        <div id="colour-select">
            <div
                class="btn-container"
                :class="{ 'border border-gray-900': selected === 1 }"
            >
                <button
                    class="bg-blue-400 rnd-btn hover:bg-blue-500"
                    id="blue"
                    value="1"
                    @click="emitColour"
                ></button>
            </div>
            <div
                class="btn-container"
                :class="{ 'border border-gray-900': selected === 2 }"
            >
                <button
                    class="bg-green-400 rnd-btn hover:bg-green-500"
                    id="blue"
                    value="2"
                    @click="emitColour"
                ></button>
            </div>
            <div
                class="btn-container"
                :class="{ 'border border-gray-900': selected === 3 }"
            >
                <button
                    class="bg-yellow-400 rnd-btn hover:bg-yellow-500"
                    id="blue"
                    value="3"
                    @click="emitColour"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";

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
            eventBus.$emit("selectedColour", selected);
        }
    }
};
</script>

<style scoped>
.rnd-btn {
    @apply block rounded-full w-5 h-5;
}

.btn-container {
    @apply flex items-center justify-center w-8 h-8 mb-1 rounded-full;
}
</style>
