import React from 'react'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className='py-20 px-6'>
        <h1 className='text-5xl font-bold text-center text-[#2C3E50] mb-6'>
          Your Complete Workspace, Simplified
        </h1>
        <p className='text-xl text-[#64748B] text-center max-w-3xl mx-auto leading-relaxed'>
          OmniDesk brings together task management, notes, bookmarks, and finance tracking in one seamless workspace. Everything you need, right at your fingertips
        </p>
      </section>

      {/* Features Grid */}
      <section className='py-16 px-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Task Management */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className='text-5xl mb-4'>📋</div>
            <h3 className='text-2xl font-semibold text-[#2C3E50] mb-3'>
              Task Management
            </h3>
            <p className='text-[#64748B] leading-relaxed'>
              Create, organize, and track your tasks with ease. Set priorities and never miss what matters
            </p>
          </div>

          {/* Smart Notes */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className='text-5xl mb-4'>📝</div>
            <h3 className='text-2xl font-semibold text-[#2C3E50] mb-3'>
              Smart Notes
            </h3>
            <p className='text-[#64748B] leading-relaxed'>
              Capture ideas and information quickly. Rich text editing with organization that makes sense
            </p>
          </div>

          {/* Bookmarks */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className='text-5xl mb-4'>🔖</div>
            <h3 className='text-2xl font-semibold text-[#2C3E50] mb-3'>
              Bookmarks
            </h3>
            <p className='text-[#64748B] leading-relaxed'>
              Save and organize your favorite links. Access important resources instantly whenever you need them
            </p>
          </div>

          {/* Finance Tracker */}
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className='text-5xl mb-4'>💰</div>
            <h3 className='text-2xl font-semibold text-[#2C3E50] mb-3'>
              Finance Tracker
            </h3>
            <p className='text-[#64748B] leading-relaxed'>
              Monitor expenses and income. Simple budgeting tools to keep your finances on track
            </p>
          </div>
          
        </div>
      </section>

      {/* Why Choose OmniDesk */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-12">
            Why Choose OmniDesk?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                All-in-One Solution
              </h3>
              <p className="text-[#64748B]">
                No more switching between multiple apps. Everything you need in one place.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                Fast & Responsive
              </h3>
              <p className="text-[#64748B]">
                Built with modern technologies for a smooth, lag-free experience.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                Beautiful Design
              </h3>
              <p className="text-[#64748B]">
                Clean interface that stays out of your way and helps you focus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home