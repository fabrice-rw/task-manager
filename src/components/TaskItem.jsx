import { useState } from 'react';
import { CalendarIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const TaskItem = ({ task, onToggleComplete }) => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`w-full h-[200px] rounded-lg p-4 shadow-md hover:shadow-lg transition-all relative
        ${task.completed 
          ? 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-700 border border-transparent'
        }
        ${task.important ? 'border-l-4 border-l-amber-400 dark:border-l-amber-500' : ''} 
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex flex-col">
        {/* Task Content */}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold truncate mb-2
            ${task.completed ? 'text-gray-500 dark:text-gray-400' : ''}`}>
            {task.title}
            {task.important && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                {isHovered ? (
                  <StarIconSolid className="w-3 h-3" />
                ) : (
                  <StarIcon className="w-3 h-3" />
                )}
                {t('important')} {/* Translate 'Important' */}
              </span>
            )}
          </h3>
          <p className={`text-sm overflow-hidden line-clamp-3
            ${task.completed 
              ? 'text-gray-400 dark:text-gray-500' 
              : 'text-gray-600 dark:text-gray-300'
            }`}>
            {task.description}
          </p>
        </div>

        {/* Status and Date Footer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600 dark:text-gray-300">{t('status')}</label> {/* Translate 'Status' */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.completed ? t('completed') : t('in_progress')} {/* Translate status */}
              </span>
              <button 
                onClick={() => onToggleComplete(task.id)}
                className={`p-1 rounded-full transition-colors
                  ${task.completed 
                    ? 'text-green-600 bg-green-100 hover:bg-green-200 dark:text-green-400 dark:bg-green-900/30 dark:hover:bg-green-900/50' 
                    : 'text-gray-400 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
                  }`}
              >
                {task.completed ? (
                  <CheckCircleIconSolid className="w-5 h-5" />
                ) : (
                  <CheckCircleIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {task.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
