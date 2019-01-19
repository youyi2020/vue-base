<template>
    <div class="test">1234</div>
</template>

<script>
    export default {
        name: "index",
        created(){
            console.log(process.env.NODE_ENV)
        }
    }
</script>

<style scoped lang="less">
    .test{
        color: red;
    }
</style>