<template>
    <div>
        {{lj}}{{t1}}
    </div>
</template>
<script>
export default {
  props: ['lj'],
  data: () => {
    console.log('data', this.lj)
    return {
      t1: this.lj
    }
  },
  created () {
  }
}
</script>
