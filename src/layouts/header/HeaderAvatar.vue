<template>
  <a-dropdown style="zIndex:9999">
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="`/attach/view/${user.portrait}`" />
      <span class="name">{{user.realname}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>{{$t('PersonalCenter')}}</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>{{$t('PersonalSettings')}}</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>{{$t('signOut')}}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "@/services/user";
import { Modal } from "ant-design-vue";

export default {
  name: "HeaderAvatar",
  i18n: require("./i18n.js"),
  computed: {
    ...mapGetters("account", ["user"]),
  },
  methods: {
    logout() {
      Modal.confirm({
        title: this.$t("dialog.title"),
        content: this.$t("dialog.content"),
        onOk: () => {
          logout();
          this.$router.push("/login");
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          // return this.$store.dispatch("Logout").then(() => {
          //   this.$router.push({ name: "login" });
          // });
        },
        onCancel() {},
      });
      // logout();
      // this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  position: relative;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
  z-index: 9999;
}
.ant-dropdown.ant-dropdown-placement-bottomRight {
  z-index: 9999;
}
</style>
