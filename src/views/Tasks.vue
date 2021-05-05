<template>
  <div class="tasks">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.params.xx で行っている。
      routerでの定義は path: "/tasks/:id" となっており、:id 部分でパラメータを受け取っている。
    -->
    <p>this.$route.params.xxで値を受け取っている</p>
    <div>{{ this.$route.params.id }}</div>
    <div v-if="this.$route.params.id === 'Basic'">HTML5＆CSS</div>
    <TasksBoot v-if="this.$route.params.id === 'Boot'" />
    <TasksVue v-if="this.$route.params.id === 'Vue'" />
    <div v-if="this.$route.params.id === 'Vuex'">Vuex</div>
    <div v-if="this.$route.params.id === 'Router'">Router</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import TasksBoot from "@/components/TasksBoot.vue";
import TasksVue from "@/components/TasksVue.vue";

export default {
  name: "Tasks",
  data() {
    return {
      title: "TODO",
      msg: "Welcome to my Vue&Boot Tasks",
    };
  },
  components: {
    BarTop,
    TasksBoot,
    TasksVue,
  },
};
</script>
