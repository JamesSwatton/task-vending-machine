<template>
    <div class="flex pt-5">
        <p
            id="habit-count"
            class="inline-flex px-5 text-lg font-light text-white bg-blue-400 rounded-full"
        >
            {{ defaultHabit.count }} / {{ defaultHabit.max }}
        </p>
        <p id="habit-title" class="text-lg font-light ml-5 text-gray-900">
            {{ defaultHabit.title }}
        </p>
        <div id="update-habit">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
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
                title: "Title",
                frequency: 0,
                count: 0,
                max: 1,
                id: null,
                updatedAt: null
            }
        };
    }
};
</script>
