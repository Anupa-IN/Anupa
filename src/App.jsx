import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FiArrowUpRight,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiX,
} from 'react-icons/fi'
import { FaPython, FaJava, FaReact, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiHtml5, SiExpress, SiMysql, SiPandas, SiNumpy, SiFlask } from 'react-icons/si'
import { DiCss3 } from 'react-icons/di'

const ACCENT = '#d8d2c4'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const heroSocials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Anupa-IN' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anupa-indeewara-14b135307/' },
  { icon: <FiInstagram />, label: 'Instagram', href: 'https://www.instagram.com/anupa.in' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:anupa12indeewara@gmail.com' },
]

const skillCategories = {
  Languages: [
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'HTML5', icon: <SiHtml5 /> },
    { name: 'CSS3', icon: <DiCss3 /> },
    { name: 'SQL', icon: <SiMysql /> },
  ],
  'Frameworks & Libraries': [
    { name: 'React', icon: <FaReact /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'NumPy', icon: <SiNumpy /> },
    { name: 'Pandas', icon: <SiPandas /> },
  ],
  'Tools & Platforms': [
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'MySQL', icon: <SiMysql /> },
  ],
}

const projects = [
  {
    title: 'Student Management System',
    description: 'A Java-based desktop application for managing academic records, built with a structured, object-oriented approach and a clean Swing interface.',
    stack: ['Java', 'Swing', 'MySQL'],
    links: { github: '#', demo: '#' },
  },
  {
    title: 'Portfolio Website',
    description: 'This personal portfolio - a premium, dark-themed site built with React and Tailwind CSS, focused on clarity and smooth motion design.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    links: { github: '#', demo: '#' },
  },
]

const education = [
  {
    title: "Bachelor's Degree",
    degree: 'BSc (Hons) Cyber Security',
    status: '2026 - 2029',
    school: 'Sri Lanka Technology Campus (SLTC)',
  },
  {
    title: 'Advanced Level',
    degree: 'G.C.E. Advanced Level',
    status: '2023 / 2024',
    school: 'Central College - Piliyandala',
  },
  {
    title: 'Ordinary Level',
    degree: 'G.C.E. Ordinary Level',
    status: '2020 / 2021',
    school: 'Central College - Piliyandala',
  },
]

