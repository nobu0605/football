import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material'
import { useState, ReactNode, SyntheticEvent } from 'react'

export type Tab = {
  name: string | ReactNode
  panel: ReactNode
}

type Props = {
  tabs: Array<Tab>
}

export function Tabs({ tabs }: Props) {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <div>
      <MuiTabs value={tabIndex} onChange={handleChange}>
        {tabs.map((panel: Tab, i: number) => {
          return <MuiTab key={i} label={panel.name} />
        })}
      </MuiTabs>
      {tabs.map((tab: Tab, i: number) => {
        return tabIndex === i && <div key={i}>{tab.panel}</div>
      })}
    </div>
  )
}
