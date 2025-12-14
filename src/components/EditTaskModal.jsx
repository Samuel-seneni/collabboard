import React, { useState } from "react";
import { motion } from "framer-motion";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [data, setData] = useState(task);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        <input
          className="border p-3 w-full mb-3 rounded dark:bg-gray-700"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <textarea
          className="border p-3 w-full mb-3 rounded dark:bg-gray-700"
          value={data.description}
          rows="3"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <div className="flex justify-end gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onSave(data)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditTaskModal;
