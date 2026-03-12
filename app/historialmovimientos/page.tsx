'use client'
import { DashboardMenu4 } from '@/components/DashboardMenu4/DashboardMenu4'
import { Footer } from '@/components/Footer/Footer'
import { HistorialMovimientos } from '@/components/HistorialMovimientos/HistorialMovimientos'
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado'

export default function HistorialMovimientosPage() {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER MOBILE */}
      <div className="block sm:hidden h-[105px] shrink-0">
        <MenuColapsado />
      </div>

      {/* DASHBOARD */}
      <DashboardMenu4>
        <HistorialMovimientos></HistorialMovimientos>
      </DashboardMenu4>

      <Footer />
    </div>
  )
}

