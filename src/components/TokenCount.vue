<template>
    <div class="px-8 pt-4">
        <h3 class="text-3xl leading-tight">Tokens</h3>
        <p class="text-3xl font-hairline leading-tight">{{ tokenCount }}</p>
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
            return this.user.tokenCount;
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
