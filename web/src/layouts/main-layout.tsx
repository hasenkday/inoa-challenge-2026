import { Outlet } from 'react-router-dom'

import backgroundImgLight from '@/assets/chart_bg-light.webp'
import backgroundImg from '@/assets/chart_bg.webp'

export function MainLayout() {
  return (
    <div className="bg-bg relative min-h-screen overflow-hidden">
      <div
        className="light:opacity-0 fixed inset-0 scale-110 bg-cover bg-center bg-no-repeat opacity-100 blur-2xl transition-opacity duration-300"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      <div
        className="light:opacity-100 fixed inset-0 scale-110 bg-cover bg-center bg-no-repeat opacity-0 blur-2xl transition-opacity duration-300"
        style={{ backgroundImage: `url(${backgroundImgLight})` }}
      />

      <main className="relative z-10 flex min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  )
}
