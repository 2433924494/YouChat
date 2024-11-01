<template>
  <div class="main">
    <div class="left-side drag">
      <div></div>
      <div class="menu-list">
        <template v-for="item in menuList" :key="item">
          <div
            v-if="item.position == 'top'"
            :class="[
              'tab-item iconfont no-drag',
              item.icon,
              item.path == currentMenu.path ? 'active' : ''
            ]"
            @click="changeMenu(item)"
          >
            <template v-if="item.name == 'chat'"> </template>
          </div>
        </template>
      </div>
      <div class="menu-list menu-bottom">
        <template v-for="item in menuList" :key="item">
          <div
            v-if="item.position == 'bottom'"
            :class="[
              'tab-item iconfont no-drag',
              item.icon,
              item.path == currentMenu.path ? 'active' : ''
            ]"
            @click="changeMenu(item)"
          ></div>
        </template>
      </div>
    </div>
    <div class="right-container drag">
      <router-view v-slot="{ Component }" class="no-drag">
        <transition>
          <keep-alive include="chat">
            <component :is="Component" ref="componentRef"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
  <WinOp></WinOp>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WinOp from '../components/WinOp.vue'

const router = useRouter()
const menuList = ref([
  {
    name: 'chat',
    icon: 'icon-chat',
    path: '/chat',
    countKey: 'chatCount',
    position: 'top'
  },
  {
    name: 'contact',
    icon: 'icon-user',
    path: '/contact',
    countKey: 'contactApplyCount',
    position: 'top'
  },
  {
    name: 'mysetting',
    icon: 'icon-more2',
    path: '/setting',
    position: 'bottom'
  }
])
router.push(menuList.value[0].path)
const currentMenu = ref(menuList.value[0])
const changeMenu = (item) => {
  currentMenu.value = item
  router.push(item.path)
}
</script>

<style lang="scss">
.main {
  background-color: #f2f2f2;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  .left-side {
    width: 55px;
    background-color: #f2f2f2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
    border: 1px solid #f2f2f2;
    border-right: none;
    padding-bottom: 10px;
    // height: 100vh;
    .menu-list {
      width: 100%;
      flex: 1;
      .tab-item {
        color: #d3d3d3;
        font-size: 20px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;

        cursor: pointer;
        font-size: 22px;
        position: relative;
      }
      .active {
        color: #1a9ad1;
      }
    }
    .menu-bottom {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
  .right-container {
    flex: 1;
    overflow: hidden;
    border: 1px solid #ddd;
    border-left: none;
  }
}
.popover-user-panel {
  padding: 10px;
  .popover-user {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .send-messsage {
    margin-top: 10px;
    text-align: center;
    padding: 20px 0px 0px 0px;
  }
}
</style>
