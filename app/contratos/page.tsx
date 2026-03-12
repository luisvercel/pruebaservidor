'use client'
import { DashboardMenu4 } from '@/components/DashboardMenu4/DashboardMenu4'
import { Footer } from '@/components/Footer/Footer'
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado'
import { MisContratosDigitales } from '@/components/MisQuinielas/ContratosDigitales'


export default function MisContratosPage() {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER MOBILE */}
      <div className="block sm:hidden h-[105px] shrink-0">
        <MenuColapsado />
      </div>

      {/* DASHBOARD */}
      <DashboardMenu4>
        <MisContratosDigitales/>
      </DashboardMenu4>

      <Footer />
    </div>
  )
}

