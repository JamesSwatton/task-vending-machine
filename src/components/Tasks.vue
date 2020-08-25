<template>
</template>

<script>
import firebase from "../firebaseConfig.js"

const db = firebase.firestore();

export default {
    name: "Tasks",
    data() {
        return {
            tasks: []
        }
    },
    firestore: {
        tasks: db.collection('tasks')
    },
}
</script>
