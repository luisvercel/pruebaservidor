import { MenuCuenta } from '@/components/MenuCuenta/MenuCuenta'
interface Props {
  children: React.ReactNode
}

export const DashboardMenu3 = ({ children }: Props) => {
  return (
    <div className="h-screen flex overflow-hidden">

      {/* ASIDE */}
      <aside className="hidden sm:block sm:w-[72px] lg:w-[280px] shrink-0">
      <MenuCuenta active='balance'></MenuCuenta>
      </aside>
      

      {/* MAIN */}
      <main className="bg-[#f4f5f6] dark:bg-[#24272a] flex-1 overflow-y-auto p-4 lg:p-8">
       {children}
      </main>

    </div>
  )
}