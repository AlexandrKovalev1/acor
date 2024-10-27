import { TreeNode } from 'primereact/treenode'

export const useSelectedClassObj = (classes: TreeNode[], selectedClass: string | null) => {
  function findClassByKey(arr: TreeNode[], targetKey: string): TreeNode | null {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === targetKey) {
        return arr[i]
      }
      if (arr[i].children && arr[i].children!.length > 0) {
        const result = findClassByKey(arr[i].children!, targetKey)
        if (result) {
          return result
        }
      }
    }
    return null
  }

  const selectedClassObj = selectedClass && findClassByKey(classes, selectedClass)

  const comunicationItems =
    selectedClassObj && selectedClassObj.children
      ? selectedClassObj.children.map(i => i.label ?? '')
      : []

  return { selectedClassObj, comunicationItems }
}
