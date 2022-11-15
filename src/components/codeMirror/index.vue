<template>
  <codemirror v-model="code"
              :placeholder="placeholder"
              :style="{ height: cHeight, width:'100%' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tabSize="2"
              :extensions="extensions"
              @ready="ready"
              @change="change"
              @focus="focus"
              @blur="blur" />
</template>
  
<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const prop = defineProps({
  code: {
    type: String,
    default: () => ''
  },
  height: {
    type: Number || String,
    default: () => 'auto'
  },
  placeholder:{
    type:String,
    default:() => ''
  }
})

const emit = defineEmits(['ready', 'focus', 'change', 'blur'])
const cHeight = computed(()=>{
  if(typeof prop.height === 'number'){
    return `${prop.height}px`
  }
  return prop.height
})

const extensions = [javascript(), oneDark];

const ready = (e) => emit('ready', e, prop.code)
const change = (e) => emit('change', e, prop.code)
const focus = (e) => emit('focus', e, prop.code)
const blur = (e) => emit('blur', e, prop.code)
</script>
  