<template>
    <div class="px-8 pt-4">
        <h3 class="text-3xl leading-tight">Tokens</h3>
        <p class="text-3xl font-hairline leading-tight">{{ tokenCount }}</p>
        <button @click="update">add</button>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";

const db = firebase.firestore();

export default {
    name: "TokenCount",
    data() {
        return {
            user: {}
        };
    },
    computed: {
        tokenCount() {
            return this.user.tokenTotal;
        }
    },
    methods: {
        update() {
            var tokenCopy = { ...this.user }.tokenTotal;
            const newTotal = (tokenCopy += 20);

            console.log(tokenCopy);
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
        }
    },
    created() {
        this.$bind(
            "user",
            db.collection("users").doc(firebase.auth().currentUser.uid)
        );
    }
};
</script>
