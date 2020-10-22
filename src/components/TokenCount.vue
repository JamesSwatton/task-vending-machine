<template>
    <div class="px-8 pt-4">
        <h3 class="text-3xl leading-tight">Tokens</h3>
        <p class="text-3xl font-hairline leading-tight">
            {{ tokenTotal }}
        </p>
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
            return { ...this.user }.tokenTotal + this.tokenActiveTotal;
        },
        tokenActiveTotal() {
            return (
                this.tokenValue *
                (this.completedTasksNum + this.completedHabitsNum)
            );
        }
    },
    watch: {
        user() {
            eventBus.$emit("tokenTotal", { ...this.user }.tokenTotal);
        }
    },
    methods: {
        bindData() {
            this.$bind(
                "user",
                db.collection("users").doc(firebase.auth().currentUser.uid)
            ).then(user => {
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
