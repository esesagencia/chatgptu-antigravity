"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface MejoraModalProps {
    isOpen: boolean;
    onContinue: () => void;
}

export function MejoraModal({ isOpen, onContinue }: MejoraModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* @ts-expect-error AnimatePresence type mismatch with standard React types */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    // No onClick to close - forced decision
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[500px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-8 md:p-10 text-center space-y-6">

                            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight">
                                Has llegado lejos con estas preguntas.
                            </h2>

                            <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                                <p>
                                    Pero quizás el próximo paso no está en este chat, sino en <span className="text-white font-medium">mejorar tu plan</span> de otra forma.
                                </p>
                                <p>
                                    No el plan que te venden las herramientas.
                                </p>
                                <p className="text-white font-medium text-xl">
                                    Tu propio plan.
                                </p>
                            </div>

                            <div className="pt-4 space-y-3">
                                {/* Primary Action */}
                                <button
                                    onClick={() => window.open('https://somossur.es/mejora-tu-plan', '_blank')}
                                    className="w-full group relative flex items-center justify-center gap-3 bg-[#1e3fff] hover:bg-[#1e3fff]/90 text-white px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <div className="text-left">
                                        <div className="text-sm font-medium opacity-90">Descubre por qué existe esto</div>
                                        <div className="text-lg font-bold flex items-center gap-2">
                                            somossur.es/mejora-tu-plan
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </button>

                                {/* Secondary Action */}
                                <button
                                    onClick={onContinue}
                                    className="w-full py-3 text-white/60 hover:text-white text-sm font-medium transition-colors"
                                    aria-label="Cerrar modal y continuar conversando"
                                >
                                    Continuar conversando
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
