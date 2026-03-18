import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import SeatingMap from '@/components/classroom/SeatingMap'

export default function ClassroomPage() {
  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar />
      <div className="flex">
        <Sidebar role="teacher" />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-nunito font-bold text-contigo-navy mb-2">
              🪑 Classroom Seating Map
            </h1>
            <p className="text-contigo-slate">
              Interactive seating arrangement with performance overlays and AI-powered suggestions
            </p>
          </div>

          {/* Seating Map Component */}
          <SeatingMap />
        </main>
      </div>
    </div>
  )
}
