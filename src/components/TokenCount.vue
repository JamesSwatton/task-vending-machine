<template>
    <div class="px-8 pt-4">
        <h3 class="text-3xl leading-tight">Tokens</h3>
        <p class="text-3xl font-hairline leading-tight">
            {{ tokenTotal }}
        </p>
        <button @click="update">add</button>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "TokenCount",
    data() {
        return {
            user: {},
            completedTasksNum: 0,
            completedHabitsNum: 0,
            tokenValue: 10
        };
    },
    computed: {
        tokenTotal() {
            return this.user.tokenTotal;
        },
        tokenActiveTotal() {
            return this.tokenValue * this.completedTasksNum;
        }
    },
    watch: {
        user() {
            console.log("watching");
            eventBus.$emit("tokenTotal", { ...this.user }.tokenTotal);
        }
    },
    methods: {
        update() {
            var tokenCopy = { ...this.user }.tokenTotal;
            const newTotal = (tokenCopy += 10);

            db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .update({
                    tokenTotal: newTotal
                })
                .then(() => {
                    console.log("Token successfully updated!");
                })
                .catch(err => {
                    console.error("Token update failed: " + err);
                });
        },
        bindData() {
            this.$bind(
                "user",
                db.collection("users").doc(firebase.auth().currentUser.uid)
            ).then(user => {
                console.log("tok " + user.tokenTotal);
                eventBus.$emit("tokenTotal", { ...user }.tokenTotal);
            });
        }
    },
    created() {
        this.bindData();

        eventBus.$on("completedTasksNum", data => {
            this.completedTasksNum = data;
        });
        eventBus.$on("completedHabitsNum", data => {
            this.completedHabitsNum = data;
        });
    }
};
</script>
