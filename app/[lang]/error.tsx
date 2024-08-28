"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <AlertCircle className="w-24 h-24 mx-auto text-destructive" />
        </motion.div>
        <h1 className="mt-8 text-4xl font-bold">Oops! Something went wrong</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          {`We're sorry, but we couldn't find the page you were looking for.`}
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="text-white"
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
