'use client'
import { DashboardMenu3 } from '@/components/DashboardMenu3/DashboardMenu3'
import { Footer } from '@/components/Footer/Footer'
import MenuColapsado from '@/components/MenuColapsado/MenuColapsado'
import { MisTransferencias } from '@/components/MiBalance/MisTransferencias'


export default function MisJuegosPage() {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER MOBILE */}
      <div className="block sm:hidden h-[105px] shrink-0">
        <MenuColapsado />
      </div>

      {/* DASHBOARD */}
      <DashboardMenu3>
        <MisTransferencias/>
      </DashboardMenu3>

      <Footer />
    </div>
  )
}

