import { Outlet } from 'react-router-dom'

import backgroundImg from '@/assets/chart-bg.svg'

export function MainLayout() {
  return (
    <div className="bg-neutral-darkest relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat opacity-60 blur-[120px]"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
