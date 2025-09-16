import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { User, Building2, History, Settings as SettingsIcon } from 'lucide-react'
import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const Settings = () => {
  const { loginResponse } = useAuth()
  const { i18n, t } = useTranslation()
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    {
      id: "profile",
      label: t("settings.profile.title"),
      icon: <User className="w-4 h-4" />,
      content: (
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>{t("settings.profile.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("settings.profile.name")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_name}</div>
              </div>
              <div>
                <Label>{t("settings.profile.designation")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_designation}</div>
              </div>
              <div>
                <Label>{t("settings.profile.badgeNumber")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_badge_number}</div>
              </div>
              <div>
                <Label>{t("settings.profile.username")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_username}</div>
              </div>
              <div>
                <Label>{t("settings.profile.email")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_email}</div>
              </div>
              <div>
                <Label>{t("settings.profile.mobileNumber")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_mobile_number}</div>
              </div>
              <div>
                <Label>{t("settings.profile.joiningDate")}</Label>
                <div className="text-sm text-gray-700 mt-1">
                  {new Date(loginResponse?.officer_joining_date || '').toLocaleDateString()}
                </div>
              </div>
              <div>
                <Label>{t("settings.profile.status")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.officer_status}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "station",
      label: t("settings.station.title"),
      icon: <Building2 className="w-4 h-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.station.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("settings.station.id")}</Label>
                <div className="text-sm text-gray-700 mt-1">{loginResponse?.station_id}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "history",
      label: t("settings.history.title"), 
      icon: <History className="w-4 h-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.history.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              {t("settings.history.noHistory")}
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "preferences",
      label: t("settings.preferences.title"),
      icon: <SettingsIcon className="w-4 h-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.preferences.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>{t("settings.preferences.language")}</Label>
                <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">मराठी</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("settings.preferences.notifications")}</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" defaultChecked />
                    <label htmlFor="email">{t("settings.preferences.emailNotifications")}</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms" defaultChecked />
                    <label htmlFor="sms">{t("settings.preferences.smsNotifications")}</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="app" defaultChecked />
                    <label htmlFor="app">{t("settings.preferences.appNotifications")}</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("settings.preferences.theme")}</Label>
                <Select defaultValue="light">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t("settings.preferences.lightTheme")}</SelectItem>
                    <SelectItem value="dark">{t("settings.preferences.darkTheme")}</SelectItem>
                    <SelectItem value="system">{t("settings.preferences.systemTheme")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{t("settings.title")}</h2>
        </div>
        <nav className="p-2">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Settings