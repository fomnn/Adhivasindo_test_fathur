import { createFileRoute } from '@tanstack/react-router';
import { useGetAllModules } from "../../../queries/module-queries";
import ModuleCard from "../../../components/ModuleCard";

export const Route = createFileRoute('/dashboard/modules/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: modules } = useGetAllModules();

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">MODUL KOMPETENSI</h2>
        <div className="grid grid-cols-3 gap-8">
          {modules && modules.map(module => (
            <ModuleCard module={module} />
          ))
          }
        </div>
      </div>
    </>
  );
}
