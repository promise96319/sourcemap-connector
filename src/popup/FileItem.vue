<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  directory: {
    type: String,
    required: true,
  },
  files: {
    type: Array as PropType<string[]>,
    required: true,
  },
})
const emit = defineEmits(['change', 'remove'])

const name = ref(props.name)
const directory = ref(props.directory)
const files = ref(props.files)

const handleRemove = () => {
  emit('remove', props.directory)
}

const handleChange = () => {
  emit('change', { id: props.id, name: name.value, directory: directory.value, files: files.value })
}

const handleRemoveFile = (file: string) => {
  files.value = files.value.filter(item => item !== file)
  handleChange()
}

const handleUpload = (e: any) => {
  files.value = [...e.target.files].map((file: File) => file.name).filter((name: string) => name.endsWith('.map'))
  handleChange()
}
</script>

<template>
  <section class="mt-4 rd-2 p-3 bg-gray-1">
    <div class="flex justify-between">
      <h3 class="text-left font-600 text-size-md">
        <slot></slot>
      </h3>
      <button class="c-red ml-2 cursor-pointer" @click="handleRemove">
        移除
      </button>
    </div>
    <div class="mt-2">
      <div class="flex items-center mt-2">
        <label>文件夹名称：</label>
        <input v-model="name" class="b-1 mr-2 flex-1 h-6 p-1" placeholder="请输入名称（可选）" @change="handleChange" />
      </div>
      <div class="flex items-center mt-2">
        <label>文件夹路径：</label>
        <input v-model="directory" class="b-1 mr-2 flex-1 h-6 p-1" placeholder="请输入文件夹路径" @change="handleChange" />
      </div>
      <div class="flex items-top mt-2">
        <label class="pt-1">上传文件夹：</label>
        <div class="flex-1 min-w-0">
          <input class="cursor-pointer" type="file" webkitDirectory @change="handleUpload">
          <ul>
            <li v-for="(item, index) in files" :key="index" class="flex justify-between mt-2">
              <span class="ellipsis flex-1">{{ item }}</span>
              <button class="c-red ml-2 cursor-pointer" @click="() => handleRemoveFile(item)">
                移除
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
