import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ACCENT = "#F08F23";

const sections = [
  { title: "1. The Beginning of the Trail", body: "It started with a sound — the soft crunch of footsteps on gravel, a rhythm that seemed to echo a heartbeat. The evening sun dipped low, painting the sky with amber and rose. In that fading light, Ethan took his first step toward the unknown, guided only by curiosity and the faint scent of cedar in the air." },
  { title: "2. The Whispering Forest", body: "As he entered the woods, silence wrapped around him like a velvet cloak. The trees seemed alive, whispering secrets in a language older than time. Each rustle of leaves carried a story, each gust of wind felt like a warning or a welcome. Ethan couldn’t tell which — and that made it all the more thrilling." },
  { title: "3. The Hidden Symbol", body: "Halfway through the forest, he found it — a small, carved mark on an ancient oak. It wasn’t random. It looked deliberate, like someone had left a message only the right eyes could see. He traced the lines with his fingers, feeling a strange pulse beneath the bark, as if the tree itself remembered who had carved it." },
  { title: "4. The Stranger by the River", body: "When the path opened to a river, he wasn’t alone. A figure stood across the water, cloaked in shadow but somehow familiar. The stranger didn’t speak — only nodded once, before disappearing behind the mist. Ethan felt a spark of recognition, though he couldn’t explain why. The moment lingered like a dream he couldn’t wake from." },
  { title: "5. The Fire and the Memory", body: "That night, Ethan built a small fire. The flames danced wildly, throwing sparks that looked like stars escaping gravity. As he watched, memories he didn’t know he had began to surface — laughter, loss, promises made under starlight. It was as if the fire was burning through time itself, revealing what had always been hidden." },
  { title: "6. The Door of Light", body: "At dawn, he reached a clearing. There stood an arch of stone covered in moss, glowing faintly with light from within. It wasn’t just a doorway — it was an invitation. He hesitated for a heartbeat, then stepped through. The air shimmered, and the world on the other side felt both new and ancient, strange yet utterly right." },
  { title: "7. The Return", body: "When Ethan finally emerged, the forest was gone. Or maybe, it had never existed outside his mind. He carried with him no proof — only a calm certainty that something within him had changed. The trail had not led him away from himself, but back to where he had always belonged." },
];

export default function HachikoVIPStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', contact: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionsList = Array.from(document.querySelectorAll("section[id]"));
      if (!sectionsList.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let minDistance = Infinity;

      sectionsList.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased relative">
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden z-0">
        <img
          src="HEAD.PNG"
          alt="Header"
          className="w-full h-full object-cover"
          style={{ maskImage: "linear-gradient(to bottom, black 70%, transparent)" }}
        />
      </div>

      <header className="fixed top-6 left-6 right-6 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="LOGO.PNG" alt="Logo" className="w-12 h-12 rounded-full border border-white/10 object-cover" />
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Hello</p>
            <h1 className="text-sm md:text-base font-semibold tracking-tight">WE’RE HONORED TO WELCOME YOU</h1>
            <p className="text-xs md:text-sm font-medium" style={{ color: ACCENT }}>TO THE HACHIKO VIP CLUB</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {[...sections, { title: 'Contact' }].map((s, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i === sections.length ? '#contact' : `#section-${i}`)}
              className={`text-sm transition-all duration-300 ${activeIndex === i ? 'text-white scale-125' : 'text-white/50 hover:text-white'}`}
            >
              {i === sections.length ? '★' : i + 1}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ scrollBehavior: 'smooth' }} className="h-screen overflow-y-scroll snap-y snap-mandatory relative z-10">
        {sections.map((s, i) => (
          <section id={`section-${i}`} key={s.title} className="h-screen snap-center flex items-center justify-center px-6 md:px-24">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="max-w-4xl text-center"
            >
              <h2 className="text-2xl md:text-4xl font-extrabold mb-6" style={{ color: ACCENT }}>{s.title}</h2>
              <p className={`text-base md:text-lg leading-relaxed ${activeIndex === i ? 'text-white' : 'text-white/70'}`}>{s.body}</p>
              <div className="mt-8 h-0.5 w-28 mx-auto rounded-full transition-all duration-700" style={{ background: activeIndex === i ? `linear-gradient(90deg, ${ACCENT}, rgba(255,255,255,0.06))` : 'rgba(255,255,255,0.06)' }} />
            </motion.article>
          </section>
        ))}

        <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24 snap-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: 'easeInOut' }} className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: ACCENT }}>Join the Trail</h2>
            {submitted ? (
              <p className="text-center text-green-400">Thank you! We’ll contact you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Name" required className="p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input type="tel" placeholder="Phone Number" required className="p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <select required className="p-3 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })}>
                  <option value="" disabled>Preferred Contact Method</option>
                  <option value="call">Call</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                <textarea placeholder="Notes" className="p-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none" rows="4" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                <button type="submit" className="mt-4 bg-[var(--accent)] py-3 rounded-lg font-semibold" style={{ backgroundColor: ACCENT }}>Submit</button>
              </form>
            )}
          </motion.div>
        </section>
      </main>

      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
        {[...sections, { title: 'Contact' }].map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx === sections.length ? '#contact' : `#section-${idx}`)}
            className={`w-3 h-3 rounded-full border border-white/10 backdrop-blur-sm hover:scale-110 transition-transform ${activeIndex === idx ? 'bg-[var(--accent)] scale-125' : 'bg-white/20'}`}
            style={activeIndex === idx ? { backgroundColor: ACCENT } : {}}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </aside>
    </div>
  );
}
