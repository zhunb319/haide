<template>
  <div id="about">

  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {

      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
      Social: () => import('@/components/home/Social'),
      Subscribe: () => import('@/components/home/Subscribe'),
    },
  }
</script>
