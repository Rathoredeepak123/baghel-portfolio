"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Play, Pause, X, Menu, Mail, MessageCircle, Linkedin, Sun, Moon, Film, Globe2, Sparkles, Send } from "lucide-react";
import { profile, projects, skills, visuals, type Category, type Project } from "@/lib/content";

const categories = ["All", "Video Editing", "Motion Graphics", "Web", "Outreach"] as const;
type Filter = "All" | Category;
const reveal = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0 } };

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  return <motion.section id={id} className={className} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.12 }} transition={{ staggerChildren: 0.12 }}>{children}</motion.section>;
}
function In({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} variants={reduce ? undefined : reveal} transition={{ duration: 0.65, ease: "easeOut" }}>{children}</motion.div>;
}
function MagneticLink({ href, children, external = false, className = "" }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return <motion.a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className} animate={reduce ? undefined : offset} transition={{ type: "spring", stiffness: 260, damping: 20 }} onMouseMove={e => { if (reduce || window.matchMedia("(pointer: coarse)").matches) return; const rect = e.currentTarget.getBoundingClientRect(); setOffset({ x: (e.clientX - rect.left - rect.width / 2) * 0.12, y: (e.clientY - rect.top - rect.height / 2) * 0.12 }); }} onMouseLeave={() => setOffset({ x: 0, y: 0 })}>{children}</motion.a>;
}
function CursorGlow() {
  const reduce = useReducedMotion();
  const [point, setPoint] = useState({ x: -300, y: -300 });
  useEffect(() => { if (reduce || window.matchMedia("(pointer: coarse)").matches) return; const fn = (e: MouseEvent) => setPoint({ x: e.clientX, y: e.clientY }); window.addEventListener("pointermove", fn, { passive: true }); return () => window.removeEventListener("pointermove", fn); }, [reduce]);
  if (reduce) return null;
  return <motion.div aria-hidden="true" className="pointer-events-none fixed z-[90] hidden h-44 w-44 rounded-full opacity-40 blur-3xl lg:block" style={{ background: "radial-gradient(circle,#cba66a55,transparent 70%)" }} animate={{ x: point.x - 88, y: point.y - 88 }} transition={{ type: "spring", stiffness: 120, damping: 24 }} />;
}
function ThemeButton({ light, toggle }: { light: boolean; toggle: () => void }) {
  return <button type="button" aria-label={light ? "Switch to dark theme" : "Switch to light theme"} onClick={toggle} className="rounded-full border border-[var(--line)] p-3 transition hover:border-[var(--accent)]">{light ? <Moon size={17} /> : <Sun size={17} />}</button>;
}
function Showreel() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasVideo = process.env.NEXT_PUBLIC_HAS_SHOWREEL === "true";
  return <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--line)] bg-[#111]">
    <Image src={visuals.showreel} alt="Illustrative filmmaking equipment — replace with approved showreel artwork" fill sizes="(max-width: 768px) 100vw, 85vw" className="object-cover opacity-65" />
    {hasVideo && !failed && <video id="portfolio-showreel" controls={playing} playsInline preload="none" poster={visuals.showreel} onEnded={() => setPlaying(false)} onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" src="/showreel.mp4" />}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white md:bottom-10 md:left-10">
      <div><p className="mb-2 text-[10px] uppercase tracking-[.3em] text-[#d8b47d]">Featured showreel</p><h3 className="font-serif text-3xl md:text-5xl">A story in motion.</h3><p className="mt-2 max-w-lg text-sm text-stone-300">{hasVideo && !failed ? "Watch the creative reel." : "Client-approved footage coming soon. This is an illustrative preview."}</p></div>
      {hasVideo && !failed && <button type="button" aria-label={playing ? "Pause showreel" : "Play showreel"} onClick={async () => { const el = document.getElementById("portfolio-showreel") as HTMLVideoElement | null; if (!el) return; if (el.paused) { try { await el.play(); setPlaying(true); } catch { setFailed(true); } } else { el.pause(); setPlaying(false); } }} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d8b47d] text-black transition hover:scale-110">{playing ? <Pause /> : <Play />}</button>}
    </div>
  </div>;
}
function ProjectDialog({ project, close }: { project: Project; close: () => void }) {
  useEffect(() => { const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close(); }; document.addEventListener("keydown", fn); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; }; }, [close]);
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}><div role="dialog" aria-modal="true" aria-labelledby="project-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl"><div className="relative h-52 md:h-72"><Image src={project.image} alt={"Illustrative visual for " + project.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /><button autoFocus type="button" onClick={close} aria-label="Close project details" className="absolute right-4 top-4 rounded-full bg-black/80 p-3 text-white"><X /></button></div><div className="p-7 md:p-10"><p className="mb-3 text-xs uppercase tracking-widest text-[var(--accent)]">{project.category} / {project.status}</p><h3 id="project-title" className="font-serif text-4xl">{project.title}</h3><p className="mt-4 text-[var(--muted)]">{project.description}</p><ul className="mt-7 space-y-3">{project.details.map(d => <li key={d} className="border-l-2 border-[var(--accent)] pl-4 text-sm leading-7 text-[var(--muted)]">{d}</li>)}</ul></div></div></div>;
}
function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "", website: "" });
  const [error, setError] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (state.website) return;
    if (state.name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) || state.message.trim().length < 15) { setError("Please enter your name, a valid email and a message of at least 15 characters."); return; }
    setError(""); const subject = encodeURIComponent("Portfolio enquiry from " + state.name.trim()); const body = encodeURIComponent(state.message.trim() + "\n\nFrom: " + state.name.trim() + "\nEmail: " + state.email.trim()); window.location.href = "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
  }
  return <form onSubmit={submit} className="space-y-4" aria-label="Contact form"><input aria-label="Your name" required maxLength={100} placeholder="Your name" value={state.name} onChange={e => setState({ ...state, name: e.target.value })} className="form-input" /><input aria-label="Email address" required type="email" maxLength={200} placeholder="Email address" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} className="form-input" /><textarea aria-label="Your message" required minLength={15} maxLength={3000} rows={5} placeholder="Tell me about your idea..." value={state.message} onChange={e => setState({ ...state, message: e.target.value })} className="form-input resize-y" /><div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={state.website} onChange={e => setState({ ...state, website: e.target.value })}/></label></div>{error && <p role="alert" className="text-sm text-red-400">{error}</p>}<button type="submit" className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[#101010] transition hover:opacity-85">Prepare Email <Send size={17}/></button><p className="text-xs leading-5 text-[var(--muted)]">Opens your email app for review and sending. This website does not store or transmit your message.</p></form>;
}
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [light, setLight] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const parallax = useTransform(scrollYProgress, [0, 0.4], [0, 90]);
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  useEffect(() => { const saved = window.localStorage.getItem("baghel-theme"); setLight(saved === "light"); }, []);
  function toggleTheme() { setLight(v => { window.localStorage.setItem("baghel-theme", v ? "dark" : "light"); return !v; }); }
  return <div data-theme={light ? "light" : "dark"} className="site min-h-screen bg-[var(--bg)] text-[var(--fg)]">
    <CursorGlow />
    <motion.div aria-hidden="true" className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-[var(--accent)]" style={{ scaleX: progress }} />
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--nav)] backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10"><a href="#home" className="text-2xl font-black tracking-tighter">SB<span className="text-[var(--accent)]">.</span></a><nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">{["About", "Expertise", "Work", "Alliance", "Contact"].map(n => <a className="text-xs uppercase tracking-[.18em] text-[var(--muted)] transition hover:text-[var(--accent)]" href={"#" + n.toLowerCase()} key={n}>{n}</a>)}</nav><div className="flex items-center gap-3"><ThemeButton light={light} toggle={toggleTheme}/><MagneticLink href={profile.whatsapp} external className="hidden items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black sm:flex">Let's talk <ArrowUpRight size={15}/></MagneticLink><button type="button" className="rounded-full border border-[var(--line)] p-3 lg:hidden" onClick={() => setMenu(v => !v)} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu}>{menu ? <X size={18}/> : <Menu size={18}/>}</button></div></div>{menu && <nav aria-label="Mobile navigation" className="flex flex-col gap-5 border-t border-[var(--line)] bg-[var(--bg)] px-6 py-6 lg:hidden">{["About", "Expertise", "Work", "Alliance", "Contact"].map(n => <a key={n} href={"#" + n.toLowerCase()} onClick={() => setMenu(false)}>{n}</a>)}</nav>}</header>
    <main>
      <section id="home" className="relative isolate overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(216,180,125,.10),transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div className="relative z-10">
            <motion.p initial={reduce ? false : {opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.1}} className="mb-7 text-xs uppercase tracking-[.28em] text-[var(--accent)]">Creative thinking / Digital execution</motion.p>
            <h1 className="font-serif text-[clamp(3.7rem,8vw,8.3rem)] leading-[.89] tracking-[-.07em]">{["Shreyansh","Baghel."].map((word,i)=><motion.span key={word} initial={reduce ? false : {opacity:0,y:55}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.2+i*.17}} className={"block "+(i?"italic text-[var(--accent)]":"")}>{word}</motion.span>)}</h1>
            <motion.p initial={reduce ? false : {opacity:0}} animate={{opacity:1}} transition={{delay:.8}} className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">{profile.headline} Video editing, motion graphics, web technology and global client outreach.</motion.p>
            <motion.div initial={reduce ? false : {opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1}} className="mt-9 flex flex-wrap gap-4">
              <MagneticLink href="#work" className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[#101010]">Explore work <ArrowUpRight size={17}/></MagneticLink>
              <MagneticLink href="#contact" className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] px-7 py-4 font-semibold">Get in touch <ArrowRight size={17}/></MagneticLink>
            </motion.div>
            <p className="mt-10 text-xs uppercase tracking-[.18em] text-[var(--muted)]">Video editor <span className="mx-2 text-[var(--accent)]">✦</span> Creative professional <span className="mx-2 text-[var(--accent)]">✦</span> Digital outreach</p>
          </div>
          <motion.div initial={reduce ? false : {opacity:0,x:45}} animate={{opacity:1,x:0}} transition={{duration:.9,delay:.35}} className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-4 rounded-t-[230px] border border-[var(--accent)]/25" aria-hidden="true"/>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[210px] border border-[var(--accent)]/40 bg-[var(--panel)] shadow-2xl">
              <Image src="/portrait-placeholder.svg" alt="Placeholder silhouette for Shreyansh Baghel's portrait. Replace with an approved personal photo." fill priority sizes="(max-width: 1024px) 90vw, 470px" className="object-cover"/>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-7 pb-7 pt-20 text-xs uppercase tracking-[.2em] text-white">Shreyansh Baghel / Personal portfolio</div>
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-5 py-4 text-xs uppercase tracking-[.18em] text-[var(--accent)] shadow-lg">Create / Connect / Elevate</div>
          </motion.div>
        </div>
      </section>
      <Section id="about" className="section-wrap border-t border-[var(--line)]"><div className="grid gap-12 lg:grid-cols-2"><In><p className="eyebrow">01 / The person</p><h2 className="section-title">Creative mind.<br/><em className="text-[var(--accent)]">Global outlook.</em></h2></In><In className="flex flex-col justify-end gap-6 text-lg leading-relaxed text-[var(--muted)]"><p>{profile.about}</p><p>My approach brings together visual storytelling, curiosity for technology and thoughtful communication.</p><div className="border-t border-[var(--line)] pt-6 text-sm"><span className="text-[var(--accent)]">Currently pursuing</span> — German language</div></In></div></Section>
      <Section id="expertise" className="section-wrap bg-[var(--panel)]"><In><p className="eyebrow">02 / Tools & capabilities</p><h2 className="section-title mb-14">Craft meets <em className="text-[var(--accent)]">technology.</em></h2></In><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{skills.map(skill => <In key={skill.name}><motion.div whileHover={reduce ? undefined : { y: -7 }} className="group flex h-full min-h-56 flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-7 transition-colors hover:border-[var(--accent)]"><div className="flex justify-between"><span className="text-xs uppercase tracking-[.2em] text-[var(--accent)]">{skill.group}</span><span className="text-xs text-[var(--muted)]">{skill.index}</span></div><div><h3 className="font-serif text-3xl">{skill.name}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{skill.description}</p></div></motion.div></In>)}</div></Section>
      <Section className="section-wrap"><In><p className="eyebrow">03 / The moving image</p><h2 className="section-title mb-12">Stories worth <em className="text-[var(--accent)]">watching.</em></h2></In><In><Showreel /></In></Section>
      <Section id="work" className="section-wrap bg-[var(--panel)]"><In><p className="eyebrow">04 / Selected focus</p><h2 className="section-title mb-10">Work & <em className="text-[var(--accent)]">exploration.</em></h2></In><In><div role="group" aria-label="Filter portfolio projects" className="mb-10 flex flex-wrap gap-2">{categories.map(c => <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={"rounded-full border px-5 py-3 text-xs transition " + (filter === c ? "border-[var(--accent)] bg-[var(--accent)] text-[#101010]" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)]")}>{c}</button>)}</div></In><div className="grid gap-8 md:grid-cols-2">{filtered.map(p => <In key={p.id}><button type="button" onClick={() => setSelected(p)} className="group w-full text-left"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black"><Image src={p.image} alt={"Illustrative image for " + p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/><span className="absolute bottom-6 left-6 text-xs uppercase tracking-widest text-[#e8c38c]">{p.eyebrow}</span><span className="absolute right-6 top-6 rounded-full bg-black/70 p-3 text-white transition group-hover:bg-[#d8b47d] group-hover:text-black"><ArrowUpRight size={18}/></span></div><div className="flex items-start justify-between gap-3 py-6"><div><h3 className="font-serif text-3xl">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p></div><span className="shrink-0 text-xs text-[var(--accent)]">{p.category}</span></div></button></In>)}</div><In><p className="mt-8 text-sm text-[var(--muted)]">Visuals are illustrative placeholders. Approved client work and real project case studies can be added as they become available.</p></In></Section>
      <Section id="alliance" className="section-wrap"><div className="grid overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] lg:grid-cols-2"><In className="relative min-h-80"><Image src={visuals.alliance} alt="Illustrative team collaboration photograph" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></In><In className="flex flex-col justify-center p-9 md:p-14"><span className="mb-6 w-fit rounded-full border border-[var(--accent)] px-4 py-2 text-xs uppercase tracking-[.2em] text-[var(--accent)]">Team building / In development</span><p className="eyebrow">05 / Emerging initiative</p><h2 className="font-serif text-4xl md:text-6xl">The Billionaire <em className="text-[var(--accent)]">Alliance.</em></h2><p className="mt-7 leading-8 text-[var(--muted)]">An emerging collaborative initiative. The focus right now is on assembling the team and building a strong foundation. The project is not yet complete.</p></In></div></Section>
      <Section id="contact" className="section-wrap bg-[var(--panel)]"><div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]"><In><p className="eyebrow">06 / Let's connect</p><h2 className="section-title">Let's create <em className="text-[var(--accent)]">something.</em></h2><p className="mt-8 max-w-lg leading-8 text-[var(--muted)]">Have an idea, collaboration or project in mind? Reach out directly or prepare an email using the form.</p><a href={"mailto:" + profile.email} className="mt-9 inline-block break-all border-b border-[var(--accent)] pb-2 text-lg md:text-2xl">{profile.email} ↗</a><p className="mt-5 text-sm text-[var(--muted)]">{profile.phone}</p><div className="mt-9 flex flex-wrap gap-3"><a className="social" href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> WhatsApp</a><a className="social" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/> LinkedIn</a><a className="social" href={profile.x} target="_blank" rel="noopener noreferrer">X / Twitter ↗</a></div></In><In><ContactForm/></In></div></Section>
    </main>
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)] px-6 py-9 text-xs text-[var(--muted)] md:px-10"><span>© {new Date().getFullYear()} Shreyansh Baghel. All rights reserved.</span><a href="#home" className="hover:text-[var(--accent)]">Back to top ↑</a></footer>
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3"><a href={"mailto:" + profile.email} aria-label="Email Shreyansh" className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] shadow-xl transition hover:scale-110"><Mail size={19}/></a><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Shreyansh on WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"><MessageCircle size={25}/></a></div>
    {selected && <ProjectDialog project={selected} close={() => setSelected(null)}/>}
  </div>;
}