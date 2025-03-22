import { createFileRoute, Link } from '@tanstack/react-router'
import SolarArrowLeftLinear from '~icons/solar/arrow-left-linear'
import { useGetContentById } from "../../../../queries/content-queries";

export const Route = createFileRoute('/dashboard/modules/$moduleId/$contentId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { moduleId, contentId } = Route.useParams()
  const { data: content } = useGetContentById(moduleId, contentId)
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <Link to="/dashboard" type="button" className="size-8 flex items-center justify-center transition-colors duration-200 hover:bg-slate-200 rounded-lg">
          <SolarArrowLeftLinear />
        </Link>
      </div>
      {
        content?.img_url && (
          <img src={content?.img_url} alt="" className="w-full aspect-video bg-slate-300 object-cover object-center" />
        )
      }
      <h1 className="text-2xl font-semibold">{content?.title}</h1>
      <p>{content?.content}</p>
    </div>
  )
}
