import { computed } from 'vue'
import { useStorageLocal } from '~/composables/useStorageLocal'

export interface Folder {
  id: string
  directory: string
  files: string[]
}

export const folderStorage = useStorageLocal<Folder[]>('source-map-url', [])

export const mapUrlStorage = computed(() => {
  const map: Record<string, string> = {}

  folderStorage.value.forEach((folder: Folder) => {
    if (!folder.directory)
      return

    const directory = `file://${folder.directory}`;
    (folder.files ?? []).forEach((file) => {
      const hash = file.replace(/\.map$/, '')
      map[hash] = `${directory}/${file}`
    })
  })

  return map
})
