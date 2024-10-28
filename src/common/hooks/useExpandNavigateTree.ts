import { TreeNode } from 'primereact/treenode'
import { useState } from 'react'
import { TreeExpandedKeysType } from 'primereact/tree'

export const useExpandNavigateTree = (nodes: TreeNode[]) => {
  const [expandedKeys, setExpandedKeys] = useState<TreeExpandedKeysType>({ '0': true })
  const expandAll = () => {
    const _expandedKeys = {}

    for (const node of nodes) {
      expandNode(node, _expandedKeys)
    }

    setExpandedKeys(_expandedKeys)
  }

  const collapseAll = () => {
    setExpandedKeys({})
  }

  const expandNode = (node: TreeNode, _expandedKeys: TreeExpandedKeysType) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key as string | number] = true

      for (const child of node.children) {
        expandNode(child, _expandedKeys)
      }
    }
  }

  return {
    expandedKeys,
    setExpandedKeys,
    expandAll,
    collapseAll,
  }
}
