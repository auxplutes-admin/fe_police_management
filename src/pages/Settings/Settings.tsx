import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { User, History, Settings as SettingsIcon, Loader2, Mail, Phone, Calendar, Badge, AtSign, UserCheck } from 'lucide-react'
import { useTranslation } from "react-i18next"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPoliceStationById } from '@/api'
import { Checkbox } from "@/components/ui/checkbox"
import SessionTable from '@/components/Table/SessionTable'

interface StationData {
  station_id: string;
  station_name: string;
  station_code: string;
  station_phone: string;
  station_email: string;
  station_latitude: string;
  station_longitude: string;
  station_zone: string;
  station_address: string;
  station_city: string;
  station_state: string;
  station_jurisdiction: string;
  station_type: string;
  station_incharge: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  is_active: boolean;
  is_deleted: boolean;
}

const Settings = () => {
  const { loginResponse } = useAuth()
  const { i18n, t } = useTranslation()
  const [activeTab, setActiveTab] = useState("profile")
  const [stationData, setStationData] = useState<StationData | null>(null)
  const [stationLoading, setStationLoading] = useState(false)

  const fetchStationData = async () => {
    if (!loginResponse?.station_id) return;
    
    try {
      setStationLoading(true);
      const response = await getPoliceStationById({
        station_id: loginResponse.station_id
      });
      
      if (response.status === 'success') {
        setStationData(response.data);
      }
    } catch (error) {
      console.error('Error fetching station data:', error);
    } finally {
      setStationLoading(false);
    }
  };

  useEffect(() => {
    fetchStationData();
  }, [loginResponse?.station_id]);

  const tabs = [
    {
      id: "profile",
      label: t("settings.profile.title"),
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t("settings.profile.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Personal Information */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold">{loginResponse?.officer_name}</h2>
                  <p className="text-gray-600">{loginResponse?.officer_designation}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Badge className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.badgeNumber")}</p>
                    <p className="font-medium">{loginResponse?.officer_badge_number}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <AtSign className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.username")}</p>
                    <p className="font-medium">{loginResponse?.officer_username}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.email")}</p>
                    <p className="font-medium">{loginResponse?.officer_email}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.mobileNumber")}</p>
                    <p className="font-medium">{loginResponse?.officer_mobile_number}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.joiningDate")}</p>
                    <p className="font-medium">
                      {new Date(loginResponse?.officer_joining_date || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{t("settings.profile.status")}</p>
                    <p className="font-medium">{loginResponse?.officer_status}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Station Information Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Station Information</h3>
              {stationLoading ? (
                <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">Loading station data...</span>
                </div>
              ) : stationData ? (
                <div className="bg-white rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="space-y-1">
                      <Label className="text-gray-600">Station Name</Label>
                      <div className="font-medium">{stationData.station_name}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Station Code</Label>
                      <div className="font-medium">{stationData.station_code}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Station Phone</Label>
                      <div className="font-medium">{stationData.station_phone}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Station Email</Label>
                      <div className="font-medium">{stationData.station_email}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Zone</Label>
                      <div className="font-medium">{stationData.station_zone}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Station Incharge</Label>
                      <div className="font-medium">{stationData.station_incharge}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">City</Label>
                      <div className="font-medium">{stationData.station_city}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">State</Label>
                      <div className="font-medium">{stationData.station_state}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Jurisdiction</Label>
                      <div className="font-medium">{stationData.station_jurisdiction}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Status</Label>
                      <div className="font-medium">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stationData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {stationData.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-gray-600">Address</Label>
                      <div className="font-medium">{stationData.station_address}</div>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <Label className="text-gray-600">Coordinates</Label>
                      <div className="font-medium">
                        {stationData.station_latitude}, {stationData.station_longitude}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 mt-1 p-4 bg-gray-50 rounded-lg">
                  No station data found
                </div>
              )}
            </div>
          </CardContent>
        </div>
      )
    },
    {
      id: "session",
      label: t("settings.session.title"), 
      icon: <History className="w-4 h-4" />,
      content: (
        <div className="rounded-lg">
          <SessionTable officerId={loginResponse?.officer_id || ""} />
        </div>
      )
    },
    {
      id: "preferences",
      label: t("settings.preferences.title"),
      icon: <SettingsIcon className="w-4 h-4" />,
      content: (
        <div className="rounded-lg">
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
        </div>
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