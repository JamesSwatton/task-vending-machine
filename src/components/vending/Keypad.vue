<template>
    <div>
        <h3 class="w-32 mx-auto text-3xl">{{ displayNum }}</h3>
        <div class="w-32 mx-auto grid grid-cols-3">
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(7)">7</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(8)">8</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(9)">9</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(4)">4</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(5)">5</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(6)">6</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(1)">1</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(2)">2</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(3)">3</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="clear()">*</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="buttonPress(0)">0</button>
            <button class="keypad-button hover:bg-gray-200 active:bg-gray-500" @click="enter">#</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Keypad",
    data() {
        return {
            inputNum: [""]
        };
    },
    methods: {
        buttonPress(num) {
            this.inputNum.push(num);
        },
        clear() {
            this.inputNum = [""];
        },
        enter() {
            console.log("You selected: " + this.displayNum);
        }
    },
    computed: {
        displayNum() {
            if (this.inputNum.length == 1) {
                return "0";
            } else {
                return this.inputNum.reduce((total, current) => {
                    return total.toString() + current.toString();
                });
            }
        }
    }
};
</script>

<style>
.keypad-button {
    @apply w-10 h-10 border;
}
</style>
