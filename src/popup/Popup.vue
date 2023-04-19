<script setup lang="ts">
import FileItem from './FileItem.vue'
import type { Folder } from '~/logic/directory-storage.js'
import { folderStorage } from '~/logic/directory-storage.js'

const handleRemove = (id: string) => {
  folderStorage.value = folderStorage.value.filter(item => id !== item.id)
}

const handleChange = (folder: Folder) => {
  folderStorage.value = folderStorage.value.map((item) => {
    if (item.id === folder.id)
      return folder
    return item
  })
}

const handleAddFolder = () => {
  folderStorage.value = [...folderStorage.value, {
    id: `${Date.now()}-${Math.random()}`,
    directory: '',
    files: [],
  }]
}
</script>

<template>
  <main class="w-[400px] px-4 py-5 text-gray-700">
    <h1 class="font-600 font-size-16 text-size-lg">
      Sourcemap Connector
    </h1>

    <div class="max-h-500px overflow-auto">
      <template v-for="(item, index) in folderStorage" :key="item.directory">
        <FileItem :id="item.id" :directory="item.directory" :files="item.files" @change="handleChange"
          @remove="() => handleRemove(item.id)">
          <template #default>
            目录{{ index + 1 }}
          </template>
        </FileItem>
      </template>
    </div>

    <button class="btn w-full mt-4" @click="handleAddFolder">
      添加目录
    </button>
  </main>
</template>