const contactDetails = [
  { icon: <FiPhone />, label: '077 494 9441', href: 'tel:+94774949441' },
  { icon: <FiMail />, label: 'anupa12indeewara@gmail.com', href: 'mailto:anupa12indeewara@gmail.com' },
  { icon: <FiGithub />, label: 'github.com/Anupa-IN', href: 'https://github.com/Anupa-IN' },
  { icon: <FiInstagram />, label: '@anupa.in', href: 'https://www.instagram.com/anupa.in' },
  { icon: <FiLinkedin />, label: 'linkedin.com/in/anupa-indeewara', href: 'https://www.linkedin.com/in/anupa-indeewara-14b135307/' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RevealGroup({ children, className }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className={className}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ backgroundColor: `${ACCENT}99` }} />
      <p className="text-xs uppercase tracking-[0.35em]" style={{ color: ACCENT }}>{children}</p>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Languages')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = useMemo(() => Object.keys(skillCategories), [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-[#f5f5f0]">
      <motion.div className="fixed left-0 top-0 z-[60] h-[2px]" style={{ width: progressWidth, background: `linear-gradient(90deg, ${ACCENT}, #ffffff, ${ACCENT})` }} />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <a href="#home" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-wide text-white">Anupa</span>
            <span className="text-lg font-semibold tracking-wide" style={{ color: ACCENT }}>Indeewara</span>
          </a>
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="group relative text-sm text-[#a3a3a3] transition hover:text-white">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: ACCENT }} />
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden rounded-full border px-5 py-2 text-sm text-[#e5e5e0] backdrop-blur-md transition hover:bg-white/5 md:inline-flex" style={{ borderColor: `${ACCENT}4d` }}>
            Let's talk
          </a>
          <button className="rounded-md border p-2 md:hidden" style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1a`, color: ACCENT }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block py-2 text-sm text-[#a3a3a3]" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[120px]" style={{ backgroundColor: `${ACCENT}0f` }} />
        <div className="absolute bottom-[-10%] right-[-5%] h-[28rem] w-[28rem] rounded-full blur-[120px]" style={{ backgroundColor: `${ACCENT}0a` }} />
      </div>

      <main id="home" className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-10 lg:px-12">
        <section className="flex min-h-screen w-full flex-col items-center justify-center pb-16 pt-32 text-center">
          <RevealGroup className="flex w-full flex-col items-center">
            <motion.h1 variants={fadeUp} className="max-w-3xl text-[2.4rem] font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
              Building secure digital systems with{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, #ffffff, #a89f8a)` }}>
                precision &amp; intent.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-[#a3a3a3] sm:text-lg">
              I'm Anupa Indeewara - a Cyber Security undergraduate and software developer crafting resilient applications from Sri Lanka.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                View Projects
                <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10">
                Contact Me
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-3">
              {heroSocials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-[#a3a3a3] backdrop-blur-sm transition hover:-translate-y-1 hover:text-[#0a0a0a]"
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.borderColor = ACCENT }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = '' }}
                >
                  {item.icon}
                </a>
              ))}
            </motion.div>
          </RevealGroup>

          <Reveal delay={0.15} className="mx-auto mt-20 max-w-2xl">
            <p className="font-serif-italic text-xl leading-relaxed text-[#e5e5e0] sm:text-2xl">
              "Discipline, curiosity, and continuous learning are the foundation of secure systems."
            </p>
            <p className="mt-4 text-sm text-[#a3a3a3]">~ Anupa Indeewara</p>
          </Reveal>
        </section>

        <section id="about" className="w-full py-24">
          <Reveal className="mb-12">
            <SectionLabel>About Me</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">Curious, technical, and committed to building secure systems.</h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:col-span-7">
              <p className="text-lg leading-8 text-[#e5e5e0]">
                I'm passionate about <span style={{ color: ACCENT }}>full-stack development</span>, network security, and modern software engineering. I enjoy solving hard problems, learning continuously, and shipping applications that are both valuable and resilient.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  ['2026', 'Undergrad Start'],
                  ['2+', 'Languages Mastered'],
                  ['5+', 'Tools & Frameworks'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-semibold sm:text-3xl" style={{ color: ACCENT }}>{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#a3a3a3]">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <RevealGroup className="grid gap-4 lg:col-span-5">
              {[
                { title: 'Full-Stack Development', text: 'Building end-to-end applications across the frontend and backend.' },
                { title: 'Network Security', text: 'Understanding protocols, infrastructure, and how they can fail.' },
                { title: 'Problem Solving', text: 'Breaking down complex challenges into clean, workable solutions.' },
                { title: 'Cloud Learning', text: 'Exploring cloud-native tools and modern deployment practices.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5 transition"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition group-hover:scale-125" style={{ backgroundColor: ACCENT }} />
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#a3a3a3]">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section id="education" className="w-full py-24">
          <Reveal className="mb-12">
            <SectionLabel>Education</SectionLabel>
            <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">Academic foundation and continuous learning</h2>
          </Reveal>
          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {education.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#a3a3a3]">{item.title}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.degree}</h3>
                <p className="mt-3" style={{ color: ACCENT }}>{item.status}</p>
                <p className="mt-2 text-sm text-[#a3a3a3]">{item.school}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </section>

        <section id="skills" className="w-full py-24">
          <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Skills</SectionLabel>
              <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">A focused stack with strong fundamentals</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = activeCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className="rounded-full border px-4 py-2 text-sm transition"
                    style={active
                      ? { borderColor: ACCENT, backgroundColor: ACCENT, color: '#0a0a0a' }
                      : { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#111111', color: '#a3a3a3' }}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </Reveal>
          <RevealGroup key={activeCategory} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories[activeCategory].map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-6 transition"
              >
                <span className="text-2xl" style={{ color: ACCENT }}>{skill.icon}</span>
                <h3 className="text-base font-medium text-white">{skill.name}</h3>
              </motion.div>
            ))}
          </RevealGroup>
        </section>

        <section id="projects" className="w-full py-24">
          <Reveal className="mb-12">
            <SectionLabel>Projects</SectionLabel>
            <h2 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">Selected work that reflects current growth</h2>
          </Reveal>
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl border bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" style={{ borderColor: `${ACCENT}26` }}>
                  <div className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70" style={{ background: `radial-gradient(circle at 30% 20%, ${ACCENT}26, transparent 60%)` }} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#a3a3a3]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-[#0a0a0a] px-3 py-1 text-xs text-[#a3a3a3]">{tech}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={project.links.github} className="rounded-full border border-white/10 bg-[#0a0a0a] px-4 py-2 text-sm text-[#e5e5e0] transition hover:bg-white/5">GitHub</a>
                  <a href={project.links.demo} className="rounded-full px-4 py-2 text-sm font-medium text-[#0a0a0a] transition hover:brightness-110" style={{ backgroundColor: ACCENT }}>Live Demo</a>
                </div>
              </motion.article>
            ))}
          </RevealGroup>
        </section>

        <section id="contact" className="w-full py-24">
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
              style={{ backgroundColor: `${ACCENT}14` }}
            />
            <div className="relative">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <SectionLabel>Contact</SectionLabel>
                  <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Let's build something thoughtful and secure.</h2>
                  <p className="mt-4 text-base leading-7 text-[#a3a3a3]">Open to internships, collaborative projects, and conversations around cybersecurity, software development, and modern web experiences.</p>
                </div>
                <a
                  href="mailto:anupa12indeewara@gmail.com"
                  className="group inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:brightness-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  Say hello
                  <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contactDetails.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5 transition"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg transition group-hover:scale-105"
                      style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate text-sm text-[#e5e5e0]">{item.label}</span>
                  </motion.a>
                ))}
                <motion.div variants={fadeUp} className="flex flex-col justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 text-[#a3a3a3]">
                  <span className="flex items-center gap-2 text-sm">
                    <FiMapPin style={{ color: ACCENT }} /> Based in Sri Lanka
                  </span>
                  <span className="text-xs text-[#6b6b6b]">Open to remote & on-site opportunities</span>
                </motion.div>
              </RevealGroup>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/10 px-6 py-8 text-center text-sm text-[#a3a3a3] sm:px-10 lg:px-12">
        <p>&copy; 2026 Anupa Indeewara. All rights reserved.</p>
      </footer>

      <a href="#home" className="fixed bottom-6 right-6 z-50 rounded-full border bg-[#111111] p-3 backdrop-blur-xl transition hover:bg-white/5" style={{ borderColor: `${ACCENT}66`, color: ACCENT }}>
        <FiArrowUpRight className="text-xl" />
      </a>
    </div>
  )
}

export default App
