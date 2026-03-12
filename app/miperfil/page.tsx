'use client'

import MenuColapsado from '@/components/MenuColapsado/MenuColapsado'
import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout'
import { MiPerfil } from '@/components/MiPerfil/MiPerfil'
import { Footer } from '@/components/Footer/Footer'

export default function MiPerfilPage() {
  return (
    <div className="h-screen flex flex-col">

      {/* HEADER MOBILE */}
      <div className="block sm:hidden h-[105px] shrink-0">
        <MenuColapsado />
      </div>

      {/* DASHBOARD */}
      <DashboardLayout>
        <MiPerfil />
      </DashboardLayout>

      <Footer />
    </div>
  )
}




