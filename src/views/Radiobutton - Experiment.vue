<template>
        <input type="radio" id="Book" value="b" v-model="material" />
        <label for="Book">printed book</label>
        <input type="radio" id="Manuscript" value="m" v-model="material" />
        <label for="Manuscript">manuscript</label>
</template>

<script>
export default {
    data() {
        return {
            material: '',
        };
    }
    }


</script>