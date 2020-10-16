<template>
    <div class="w-full max-w-xs mx-auto mt-12">
        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div class="mb-4">
                <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="username"
                >
                    Email
                </label>
                <input
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div class="mb-6">
                <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="password"
                >
                    Password
                </label>
                <input
                    class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                />
                <p class="text-xs italic text-red-500">
                    Please choose a password.
                </p>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Sign In
                </button>
                <a
                    class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                >
                    Forgot Password?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login"
};
</script>

<style scoped></style>
