'use client'
import { DashboardMenu2 } from '@/components/DashboardMenu2/DashboardMenu2'
import { Footer } from '@/components/Footer/Footer'
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado'
import { MisMovimientos } from '@/components/MisJuegos/MisMovimientos'


export default function MisJuegosPage() {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER MOBILE */}
      <div className="block sm:hidden h-[105px] shrink-0">
        <MenuColapsado />
      </div>

      {/* DASHBOARD */}
      <DashboardMenu2>
        <MisMovimientos/>
      </DashboardMenu2>

      <Footer />
    </div>
  )
}




