import { useGetModelTreeClassesQuery } from '../../services/modelTreeClassesApi.ts'
import { TreeNode } from 'primereact/treenode'

export const useGetClasses = () => {
  const { data } = useGetModelTreeClassesQuery()

  const nodes: TreeNode[] = [
    {
      key: '0',
      label: 'Классы',
      selectable: false,
      children: data?.modelTreeClasses.tree?.map((i, index) => ({
        id: i.id,
        key: `${index + 1}`,
        label: i.name,
        data: i.description,
        expanded: false,
        children: i?.classTypes?.map((i, key) => ({
          key: `${index + 1}-${key}`,
          label: i.name,
          data: i.description,
        })),
      })),
    },
  ]

  return {
    classes: nodes,
  }
}
