<template>
    <div id="app">
        <router-view v-cloak></router-view>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
	
@Component
export default class App extends Vue {
}
</script>
<style lang="scss" >
@import url('./asset/css/common.scss')
</style>
