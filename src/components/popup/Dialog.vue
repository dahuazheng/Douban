<template>
  <div class="dialog">

  </div>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      message: String
    },
  }
</script>

<style scoped lang="less">
  @import '../../assets/less/variables';

  .alert-model {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    opacity: 0;
    z-index: -1;
    transform: translateY(0);
    transition: all .5s;

    &.active {
      opacity: 1;
      z-index: 1;
      transform: translateY(-30px);
    }
    span {
      display: inline-block;
      height: 40px;
      padding: 0 15px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 3px;
      line-height: 40px;
      color: #fff;
    }
  }
</style>
