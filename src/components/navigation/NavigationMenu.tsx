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
import { Navigate, useSearchParams } from 'react-router-dom'
import { useExpandNavigateTree } from '../../common/hooks/useExpandNavigateTree.ts'
import { ToggleIcon } from '../../assets'
import clsx from 'clsx'
import { CheckBox } from '../checkBox'
import { useGetClasses } from '../../common/hooks/useGetClasses.ts'
import { ROUTES } from '../../app/router/router.tsx'
import { toast } from 'react-toastify'

export const NavigationMenu = () => {
  const [searchParams] = useSearchParams()
  const { classes: nodes, error } = useGetClasses()
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

  if (error) {
    toast('Unauthorized', { type: 'error' })
    return <Navigate to={ROUTES.login} />
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
  const setSearchParams = useSearchParams()[1]

  const onlistItemClickHandler = () => {
    setSearchParams(searchParams => {
      searchParams.set('selectedClass', node.key as string)
      return searchParams
    })
  }
  return (
    <span className={s.listItemContent} rel="noopener noreferrer" onClick={onlistItemClickHandler}>
      <CheckBox label={node.label} />
    </span>
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
