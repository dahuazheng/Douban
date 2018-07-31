<template>
  <div class="find-password">
    <header>
      <router-link to="/login"><i class="iconfont icon-close"></i></router-link>
      <span class="title">找回密码</span>
    </header>
    <main>
      <div>
        <div class="form">
          <div class="input-box">
            <input v-model="userInfo.username" type="text" placeholder="手机号 / 邮箱">
          </div>
          <div class="input-box">
            <input v-model="userCode" type="text" placeholder="验证码">
            <span @click="getCode">{{codeBtnMeg}}</span>
          </div>
        </div>
        <button @click="next">下一步</button>
      </div>
      <div>
        <div class="reset-input">
          <input v-model="userInfo.password" type="password" placeholder="请输入新密码">
        </div>
        <button @click="next">重置密码</button>
      </div>
    </main>
    <AlertModal :class="{ active: alertModal.show }" :message="alertModal.msg"></AlertModal>
  </div>

</template>

<script>
  import AlertModal from '@/components/popup/AlertModal.vue'
  import {validate} from '@/utils/validate'
  import {getCode} from '@/utils/utils'
  import {setUserCode} from '@/utils/user'

  export default {
    name: 'FindPassword',
    data() {
      return {
        userInfo: {
          username: '',
          password: ''
        },
        userCode: '',
        code: '',
        codeBtnMeg: '获取验证码',
        alertModal: {
          show: false,
          msg: ''
        },
        timeCount: 0
      }
    },
    components: {
      AlertModal
    },
    methods: {
      getCode() {
        if (this.timeCount <= 0) {
          this.code = getCode(6);
          setUserCode(this.code);
          this.timeCount = 60;
          this.openAlert(this.code);
          this.codeStale()
        } else {
          this.openAlert(this.code);
        }
      },
      next() {
        let self = this;
        Object.keys(this.userInfo).some(item => {
          this.alertModal.msg = validate({
            label: item,
            value: self.userInfo[item]
          });
          return this.alertModal.msg !== '';
        });
        if (this.alertModal.msg) {
          this.openAlert(this.alertModal.msg);
          return true;
        }
      },
      openAlert(message) {
        message = String(message);
        if (message === '') return;
        this.alertModal.msg = message;
        this.alertModal.show = true;
        setTimeout(() => {
          this.alertModal.show = false
        }, 3000)
      },
      codeStale() {
        if (this.timeCount <= 0) {
          this.codeBtnMeg = '获取验证码';
          return;
        }
        setTimeout(() => {
          this.timeCount--;
          this.codeBtnMeg = this.timeCount + 's后重新获取';
          this.codeStale()
        }, 1000)
      }
    },
    mounted() {
      let query = this.$route.query;
      if (query) {
        this.userInfo.username = query.username;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/less/variables';

  header {
    position: relative;
    height: @headerHeight;
    box-sizing: border-box;
    text-align: center;
    line-height: @headerHeight;
    font-size: @headerFont;

    i {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      margin: auto;
      color: @themColor;
      font-weight: bold;
    }
  }

  main {
    margin: 20px;

    .form {
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 2px;
    }
    .input-box {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      height: 36px;

      &:first-child {
        border-bottom: 1px solid #ccc;
      }
      input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 8px;
        border: none;
      }
      span {
        position: absolute;
        top: 0;
        right: 8px;
        bottom: 0;
        margin: auto;
        line-height: 36px;
        color: @themColor;
      }
    }
    .reset-input {
      margin-bottom: 15px;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      height: 36px;
      border: 1px solid #ccc;
      border-radius: 2px;

      input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 8px;
        border: none;
      }
    }
    button {
      width: 100%;
      height: 36px;
      border: none;
      border-radius: 2px;
      background-color: @themColor;
      color: #fff;
    }
  }

</style>
