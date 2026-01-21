"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    const sections = [
        {
            id: "intro",
            content: (
                <div className="flex flex-col justify-center h-full max-w-4xl p-12 space-y-8">
                    <h1 className="text-6xl md:text-8xl font-serif text-foreground leading-tight">
                        Estratégicamente creativos,
                        <span className="block text-muted-foreground">creativamente estratégicos.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl font-light">
                        Somos Sur.
                    </p>
                </div>
            ),
        },
        {
            id: "filosofia",
            content: (
                <div className="flex flex-col justify-center h-full max-w-3xl p-12 space-y-8 bg-muted/30 rounded-3xl mx-4">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                            <span className="w-3 h-3 bg-current rounded-full" />
                        </div>
                        <span className="uppercase tracking-widest text-sm font-medium">Filosofía</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-tight">
                        Nuestro propósito es apoyar a personas, sus proyectos y sus empresas, en la expresión de sus marcas al mercado.
                    </h2>
                </div>
            ),
        },
        {
            id: "proposito",
            content: (
                <div className="flex flex-col justify-center h-full max-w-2xl p-12 space-y-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-foreground">Trabajamos para personas</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Sus retos, siempre complejos, necesitan resolver la difícil ecuación de conseguir atención, generar atracción, alinear sistemas comerciales y fidelizar.
                            <br /><br />
                            No hay una dirección única. No existe un Norte como solución única. Su rumbo tiene dirección propia.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-foreground">Nos sumamos a su rumbo</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Comprender los retos y el rumbo de sus marcas. Ayudar a mejorar su definición. Apoyar en la generación de estrategias y soluciones creativas. Ese es nuestro objetivo.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "colectivo",
            content: (
                <div className="flex flex-col justify-center h-full max-w-3xl p-12 space-y-8">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                            <span className="w-3 h-3 bg-current rounded-full" />
                        </div>
                        <span className="uppercase tracking-widest text-sm font-medium">Colectivo</span>
                    </div>
                    <p className="text-3xl md:text-4xl font-light text-foreground leading-tight">
                        Nos definimos como un colectivo creativo de carácter multidisciplinar y abierto, organizado en divisiones especializadas.
                    </p>
                    <div className="p-6 border border-border rounded-xl bg-background/50 backdrop-blur-sm">
                        <p className="text-muted-foreground italic">
                            "Tratar cada situación con la humildad que requiere el ser consciente de que nuestros clientes saben mucho más de su negocio que nosotros."
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "marcas",
            content: (
                <div className="flex flex-row items-center h-full gap-6 px-12 overflow-visible">

                    {/* Intro Card */}
                    <div className="flex flex-col justify-center h-full min-w-[400px] max-w-[400px] space-y-6 mr-12">
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                                <span className="w-3 h-3 bg-current rounded-full" />
                            </div>
                            <span className="uppercase tracking-widest text-sm font-medium">Nuestras Marcas</span>
                        </div>
                        <h3 className="text-3xl font-serif text-foreground">
                            Sinergia y Especialización
                        </h3>
                        <p className="text-muted-foreground">
                            Como colectivo creativo, nuestra fortaleza reside en la diversidad y especialización de nuestras divisiones.
                        </p>
                    </div>

                    {/* Brand Cards */}
                    <BrandCard
                        title="Idearideas"
                        type="Diseño, desde 2000"
                        description="Estudio de diseño donde la creatividad se une a la funcionalidad. Branding, diseño gráfico, CGI, interiorismo y eventos."
                        link="https://idearideas.com/"
                    />
                    <BrandCard
                        title="Espacio Imaginario"
                        type="Atelier, desde 2008"
                        description="Fabricación de elementos de diseño y soluciones de comunicación de marca que capturan la imaginación."
                        link="https://espacioimaginario.es/"
                    />
                    <BrandCard
                        title="Eses"
                        type="Digital, desde 2021"
                        description="Agencia de marketing y digitalización. Estrategia y tecnología para propulsar marcas en el entorno digital."
                        link="https://eses.agency/"
                    />
                    <BrandCard
                        title="Futurea"
                        type="Tendencias, desde 2017"
                        description="Consultora de referencia en tendencias para el sector del hábitat. Estrategias innovadoras para competir hoy y en el futuro."
                        link="https://future-a.com/"
                    />
                    <BrandCard
                        title="Diariodesign"
                        type="Comunicando, desde 2014"
                        description="Ventana abierta al mundo del diseño, la arquitectura y el interiorismo. Calidad, rigor y nuevos talentos."
                        link="https://diariodesign.com/"
                    />
                </div>
            ),
            width: "w-auto"
        }
    ];

    return (
        <div className="h-[calc(100vh-64px)] md:h-screen w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth bg-background">
            {sections.map((section) => (
                <section
                    key={section.id}
                    className={`h-full flex-shrink-0 snap-start flex items-center ${section.width || "min-w-[100vw] md:min-w-[85vw]"
                        } border-r border-border/40 last:border-r-0`}
                >
                    {section.content}
                </section>
            ))}

            {/* Footer/Contact Slide */}
            <section className="h-full min-w-[100vw] md:min-w-[50vw] flex-shrink-0 snap-start flex flex-col items-center justify-center bg-foreground text-background p-12 text-center">
                <h2 className="text-5xl md:text-7xl font-serif mb-8">¿Hablamos?</h2>
                <p className="text-xl opacity-80 mb-12 max-w-lg">
                    Estamos listos para sumarnos a tu rumbo y potenciar tu marca.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
                    Volver al Chat <ArrowRight size={20} />
                </Link>
                <div className="mt-20 opacity-50 text-sm">
                    © {new Date().getFullYear()} Somos Sur. v2.2 ChatGPTú
                </div>
            </section>
        </div>
    );
}

function BrandCard({ title, type, description, link }: { title: string; type: string; description: string; link: string }) {
    return (
        <div className="flex flex-col justify-between w-[350px] h-[500px] bg-card border border-border p-8 rounded-2xl flex-shrink-0 hover:border-primary/50 transition-colors group">
            <div>
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{type}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
            <div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                >
                    Visitar sitio web <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
