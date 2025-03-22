import { createFileRoute } from '@tanstack/react-router'
import MaterialSymbolsCalendarMonthOutline from '~icons/material-symbols/calendar-month-outline'
import MaterialSymbolsPerson2Outline from '~icons/material-symbols/person-2-outline'
import ModuleCard from '../../components/ModuleCard'
import { useGetAllModules } from '../../queries/module-queries'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: modules } = useGetAllModules({ take: 3 })
  return (
    <div className="h-screen flex flex-col gap-8">
      <div className="flex gap-4 bg-linear-to-b rounded-xl from-[#A28AFF] to-[#6547FE] text-white px-6 py-6">
        <div className="w-9/12 flex flex-col gap-4">
          <span className="text-orange-300 font-semibold">Pemrograman</span>
          <div className="">
            <h2 className="text-2xl">Pemrograman Frontend Modern dengan React dan Angular</h2>
            <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae tempora accusantium eveniet. Corporis modi impedit dicta, cum voluptatibus soluta quidem. Ea pariatur dignissimos placeat neque fugit eum alias esse modi ullam. Laborum.</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex gap-2 items-center">
              <MaterialSymbolsPerson2Outline />
              <span>Pemateri By Josep</span>
            </div>
            <div className="flex gap-2 items-center">
              <MaterialSymbolsCalendarMonthOutline />
              <span>20-20-2020</span>
            </div>
          </div>
        </div>
        <div className="w-3/12 flex items-end">
          <button type="button" className="bg-white font-semibold text-black w-full px-2 py-2 uppercase rounded">
            Mulai Learning
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">MODUL KOMPETENSI</h2>
        <div className="grid grid-cols-3 gap-8">
          {modules && modules.map(module => (
            <ModuleCard module={module} key={module.id} contentCount={3} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 d-table bg-white shadow-sm">
        <h2 className="text-xl font-semibold">NILAI PESERTA</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Class</th>
              <th>MODUL</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>Lorem, ipsum</td>
              <td>Pemrograman</td>
              <td>L1</td>
              <td className="text-green-600">1,234 Point</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
