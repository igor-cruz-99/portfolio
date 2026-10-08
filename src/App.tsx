import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { Ticker } from '@/components/sections/Ticker'
import { Profile } from '@/components/sections/Profile'
import { Skills } from '@/components/sections/Skills'
import { Flows } from '@/components/sections/Flows'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Education } from '@/components/sections/Education'
import { Traits } from '@/components/sections/Traits'
import { Contact } from '@/components/sections/Contact'
import { ToastProvider } from '@/components/ui/ToastProvider'

export default function App() {
  return (
    <ToastProvider>
      <Nav />
      <Hero />
      <Ticker />
      <main>
        <Profile />
        <Skills />
        <Flows />
        <Projects />
        <Experience />
        <Education />
        <Traits />
        <Contact />
      </main>
    </ToastProvider>
  )
}
