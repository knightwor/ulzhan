import { FileText, X } from 'lucide-react'
import React from 'react'

export default function FileInfo({
    file,
    action
}: { file: File, action: (val: File | null) => void; }) {
  return (
    <div className="text-sm text-cc-primery/50 flex items-center gap-2">
          <FileText size={18} strokeWidth={2} /> {file.name} ({(file.size / 1024).toFixed(1)} KB)
          <button
            onClick={() => action(null)}
            className="text-red-400 hover:text-red-300 cursor-pointer"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
  )
}
