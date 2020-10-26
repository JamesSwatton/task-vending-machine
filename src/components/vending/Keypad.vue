<template>
    <div>
        <display-app :displayNum="displayNum"></display-app>
        <div class="w-32 mx-auto mt-5 grid grid-cols-3 gap-1">
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500 "
                @click="buttonPress(7)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                7
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(8)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                8
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(9)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                9
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(4)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                4
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(5)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                5
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(6)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                6
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(1)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                1
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(2)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                2
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(3)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                3
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="clear()"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                *
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="buttonPress(0)"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                0
            </button>
            <button
                class="keypad-button hover:bg-gray-200 active:bg-gray-500"
                @click="enter"
            >
                <img
                    class="keypad-img"
                    src="../../assets/vending_button.png"
                    alt="vending button"
                />
                #
            </button>
        </div>
    </div>
</template>

<script>
import Display from "./Display.vue";
export default {
    name: "Keypad",
    components: {
        "display-app": Display
    },
    data() {
        return {
            inputNum: ["0"]
        };
    },
    methods: {
        buttonPress(num) {
            if (this.inputNum.length < 5) {
                if (this.inputNum.length == 1 && num == 0) {
                    this.inputNum.push(num);
                } else if (
                    this.inputNum.length == 1 &&
                    this.inputNum[0] == "0" &&
                    num !== 0
                ) {
                    this.inputNum.pop();
                    this.inputNum.push(num);
                } else {
                    this.inputNum.push(num);
                }
            }
        },
        clear() {
            this.inputNum = ["0"];
        },
        enter() {
            console.log("You selected: " + this.displayNum);
        }
    },
    computed: {
        displayNum() {
            return this.inputNum.reduce((total, current) => {
                return total.toString() + current.toString();
            });
        }
    }
};
</script>

<style>
.keypad-button {
    @apply w-10 h-10  relative;
}

.keypad-img {
    @apply absolute top-0 left-0 rounded-sm;
}
</style>
