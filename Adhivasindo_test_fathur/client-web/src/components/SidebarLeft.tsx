import { Link } from '@tanstack/react-router'
import BiPeople from '~icons/bi/people'
import MaterialSymbolsLightMarkUnreadChatAltOutline from '~icons/material-symbols-light/mark-unread-chat-alt-outline'
import MaterialSymbolsCalendarMonthOutline from '~icons/material-symbols/calendar-month-outline'
import MaterialSymbolsGridViewOutlineRounded from '~icons/material-symbols/grid-view-outline-rounded'
import MaterialSymbolsLogout from '~icons/material-symbols/logout'
import MaterialSymbolsNewsmodeOutlineRounded from '~icons/material-symbols/newsmode-outline-rounded'
import MaterialSymbolsPerson2Outline from '~icons/material-symbols/person-2-outline'
import SolarSettingsLinear from '~icons/solar/settings-linear'
import { useLogout } from '../queries/auth-queries'

export default function SidebarLeft() {
  const logout = useLogout()
  return (
    <div className="w-2/12">
      <div className="h-14 bg-white p-2">
        Logo
      </div>
      <div className="h-[calc(100vh-3.5rem)] bg-[#2A2545] text-slate-500 rounded-tr-4xl px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="flex items-center p-3 rounded-lg gap-4"
            activeProps={{
              className: 'bg-white text-black',
            }}
            activeOptions={{ exact: true }}
          >
            <MaterialSymbolsGridViewOutlineRounded />
            Dashboard
          </Link>
          <Link
            to="/dashboard/modules"
            className="flex items-center p-3 rounded-lg gap-4"
            activeProps={{
              className: 'bg-white text-black',
            }}
          >
            <MaterialSymbolsNewsmodeOutlineRounded />
            Modul
          </Link>
          <button
            type="button"
            className="flex items-center p-3 rounded-lg gap-4"
          >
            <BiPeople />
            Peserta
          </button>
          <button
            type="button"
            className="flex items-center p-3 rounded-lg gap-4"
          >
            <MaterialSymbolsLightMarkUnreadChatAltOutline />
            Group Chat
          </button>
          <button
            type="button"
            className="flex items-center p-3 rounded-lg gap-4"
          >
            <MaterialSymbolsPerson2Outline />
            Pemateri
          </button>
        </div>
        <div className="w-full h-0.5 bg-slate-600"></div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="flex items-center p-3 rounded-lg gap-4"
          >
            <SolarSettingsLinear />
            Settings
          </button>
          <button
            type="button"
            className="flex items-center p-3 rounded-lg gap-4"
          >
            <MaterialSymbolsCalendarMonthOutline />
            Calendar
          </button>
        </div>
        <div className="w-full h-0.5 bg-slate-600"></div>
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center p-3 rounded-lg gap-4 hover:bg-white/20 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <MaterialSymbolsLogout />
          Logout
        </button>
      </div>
    </div>
  )
}
