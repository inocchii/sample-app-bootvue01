<template>
  <div id="app">
    <router-view />
    <BarBottom />
  </div>
</template>

<script>
// @ is an alias to /src
import BarBottom from "@/components/BarBottom.vue";

export default {
  name: "Top",
  data() {
    return {
      title: "Top",
    };
  },
  components: {
    BarBottom,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
div.card {
  text-align: left;
  margin: 0px 0px 5px;
  padding: 0px 0px 5px;
}
div.card-body {
  padding: 5px 10px;
}
div.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
  padding: 0px 0px 0px 10px;
}
div.card-text > h2 {
  font-size: 1.1rem;
}
div.card-text > h3 {
  font-size: 1rem;
}
div.card-text > h4 {
  font-size: 0.9rem;
}
div.card-text > p {
  font-size: 0.9rem;
  margin: 0px 0px 5px;
}
div.card-text > pre {
  /* line-height: 0.9rem; */
  margin: 0px 0px 15px;
}
div.card-text > code {
  padding: 0px, 0px;
  text-align: left;
}
div.card-text > ol > li > h4 {
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
}
div.card-text > ol >li > p {
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
}
</style>
