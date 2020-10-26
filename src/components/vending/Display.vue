<template>
    <div
        id="display"
        class="relative w-48 h-20 mx-auto my-8 bg-gray-400 rounded-md"
    >
        <img
            src="../../assets/vending_screen.png"
            alt="vending screen"
            class="absolute top-0 left-0 z-10 w-48 h-20 rounded-md"
        />
        <h3
            class="absolute bottom-0 right-0 z-0 pb-1 pr-2 text-5xl text-gray-700"
        >
            {{ displayNum }}
        </h3>
    </div>
</template>

<script>
export default {
    name: "Display",
    props: ["displayNum"]
};
</script>
