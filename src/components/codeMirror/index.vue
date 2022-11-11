<template>
    <codemirror v-model="code" placeholder="Code gose here..." :style="{ height: `${height}px` }" :autofocus="true"
        :indent-with-tab="true" :tabSize="2" :extensions="extensions" @ready="log('ready', $event)"
        @change="log('change', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
</template>
  
<script setup>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { defineProps } from "vue";
const prop = defineProps({
    code: {
        type: String,
        default: () => 'hello comdemirror'
    },
    height:{
        type:Number,
        default:() => 400
    }
})

const extensions = [javascript(), oneDark];
const log = console.log;

</script>
  