import { motion } from "framer-motion";
import Link from "next/link";

import { MessageIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <MessageIcon size={32} />
        </p>
        <div className="space-y-4 text-foreground/80">
          <p className="text-xl font-medium text-foreground">
            Probablemente esperabas que te diera una respuesta.
          </p>
          <p>
            No va a pasar.
          </p>
          <p>
            Esto es un ejercicio de duda. <br />
            Pregunta lo que quieras, pero no esperes certezas.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
