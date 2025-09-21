import React, { useState } from 'react'
import ApplicationType from './Applications/ApplicationType'
import ApplicationClassification from './Applications/ApplicationCassification'
import CrimePart from './Crimes/CrimePart'
import CrimeType from './Crimes/CrimeType'
import CrimeSubType from './Crimes/CrimeSubType'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DataRules: React.FC = () => {
  const [activeTab, setActiveTab] = useState('crime-part')

  const tabs = [
    {
      id: 'crime-part',
      label: 'Crime Part',
      component: <CrimePart />
    },
    {
      id: 'crime-type',
      label: 'Crime Type',
      component: <CrimeType />
    },
    {
      id: 'crime-subtype',
      label: 'Crime Sub Type',
      component: <CrimeSubType />
    },
    {
      id: 'application-type',
      label: 'Application Type',
      component: <ApplicationType />
    },
    {
      id: 'application-classification', 
      label: 'Application Classification',
      component: <ApplicationClassification />
    }
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4">Data Rules</h2>
        <div className="flex flex-col space-y-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "justify-start",
                activeTab === tab.id && "bg-blue-100 text-blue-700 hover:bg-blue-200",
                activeTab !== tab.id && "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-2">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  )
}

export default DataRules