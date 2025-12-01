import { motion } from 'framer-motion';
import { FileText, Trash2 } from 'lucide-react'

export default function FileInfo({
  file,
  action
}: { file: File, action: (val: File | null) => void; }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      exit={{ opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100
      }}
      className="px-2.5 py-2.5 rounded-[20px] bg-cc-primery font-semibold text-cc-background border-[3px] border-cc-background w-[600px] outline-none max-[600px]:w-full text-[1.5rem] flex justify-between items-center gap-5">

      <span className="bg-cc-primery border-[3px] border-cc-background text-cc-background shrink-0 rounded-[10px] w-10 h-10 flex items-center justify-center">
        <FileText size={24} strokeWidth={2.5} />
      </span>

      <span className='px-1 text-cc-background italic font-semibold underline text-ellipsis overflow-hidden whitespace-nowrap'>
        {file.name} ({(file.size / 1024).toFixed(1)} KB)
      </span>

      <button
        onClick={() => action(null)}
        className="bg-red-200 border-[3px] border-cc-background text-cc-background rounded-[10px] w-10 h-10 shrink-0 flex items-center justify-center hover:bg-red-400 hover:text-cc-primery transition-colors duration-300"
      >
        <Trash2 size={22} strokeWidth={2.3} />
      </button>

    </motion.div>
  )
}
