<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="!isLoginPage &&device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!isLoginPage && device !=='mobile'" class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  components: {
  },
  methods: {
    
  }
}
</script>

