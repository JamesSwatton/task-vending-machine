<template>
    <div id="logo">
        <svg
            :class="size"
            viewBox="0 0 336 394"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="1.5"
        >
            <path
                d="M286.901 40.375l38.362 59.072-62.595 294.486L24 343.202 96.95 0l189.951 40.375zM35.861 335.5l219.105 46.572L314.62 101.42l-33.85-52.124-176.118-37.435L35.861 335.5z"
            />
            <path
                d="M287.023 40.401l38.266 58.925-1.522 7.159-55.754-11.851 11.85-55.755 7.16 1.522zm-7.15 46.531l29.518 6.274-23.244-35.792-6.274 29.518z"
            />
            <g fill="none" stroke="#000">
                <path d="M100.25 167.655l113.466 24.118" stroke-width="12" />
                <path
                    d="M234.641 197.179l5.346 9.54 18.671-14.756"
                    stroke-width="10"
                />
                <path d="M92.509 204.077l113.465 24.118" stroke-width="12" />
                <path
                    d="M226.899 233.601l5.347 9.54 18.67-14.756"
                    stroke-width="10"
                />
                <path d="M84.767 240.499l113.465 24.118" stroke-width="12" />
                <path
                    d="M219.157 270.023l5.347 9.54 18.671-14.756"
                    stroke-width="10"
                />
            </g>
            <path
                d="M33.118 300.218A149.999 149.999 0 010 206.202c0-82.787 67.213-150 150-150s150 67.213 150 150c0 81.114-64.523 147.277-145 149.918v.082H.214v-21h145.281l.001-.01.29.01h8.464c69.271-2.245 124.819-59.187 124.819-129 0-71.235-57.834-129.069-129.069-129.069-71.235 0-129.069 57.834-129.069 129.069a129.04 129.04 0 0018.144 65.989l-5.957 28.027z"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: "Logo",
    props: ["size"]
};
</script>

<style scoped>
.small {
    @apply w-16 h-16;
}

.large {
    @apply w-32 h-32;
}
</style>
