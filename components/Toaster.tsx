import React from "react";
import { motion } from "framer-motion";

const Toaster = () => {
  return (
    <motion.div
      className="text-white capitalize absolute top-16 rounded-md py-2 px-5 bg-red-600 font-semibold"
      initial={{ opacity: 0, y: -50 }} // Start from above and hidden
      animate={{ opacity: 1, y: 0 }} // Animate to visible and normal position
      exit={{ opacity: 0, y: -50 }} // Exit by moving above and fading out
      transition={{ duration: 0.3 }} // Control animation speed
    >
      Please sign-in first
    </motion.div>
  );
};

export default Toaster;
