import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const TaskForm = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
    important: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      completed: false,
      important: false,
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-black/50"
        aria-hidden="true"
      />

      {/* Dialog positioning */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 w-full shadow-xl 
                               border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-xl font-semibold">
              {t("create_task")}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                       text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                {t("title")}
              </label>
              <input
                type="text"
                name="title"
                placeholder={t("task_title_placeholder")}
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
                         focus:border-transparent outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                {t("description")}
              </label>
              <textarea
                name="description"
                placeholder={t("task_description_placeholder")}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
                         focus:border-transparent outline-none transition-colors
                         min-h-[100px] resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                {t("date")}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
                         focus:border-transparent outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 
                           text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400
                           transition-colors"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("mark_as_completed")}
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="important"
                  checked={formData.important}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 
                           text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-400
                           transition-colors"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("mark_as_important")}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 
                       dark:hover:bg-purple-600 text-white font-medium py-2.5 px-4 
                       rounded-lg transition-colors duration-200 shadow-sm"
            >
              {t("create_task")}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TaskForm;
