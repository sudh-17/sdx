<template>
  <span :class="$style.tag">
    <slot />
  </span>  
</template>

<script>
export default {
  name: 'MyTag'
}
</script>

<style module>
.tag {
  color: red;
  font-size: 20px;
}
</style>