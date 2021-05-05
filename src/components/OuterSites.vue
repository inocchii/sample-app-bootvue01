<template>
  <div class="OuterSites">
    <div class="list-group">
      <router-link
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="link in links"
        :key="link.title"
        :to="getPath(baseUrl, link.title, link.url)"
      >
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">{{ link.title }}</h6>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "OuterSites",
  data() {
    return {
      // activeIndex: 0,
      baseUrl: "/outer",
      links: [
        { title: "万年筆", url: "https://kobe-nagasawa.co.jp/fountainpen/" },
      ],
    };
  },
  methods: {
    getPath(argBase, argTitle, argOuterUrl) {
      console.log(
        "Outer base=" + argBase + " title=" + argTitle + " url=" + argOuterUrl
      );
      return (
        argBase + "?title=" + argTitle + "&url=" + argOuterUrl + "&backPath=/"
      );
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
