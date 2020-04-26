<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Drawing</router-link> |
      <router-link to="/preview"  target="_blank">Preview</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
$dark-color: #2c3e50;
$secondary-color: #42b983;

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  cursor: url('assets/highlighter.svg'), auto;
  // cursor: url('../images/highlighter.cur'), url('../images/highlighter.svg'), auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $dark-color;

    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}
</style>
