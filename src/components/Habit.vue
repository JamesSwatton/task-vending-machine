<template>
    <div class="flex justify-between max-w-full pt-5">
        <div class="flex items-center">
            <div class="flex items-center flex-shrink-0 h-6">
                <p
                    id="habit-count"
                    class="max-h-full px-5 text-lg font-light leading-tight text-white bg-blue-400 rounded-full"
                >
                    {{ defaultHabit.count }} / {{ defaultHabit.max }}
                </p>
            </div>
            <p id="habit-title" class="px-4 text-lg font-light text-gray-900">
                {{ defaultHabit.title }}
            </p>
        </div>
        <div id="update-habit" class="flex items-center">
            <button id="decrease">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 text-gray-500 fill-current hover:text-gray-800"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                </svg>
            </button>
            <button id="increase">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-500 fill-current hover:text-gray-800"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Habit",
    data() {
        return {
            defaultHabit: {
                title: "drink more water",
                frequency: 0,
                count: 0,
                max: 13,
                id: null,
                updatedAt: null
            }
        };
    }
};
</script>
