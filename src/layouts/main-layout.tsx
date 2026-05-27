import { Outlet } from 'react-router-dom'

import backgroundImg from '@/assets/chart-bg.webp'

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-2xl"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      <main className="relative z-10 flex min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  )
}
