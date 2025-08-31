"use client";

import React, { useMemo, useState } from "react";
import { ShoppingCart, Search, Filter, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PHONE_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP!;
const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;

const products = [
  { name: "Melatonina 10 mg", brand: "Natrol", presentation: "Frasco – Gomitas", price: 1260, category: "Gomitas", desc: "Apoya el inicio y la calidad del sueño. Fórmula libre de fármacos.", image: "/products/Melatonina10mg.jpg" },
  { name: "Melatonina 5 mg", brand: "Berkley and Jensen", presentation: "Frasco – Gomitas", price: 1250, category: "Gomitas", desc: "Ayuda a conciliar el sueño de forma natural.", image: "/products/Melatonina5mggomitas.jpg" },
  { name: "Hair, Skin & Nails (Gomitas)", brand: "Nature’s Bounty", presentation: "Frasco – Gomitas", price: 1320, category: "Gomitas", desc: "Biotina y vitaminas clave para cabello, piel y uñas.", image: "/products/HairSkinandNailsGomitas.jpg" },
  { name: "Vitamina C", brand: "Berkley and Jensen", presentation: "Frasco – Gomitas", price: 1000, category: "Gomitas", desc: "Antioxidante que apoya defensas y formación de colágeno.", image: "/products/VitaminaCgomitas.jpg" },
  { name: "Multivitaminas", brand: "Berkley and Jensen", presentation: "Frasco – Gomitas", price: 1250, category: "Gomitas", desc: "Fórmula completa para energía y bienestar diario.", image: "/products/Multivitaminasgomitas.jpg" },
  { name: "Vitamina D3 2000 UI", brand: "Berkley and Jensen", presentation: "Frasco – Gomitas", price: 1250, category: "Gomitas", desc: "Soporte de huesos, inmunidad y absorción de calcio.", image: "/products/VitaminaD3gomitas.jpg" },
  { name: "Elderberry 150 mg", brand: "Berkley and Jensen", presentation: "Frasco – Gomitas", price: 600, category: "Gomitas", desc: "Sauco con vitamina C y zinc para el sistema inmune.", image: "/products/ZincGomitas.jpg" },
  { name: "Cúrcuma + Gengibre", brand: "Nature’s Truth", presentation: "Frasco – Gomitas", price: 960, category: "Gomitas", desc: "Botánicos con apoyo antiinflamatorio y digestivo.", image: "/products/CurcumaGengibre.jpg" },
  { name: "Ashwagandha", brand: "Nature’s Truth", presentation: "Frasco – Gomitas", price: 960, category: "Gomitas", desc: "Adaptógeno que ayuda a manejar el estrés.", image: "/products/Ashwagandhagomitas.jpg" },
  { name: "Zinc 30 mg", brand: "Nature’s Truth", presentation: "Frasco – Gomitas", price: 950, category: "Gomitas", desc: "Mineral esencial para defensas y piel.", image: "/products/ZincGomitas.jpg" },
  { name: "Citrato de Magnesio 200 mg", brand: "Nature Made", presentation: "Frasco – Gomitas", price: 850, category: "Gomitas", desc: "Magnesio de alta absorción para músculos y descanso.", image: "/products/CitratodeMagnesiogomitas.jpg" },
  { name: "Super Colágeno", brand: "Neocell", presentation: "Frasco – Tabletas", price: 1700, category: "Tabletas", desc: "Colágeno tipos 1 y 3 con vitamina C para piel y articulaciones.", image: "/products/Collagen.jpg" },
  { name: "Ultra Q10", brand: "Qunol", presentation: "Frasco – Softgels", price: 1560, category: "Softgels", desc: "CoQ10 de alta absorción para energía celular y corazón.", image: "/products/CoQ10.jpg" },
  { name: "Omega 3", brand: "Alaska", presentation: "Frasco – Softgels", price: 1080, category: "Softgels", desc: "EPA/DHA para corazón y cerebro.", image: "/products/Omega3Alaska.jpg" },
  { name: "Estroven Menopause Relief", brand: "Estroven", presentation: "Caja – Tabletas", price: 1600, category: "Tabletas", desc: "Apoyo natural para bochornos y sueño en menopausia.", image: "/products/EstrovenMenopausia.jpg" },
  { name: "Benadryl Allergy", brand: "Benadryl", presentation: "Caja – Tabletas", price: 480, category: "Tabletas", desc: "Antihistamínico para estornudos y picazón.", image: "/products/Benadryl.jpg" },
  { name: "Advil PM", brand: "Advil", presentation: "Caja – Tabletas", price: 1000, category: "Tabletas", desc: "Analgésico nocturno con ayuda para dormir.", image: "/products/AdvilPM.jpg" },
  { name: "Advil Adulto", brand: "Advil", presentation: "Frasco – Tabletas", price: 1400, category: "Tabletas", desc: "Ibuprofeno para dolor y fiebre.", image: "/products/AdvilAdultos.jpg" },
  { name: "Hair, Skin & Nails (Softgel)", brand: "Nature’s Bounty", presentation: "Frasco – Softgel", price: 1250, category: "Softgels", desc: "Biotina y vitaminas clave para cabello, piel y uñas.", image: "/products/HairSkinandNailsSoftgel.jpg" },
  { name: "Gas Relief Simeticona 120 mg", brand: "Berkley and Jensen", presentation: "Caja – Softgels", price: 600, category: "Softgels", desc: "Rápido alivio de la angustia digestiva tanto en el estómago como en los intestinos.", image: "/products/GasRelief.jpg" },
  { name: "Antiacido", brand: "Berkley and Jensen", presentation: "Frasco – Tabletas", price: 800, category: "Tabletas", desc: " Alivio rápido de la acidez, la indigestión y el malestar estomacal.", image: "/products/Antiacid.jpg" },
]; 

const categories = ["Todas", "Gomitas", "Softgels", "Tabletas"] as const;

function currency(c: number) {
  return `C$ ${new Intl.NumberFormat("es-NI").format(c)}`;
}

export default function VitalImportsSite() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof categories[number]>("Todas");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const okCat = cat === "Todas" || p.category === cat;
      const okQ = [p.name, p.brand, p.presentation].join(" ").toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [q, cat]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Vital Imports Nicaragua" className="h-16 w-auto rounded-md bg-white"/>
            <div>
              <div className="font-bold leading-tight">Vital Imports Nicaragua</div>
              <div className="text-xs text-slate-600">Más vida, mejor salud</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {categories.map((c) => (
  <Button
    key={c}
    variant={cat === c ? "default" : "outline"}
    onClick={() => setCat(c)}
    className={
      "rounded-full " +
      (cat === c ? "bg-sky-800 hover:bg-sky-700 text-white" : "border-slate-300")
    }
  >
    {c}
  </Button>
))}

          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Suplementos premium importados de EE.UU.</h1>
            <p className="mt-3 text-slate-700 max-w-xl">Más cantidad, mejores precios y marcas de confianza. Venta al detalle y a farmacias.</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Marcas norteamericanas</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Presentaciones grandes (ahorro por unidad)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600"/> Pedidos por WhatsApp y entrega local</li>
            </ul>
          </div>
          <div className="rounded-3xl border p-4 bg-white shadow-sm">
            <div className="flex items-center gap-2 p-2 border rounded-2xl">
              <Search className="w-4 h-4"/>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto o marca…" className="w-full bg-transparent outline-none text-sm"/>
              <div className="md:hidden"><Filter className="w-4 h-4"/></div>
            </div>
            <div className="mt-3 flex gap-2 md:hidden">
              {categories.map((c) => (
                <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)} className="rounded-full">
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <Card className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-200 transition" key={p.name + i}>
               {/* 👇👇  IMAGEN DEL PRODUCTO  👇👇 */}
  <div className="px-4 pt-4">
    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white relative">
      <img
        src={p.image}          // ← usa la ruta que pusiste en el array
        alt={p.name}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{p.name}</CardTitle>
                <div className="text-sm text-gray-600">{p.brand}</div>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="text-sm"><span className="font-medium">Presentación:</span> {p.presentation}</div>
                <div className="text-sm text-slate-700">{p.desc}</div>
                <div className="text-xl font-bold">{currency(p.price)}</div>
                <div className="flex items-center gap-2">
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
>
  <a href={`https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent("Hola, me interesa " + p.name + " (" + p.brand + "). ¿Está disponible?")}`} target="_blank" rel="noreferrer">
    <ShoppingCart className="w-4 h-4 mr-2" /> Solicitar por WhatsApp
  </a>
</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Botón flotante de WhatsApp */}
<a
  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent("Hola, me interesa su catálogo 😄")}`}
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 shadow-lg"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.37 0 .02 5.35.02 11.95c0 2.11.55 4.17 1.61 5.98L0 24l6.28-1.64a11.93 11.93 0 005.72 1.46h.01c6.63 0 12-5.35 12-11.95 0-3.19-1.24-6.19-3.49-8.39zM12 21.5c-1.82 0-3.6-.48-5.16-1.38l-.37-.22-3.73.97 1-3.64-.24-.37A9.51 9.51 0 012.5 12c0-5.25 4.26-9.5 9.5-9.5 2.54 0 4.93.99 6.73 2.78A9.45 9.45 0 0121.5 12c0 5.25-4.26 9.5-9.5 9.5zm5.09-7.37c-.28-.14-1.65-.82-1.91-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.35s-.97.95-.97 2.3.99 2.67 1.13 2.86c.14.19 1.94 2.97 4.71 4.17.66.29 1.17.46 1.57.59.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.26-.18-.54-.32z"/>
  </svg>
  <span className="font-medium">WhatsApp</span>
</a>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-bold">Vital Imports Nicaragua</div>
            <div className="text-slate-600">Más vida, mejor salud</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Contacto</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> <a href={`https://wa.me/${PHONE_WHATSAPP}`} target="_blank" rel="noreferrer">{PHONE_WHATSAPP}</a></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Diriamba, Carazo, Nicaragua</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Aviso</div>
            <p className="text-slate-600">Los suplementos no sustituyen una dieta balanceada. Consulte a su médico en caso de embarazo, lactancia o condiciones médicas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
