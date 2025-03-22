import IcOutlineNotifications from '~icons/ic/outline-notifications'
import IconamoonSearchLight from '~icons/iconamoon/search-light'
import LetsIconsMessageLight from '~icons/lets-icons/message-light'

export default function Topbar() {
  return (
    <div className="h-14 flex justify-between items-center bg-white p-2">
      <h1 className="font-bold">LEARNING MANAGEMENT SYSTEM</h1>
      <div className="flex gap-2 h-full">
        <div className="flex items-center gap-2 border border-gray-300 w-56 rounded-lg p-2">
          <IconamoonSearchLight className="text-gray-500" />
          <input type="text" placeholder="Search class.." className="w-full" />
        </div>
        <button type="button" className="h-full aspect-square flex items-center justify-center">
          <IcOutlineNotifications className="text-gray-500" />
        </button>
        <button type="button" className="h-full aspect-square flex items-center justify-center">
          <LetsIconsMessageLight className="text-gray-500" />
        </button>
      </div>
    </div>
  )
}
