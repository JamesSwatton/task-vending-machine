<template>
    <div>
        <div class="w-32 mx-auto mt-5 grid grid-cols-3 gap-1">
            <keypad-btn-app
                :num="7"
                @click.native="buttonPress(7)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="8"
                @click.native="buttonPress(8)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="9"
                @click.native="buttonPress(9)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="4"
                @click.native="buttonPress(4)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="5"
                @click.native="buttonPress(5)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="6"
                @click.native="buttonPress(6)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="1"
                @click.native="buttonPress(1)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="2"
                @click.native="buttonPress(2)"
            ></keypad-btn-app>
            <keypad-btn-app
                :num="3"
                @click.native="buttonPress(3)"
            ></keypad-btn-app>
            <keypad-btn-app :num="'*'" @click.native="clear()"></keypad-btn-app>
            <keypad-btn-app
                :num="0"
                @click.native="buttonPress(0)"
            ></keypad-btn-app>
            <keypad-btn-app :num="'#'" @click.native="enter()"></keypad-btn-app>
        </div>
    </div>
</template>

<script>
import KeypadButton from "./KeypadButton";
export default {
    name: "Keypad",
    components: {
        "keypad-btn-app": KeypadButton
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
            this.emitDisplayNum();
        },
        clear() {
            this.inputNum = ["0"];
            this.emitDisplayNum();
        },
        enter() {
            console.log("You selected: " + this.displayNum);
        },
        emitDisplayNum() {
            this.$emit("displayNum", this.displayNum);
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
