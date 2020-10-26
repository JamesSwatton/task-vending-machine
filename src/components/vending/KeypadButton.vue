<template>
    <div>
        <button
            class="relative w-12 h-12 hover:bg-gray-200 active:bg-gray-500 "
        >
            <img
                class="keypad-img"
                src="../../assets/vending_button.png"
                alt="vending button"
            />
            {{ num }}
        </button>
    </div>
</template>

<script>
export default {
    name: "KeypadButton",
    props: ["num"]
};
</script>

<style>
.keypad-img {
    @apply absolute top-0 left-0 rounded-sm;
}
</style>
