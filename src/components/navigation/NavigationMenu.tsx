import s from './navigationMenu.module.scss'
import {
  Tree,
  TreeCheckboxSelectionKeys,
  TreeMultipleSelectionKeys,
  TreeNodeDoubleClickEvent,
  TreeTogglerTemplateOptions,
} from 'primereact/tree'
import { useState } from 'react'
import { TreeNode } from 'primereact/treenode'
import { Button } from '../button'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useExpandNavigateTree } from '../../common/hooks/useExpandNavigateTree.ts'
import { ToggleIcon } from '../../assets'
import clsx from 'clsx'
import { CheckBox } from '../checkBox'

type Props = { nodes: TreeNode[] }

export const NavigationMenu = ({ nodes }: Props) => {
  const [searchParams] = useSearchParams()
  const { expandAll, expandedKeys, setExpandedKeys, collapseAll } = useExpandNavigateTree(nodes)

  const filterValue = searchParams.get('search') || ''

  const [selectedKeys, setSelectedKeys] = useState<
    string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null
  >(null)

  const nodeTemplate = (node: TreeNode) => {
    let label = <b>{node.label}</b>
    if (node.data) {
      label = <ListItemContent node={node} />
    }
    return label
  }

  const togglerTemplate = (node: TreeNode, options: TreeTogglerTemplateOptions) => {
    if (!node) {
      return
    }

    const expanded = options.expanded

    return (
      node.children && (
        <ListItemButton
          options={options}
          className={clsx(s.listItemButton, expanded ?? s.expanded)}
        />
      )
    )
  }

  const onNodeDoubleClickHandler = (e: TreeNodeDoubleClickEvent) => {
    setExpandedKeys(expandedKeys => ({
      ...expandedKeys,
      [e.node.key as string | number]: true,
    }))
  }

  return (
    <nav className={s.nav}>
      <div className={s.controlBlock}>
        <Button onClick={collapseAll}>Свернуть все</Button>
        <Button onClick={expandAll}>Развернуть все</Button>
      </div>
      <Tree
        nodeTemplate={nodeTemplate}
        selectionMode={'single'}
        togglerTemplate={togglerTemplate}
        expandedKeys={expandedKeys}
        onToggle={e => {
          setExpandedKeys(e.value)
        }}
        className={s.tree}
        value={nodes}
        selectionKeys={selectedKeys}
        onSelectionChange={e => {
          setSelectedKeys(e.value)
        }}
        onNodeDoubleClick={onNodeDoubleClickHandler}
        filter
        filterMode="strict"
        filterValue={filterValue}
        onFilterValueChange={() => {}}
      />
    </nav>
  )
}

type ListItemContentProps = {
  node: TreeNode
}

const ListItemContent = ({ node }: ListItemContentProps) => {
  return (
    <NavLink className={s.listItemContentLink} to={node.data} rel="noopener noreferrer">
      <CheckBox label={node.label} />
    </NavLink>
  )
}

type ListItemButtonProps = { options: TreeTogglerTemplateOptions; className?: string }
const ListItemButton = ({ options, className }: ListItemButtonProps) => {
  return (
    <button type="button" className={className} tabIndex={-1} onClick={options.onClick}>
      <span aria-hidden="true">
        <ToggleIcon />
      </span>
    </button>
  )
}
