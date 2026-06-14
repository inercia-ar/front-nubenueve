<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  word1:   { type: String, default: 'SEÑAL'   },
  word2:   { type: String, default: 'PERDIDA' },
  header:  { type: String, default: 'SYS.ERR' },
  code:    { type: String, default: '404'     },
  message: { type: String, default: 'Error'   },
})

const words = ref([])

function rand(min, max) { return Math.random() * (max - min) + min }
function pick(...args)  { return args[Math.floor(Math.random() * args.length)] }

onMounted(() => {

  const slots = [

    { zone: [-5,  2,   0, 20, 14, 20, '--negro-b-SO', '--negro-b-SO', '--marron-05'  ] },
    { zone: [-3,  4,  60, 85, 12, 16, '--marron-05' , '--negro-b-SO', '--negro-b-SO' ] },
    { zone: [ 8, 18,  30, 50, 10, 14, '--gris-a-10' , '--gris-a-10' , '--negro-b-SO' ] },
    { zone: [ 8, 18,  70, 95, 10, 13, '--negro-b-SO', '--marron-05' , '--gris-a-10'  ] },
    { zone: [22, 34, -18, -5, 22, 30, '--negro-b-SO', '--negro-b-SO', '--gris-a-10'  ] },
    { zone: [28, 38,  60, 80, 18, 24, '--marron-10' , '--marron-05' , '--negro-b-SO' ] },
    { zone: [40, 55,  25, 45, 14, 18, '--gris-a-10' , '--negro-b-SO', '--marron-05'  ] },
    { zone: [42, 52, -10,  5, 11, 14, '--marron-05' , '--negro-b-SO', '--gris-a-10'  ] },
    { zone: [62, 75,  60, 80, 10, 15, '--gris-a-10' , '--negro-b-SO', '--negro-b-SO' ] },
    { zone: [65, 75,   0, 15,  8, 10, '--negro-b-SO', '--gris-a-05' , '--marron-05'  ] },
    { zone: [78, 88,  40, 65, 10, 13, '--negro-b-SO', '--gris-a-05' , '--negro-b-SO' ] },
    { zone: [80, 90,  18, 35,  6,  8, '--gris-a-05' , '--negro-b-SO', '--negro-b-SO' ] },

  ]

  words.value = slots.map(s => {

    const top = rand(s.zone[0], s.zone[1])
    const left = rand(s.zone[2], s.zone[3])
    const size = rand(s.zone[4], s.zone[5])
    const colors = s.zone.slice(6)
    const color = pick(...colors)
    const rotation = rand(-14, 14)
    const text = Math.random() > 0.5 ? props.word1 : props.word2

    return {
      text,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        fontSize: `clamp(${size * 0.4}rem, ${size}vw, ${size}rem)`,
        transform: `rotate(${rotation}deg)`,
        color: `var(${color})`,
      }
    }

  })

})

</script>

<template>

  <section class="notification">

    <div class="n-ghost" aria-hidden="true">
      <span v-for="(w, i) in words" :key="i" class="nw" :style="w.style">{{ w.text }}</span>
    </div>

    <div class="modal">

      <div class="panel">

        <header class="header">{{ header }}</header>
        <h1 class="code">{{ code }}</h1>
        <p class="text-small">{{ message }}</p>
        <slot name="action" />

      </div>

    </div>

  </section>

</template>
