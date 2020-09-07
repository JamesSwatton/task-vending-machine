<template>
    <button
        id="add-task"
        class="flex items-center justify-center w-8 h-8 mb-6 bg-gray-900 rounded-full"
        @click="addNewTask"
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
</template>
