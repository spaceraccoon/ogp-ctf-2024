"use client";

import { motion } from "framer-motion";

export const PhotoView = ({
  b64Data,
  fileName,
}: {
  b64Data: string;
  fileName: string;
}) => {  return (
    <div className="md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <motion.div
              className="h-28 w-52 dark:bg-zinc-800 bg-zinc-100 rounded-lg flex flex-col justify-end p-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                objectFit: "cover",
                borderRadius: "0.5rem",
                background: `url(data:image/jpeg;base64,${b64Data}) no-repeat center center / cover`,
              }}
            >
              <div className="text-xs px-1 py-0.5 bg-white text-zinc-900 w-fit rounded-md">
                {fileName}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
