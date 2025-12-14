import React from "react";
import { motion } from "framer-motion";

const DeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg"
      >
        <h3 className="text-lg font-bold">Delete Task?</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeletePopup;
