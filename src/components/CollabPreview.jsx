import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CollabPreview
 *
 * Props:
 * - initialUsers: array of { id, name, avatar } (optional)
 * - maxShown: how many avatars to visually show (default 4)
 * - simulate: boolean to enable random join/leave simulation (default true)
 *
 * Usage:
 * <CollabPreview simulate={true} />
 */
const SAMPLE_AVATARS = [
  { id: "u1", name: "Amina", avatar: "https://i.pravatar.cc/40?img=12" },
  { id: "u2", name: "Brian", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "u3", name: "Chen", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "u4", name: "Diana", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: "u5", name: "Eddie", avatar: "https://i.pravatar.cc/40?img=7" },
  { id: "u6", name: "Fatima", avatar: "https://i.pravatar.cc/40?img=14" },
];

export default function CollabPreview({
  initialUsers = SAMPLE_AVATARS.slice(0, 3),
  maxShown = 4,
  simulate = true,
}) {
  const [users, setUsers] = useState(initialUsers);

  // small helper to pick a random sample user from SAMPLE_AVATARS not currently in list
  const pickRandomNewUser = () => {
    const remaining = SAMPLE_AVATARS.filter((s) => !users.some((u) => u.id === s.id));
    if (remaining.length === 0) return null;
    return remaining[Math.floor(Math.random() * remaining.length)];
  };

  useEffect(() => {
    if (!simulate) return;

    const interval = setInterval(() => {
      // randomly join or leave
      const action = Math.random() > 0.5 ? "join" : "leave";

      setUsers((prev) => {
        if (action === "join") {
          const newUser = pickRandomNewUser();
          if (!newUser) return prev;
          // add to front
          return [newUser, ...prev].slice(0, 10);
        } else {
          // leave: remove random user if more than 1
          if (prev.length <= 1) return prev;
          const idx = Math.floor(Math.random() * prev.length);
          const copy = [...prev];
          copy.splice(idx, 1);
          return copy;
        }
      });
    }, 4000 + Math.random() * 3000); // every 4-7s

    return () => clearInterval(interval);
  }, [simulate, users]);

  return (
    <div className="flex items-center gap-3" aria-live="polite">
      {/* Avatars stack */}
      <div className="flex -space-x-2">
        <AnimatePresence>
          {users.slice(0, maxShown).map((u, i) => (
            <motion.img
              key={u.id}
              src={u.avatar}
              alt={u.name}
              title={u.name}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
              style={{ zIndex: users.length - i }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* "+N" indicator when more users */}
      <div className="text-sm sm:flex *:text-gray-600 dark:text-gray-300 flex items-center gap-2">
        <span className="font-medium">
          {users.length} online
        </span>

        {users.length > maxShown && (
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-200">
            +{users.length - maxShown}
          </span>
        )}
      </div>
    </div>
  );
}
