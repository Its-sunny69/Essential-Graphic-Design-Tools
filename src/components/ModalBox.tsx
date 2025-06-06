import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  list?: string[];
}

export const ModalBox = ({
  isOpen,
  onClose,
  title,
  content,
  list,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-50 border max-w-xl w-full max-h-[40rem] sm:max-h-[35rem] m-6 p-6 rounded-xl shadow-xl overflow-auto">
        <div className="text-end">
          <button
            onClick={onClose}
            className="text-end rounded-md p-1 text-xl font-bold hover:bg-gray-200 scale-95 transition-all"
          >
            <X />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4 whitespace-pre-wrap">{content}</p>
        {list && (
          <ul className="list-disc pl-5 space-y-1">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
