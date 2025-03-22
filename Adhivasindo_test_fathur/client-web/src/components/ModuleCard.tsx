import type { Module } from '../types/Module'
import { useNavigate } from '@tanstack/react-router'
import { useGetContentsByModuleId } from '../queries/content-queries'

export default function ModuleCard({ module, contentCount }: { module: Module, contentCount?: number }) {
  const navigate = useNavigate()
  const { data: contents } = useGetContentsByModuleId(module.id, { take: contentCount })

  function onContentClick(contentId: string) {
    navigate({
      to: '/dashboard/modules/$moduleId/$contentId',
      params: {
        moduleId: module.id,
        contentId,
      },
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-video px-2">
        <div className="size-full flex items-center justify-center bg-amber-100 border rounded-md p-2">
          <span className="uppercase font-semibold text-center">{module.name}</span>
        </div>
      </div>
      <h3 className="mx-2 text-sm font-semibold mt-2">MATERI KOMPETENSI</h3>
      <div className="w-full">
        {
          contents && contents.map(c => (
            <button key={c.id} onClick={() => onContentClick(c.id)} type="button" className="cursor-pointer not-last:border-b transition-colors duration-200 py-1 px-2 hover:bg-amber-300 w-full text-start">
              {c.title}
            </button>
          ))
        }
      </div>
    </div>
  )
}
