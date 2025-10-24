<template>
  <div>
    <button style="border:0px;color:#3eaf7c;background:none;font-size: 16px;margin-bottom: 10px;">演示</button>
    <iframe width="100%" height="510px" :src="url">
    </iframe>
  </div>
</template>
<script>
export default {
  name: "demo",
  data() {
    return {
      isShow: true
    };
  },
  props: {
    url: {
      default: './samples/index.html'
    },
    btnText: {
      default: "演示"
    }
  },
  computed: {

  },

};
</script>
<style>
iframe {
  border-width: 0px;
}
</style>