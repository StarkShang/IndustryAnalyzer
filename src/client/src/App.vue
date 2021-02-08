<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Application",
})
export default class Application extends Vue {}
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 80px;
}
</style>

<style lang="scss">
@import "assets/sass/mixin.scss";
body {
    margin: 0;
}
</style>
