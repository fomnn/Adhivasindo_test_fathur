import SolarAltArrowLeftLineDuotone from '~icons/solar/alt-arrow-left-line-duotone'
import SolarAltArrowRightLineDuotone from '~icons/solar/alt-arrow-right-line-duotone'
import SolarSettingsLinear from '~icons/solar/settings-linear'
import { useUserStore } from '../stores/user-store'

export default function SidebarRight() {
  const user = useUserStore(state => state.user)
  return (
    <div className="w-3/12 h-screen sticky flex flex-col gap-8 inset-y-0 py-8 px-4">
      <div className="">
        <div className="">
          <div className="size-20 relative mx-auto">
            <img
              src="https://images.unsplash.com/photo-1742210595290-f021aba0d9f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="bg-amber-200 size-full rounded-full object-cover"
            />
            <button type="button" className="absolute top-0 -right-8">
              <SolarSettingsLinear />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-center mt-2">
            SELAMAT DATANG,
            {' '}
            {user?.name}
          </h2>
          <p className="text-sm text-slate-500 text-center">Di LMS By Adhivasindo</p>
        </div>
      </div>
      <div className="bg-[#2A2545] text-white px-2 py-3 rounded-xl">
        <div className="flex items-center gap-2 justify-center">
          <button type="button">
            <SolarAltArrowLeftLineDuotone />
          </button>
          <p>April 2025</p>
          <button type="button">
            <SolarAltArrowRightLineDuotone />
          </button>
        </div>
        <div className="flex justify-between gap-2 text-black mt-4">
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Su</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">1</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Mo</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">2</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Tu</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">3</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">We</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">4</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Th</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">5</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Fr</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">6</span>
          </div>
          <div className="flex flex-col gap-2 bg-white w-full items-center rounded-md p-0.5">
            <span className="text-sm">Sa</span>
            <span className="border rounded text-slate-400 border-slate-400 w-full flex items-center justify-center">7</span>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="text-lg font-semibold">JADWAL PEMATERI</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center">
            <div className="w-full flex items-center gap-2">
              <div className="size-10 bg-amber-300 rounded" />
              <div className="text-sm">
                <h4 className="font-semibold">Storytelling dalam pemasaran</h4>
                <p className="text-slate-400">08:00 - 11:00 With Mr. Liam</p>
              </div>
            </div>
            <SolarAltArrowRightLineDuotone className="shrink-0" />
          </div>
          <div className="flex items-center">
            <div className="w-full flex items-center gap-2">
              <div className="size-10 bg-amber-300 rounded" />
              <div className="text-sm">
                <h4 className="font-semibold">Storytelling dalam pemasaran</h4>
                <p className="text-slate-400">08:00 - 11:00 With Mr. Liam</p>
              </div>
            </div>
            <SolarAltArrowRightLineDuotone className="shrink-0" />
          </div>
          <div className="flex items-center">
            <div className="w-full flex items-center gap-2">
              <div className="size-10 bg-amber-300 rounded" />
              <div className="text-sm">
                <h4 className="font-semibold">Storytelling dalam pemasaran</h4>
                <p className="text-slate-400">08:00 - 11:00 With Mr. Liam</p>
              </div>
            </div>
            <SolarAltArrowRightLineDuotone className="shrink-0" />
          </div>
        </div>
      </div>
      <div className="w-full aspect-video bg-amber-500" />
      <div className="w-full aspect-video bg-amber-500" />
    </div>
  )
}
