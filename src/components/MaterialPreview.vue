<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Environment } from '@tresjs/cientos'
import { shallowRef, watch } from 'vue'

let envMap: string
const sphereRef = shallowRef()

const environmentTexture = shallowRef()

watch(environmentTexture, ({ getTexture }) => {
  envMap = getTexture()
})

watch(sphereRef, ({ material }) => {
  material.envMap = envMap
})

withDefaults(
  defineProps<{
    selectedColor: string
    metalness: number | string
    roughness: number | string
  }>(),
  {
    selectedColor: '#fff',
    metalness: 0,
    roughness: 0,
  },
)
</script>
<template>
  <div
    class="preview w-full aspect-video border-1 border-gray-200 rounded-lg my-4 bg-gray-200 overflow-hidden"
  >
    <TresCanvas>
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :args="[25, 1, 0.1, 1000]"
        :look-at="[0, 0, 0]"
      />

      <Suspense>
        <Environment
          ref="environmentTexture"
          preset="sunset"
          :blur="1"
        />
      </Suspense>
      <TresAmbientLight :args="['#fff', 2]" />
      <TresMesh ref="sphereRef">
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshStandardMaterial
          :color="selectedColor"
          :metalness="metalness"
          :roughness="roughness"
        />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
