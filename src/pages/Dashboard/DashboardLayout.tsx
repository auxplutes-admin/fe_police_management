import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
  AlignJustify, 
  ChevronDown, 
  X, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  Users,
  Bell,
  User
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Building2, Shield, UserCog, FileBarChart } from "lucide-react"
import { useTranslation } from "react-i18next";

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const { loginResponse, logout } = useAuth()
  const navigate = useNavigate()
  // Generate random color for avatar
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'teal'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const navItems = [
    { 
      label: t("sidebar.home"), 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      route: "/dashboard", 
      roles: ["superadmin", "admin", "officer", "user"] 
    },
    { 
      label: t("sidebar.crimes"), 
      icon: <FileText className="w-5 h-5" />, 
      route: "/dashboard/crime", 
      roles: ["superadmin", "admin", "officer", "officer_crime"] 
    },
    { 
      label: t("sidebar.applications"), 
      icon: <FileText className="w-5 h-5" />, 
      route: "/dashboard/applications", 
      roles: ["superadmin", "admin", "officer", "officer_application"] 
    },
    { 
      label: t("sidebar.accidentalDeaths"), 
      icon: <AlertCircle className="w-5 h-5" />, 
      route: "/dashboard/accidental-deaths", 
      roles: ["superadmin", "admin", "officer", "officer_accidental_deaths"] 
    },
    { 
      label: t("sidebar.missingPersons"), 
      icon: <Users className="w-5 h-5" />, 
      route: "/dashboard/missing-person", 
      roles: ["superadmin", "admin", "officer", "officer_missing_person"] 
    },
    { 
      label: t("sidebar.missingProperty"), 
      icon: <Building2 className="w-5 h-5" />, 
      route: "/dashboard/missing-property", 
      roles: ["superadmin", "admin", "officer", "officer_missing_property"] 
    },
    { 
      label: t("sidebar.preventiveMeasure"), 
      icon: <Shield className="w-5 h-5" />, 
      route: "/dashboard/preventive-measures", 
      roles: ["superadmin", "admin", "officer", "officer_preventive_measures"] 
    },
    { 
      label: t("sidebar.summonsWarrants"), 
      icon: <FileBarChart className="w-5 h-5" />, 
      route: "/dashboard/summon-warrant", 
      roles: ["superadmin", "admin", "officer", "officer_summon_warrant"] 
    },
    { 
      label: t("sidebar.ncComplaints"), 
      icon: <FileText className="w-5 h-5" />, 
      route: "/dashboard/non-cognizable", 
      roles: ["superadmin", "admin", "officer", "officer_non_cognizable"] 
    },
    { 
      label: t("sidebar.officerManagement"), 
      icon: <UserCog className="w-5 h-5" />, 
      route: "/dashboard/manage-officers", 
      roles: ["superadmin", "admin", "officer", "officer_manage_officers"] 
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-4 h-4" /> : <AlignJustify className="w-4 h-4" />}
      </Button>

      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-30 shadow-lg`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Avatar className={`w-8 h-8 bg-${randomColor}-500`}>
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold text-gray-800">AUXPSM</h1>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex hover:bg-gray-100"
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          <TooltipProvider>
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.route
              
              return (
                isCollapsed ? (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center px-0 h-10 transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 border-blue-800 hover:bg-blue-50'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        asChild
                      >
                        <Link to={item.route}>
                          {Icon}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start h-10 transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-blue-800 hover:bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    asChild
                  >
                    <Link to={item.route}>
                      {Icon}
                      <span className="font-medium ml-3">{item.label}</span>
                    </Link>
                  </Button>
                )
              )
            })}
          </TooltipProvider>
        </nav>

        {/* User Profile */}
        <div className="p-2 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} h-10 hover:bg-gray-50`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className={`w-8 h-8 bg-${randomColor}-500`}>
                    <AvatarFallback>{loginResponse?.officer_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {loginResponse?.officer_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{loginResponse?.officer_designation}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 md:ml-0 ml-12">
                {navItems.find(item => item.route === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <span className="font-semibold">Notifications</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {/* Example notifications */}
                    <DropdownMenuItem className="p-4 hover:bg-gray-50">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">New Case Assigned</p>
                        <p className="text-sm text-gray-500">You have been assigned a new case #123</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                    <Avatar className={`w-8 h-8 bg-${randomColor}-500`}>
                      <AvatarFallback>{loginResponse?.officer_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}