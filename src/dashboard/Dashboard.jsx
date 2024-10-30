import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home,
  ClipboardList,
  Settings,
  Plus,
  Sun,
  Moon
} from 'lucide-react';

import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [currentLang, setCurrentLang] = useState('en');

  const { t, i18n } = useTranslation();

  const tabs = [
    { id: 'all', label: t('all_tasks'), getCount: (tasks) => tasks.length },
    {
      id: 'todo',
      label: t('to_do'),
      getCount: (tasks) => tasks.filter((t) => !t.completed).length,
    },
    {
      id: 'progress',
      label: t('in_progress'),
      getCount: (tasks) => tasks.filter((t) => !t.completed && t.important).length,
    },
    {
      id: 'completed',
      label: t('completed'),
      getCount: (tasks) => tasks.filter((t) => t.completed).length,
    },
  ];

  useEffect(() => {
    // Check system preference and stored theme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    setDarkMode(storedTheme === 'dark' || (!storedTheme && isDark));
    
    // Apply theme
    document.documentElement.classList.toggle('dark', darkMode);
    
    // Load stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
      setCurrentLang(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, [darkMode, i18n]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();

        const transformedTasks = data.todos.map((todo) => ({
          id: todo.id,
          title: todo.todo,
          description: `Task ID: ${todo.id} - User ID: ${todo.userId}`,
          date: new Date().toISOString().split('T')[0],
          completed: todo.completed,
          important: Math.random() < 0.3,
        }));

        setTasks(transformedTasks);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load tasks');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      setCurrentLang(lang);
      localStorage.setItem('preferredLanguage', lang);
    });
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !tasks.find((task) => task.id === taskId).completed,
        }),
      });

      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: taskData.title,
          completed: false,
          userId: 1,
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        const transformedTask = {
          id: newTask.id,
          title: newTask.todo,
          description: taskData.description || `Task ID: ${newTask.id} - User ID: ${newTask.userId}`,
          date: taskData.date || new Date().toISOString().split('T')[0],
          completed: newTask.completed,
          important: taskData.important || false,
        };

        setTasks([transformedTask, ...tasks]);
        setIsTaskModalOpen(false);
      }
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'todo':
        return tasks.filter((task) => !task.completed);
      case 'progress':
        return tasks.filter((task) => !task.completed && task.important);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className="w-16 bg-white dark:bg-gray-800 flex flex-col items-center py-8 shadow-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg mb-8" />
        <nav className="flex flex-col items-center space-y-6">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300">
            <Home className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300">
            <ClipboardList className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300">
            <Settings className="w-5 h-5" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {t('website_design')}
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('from_date')}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentLang === 'en'
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('fr')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentLang === 'fr'
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  FR
                </button>
              </div>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                         dark:hover:bg-gray-600 transition-colors duration-200 
                         text-gray-600 dark:text-gray-300 hover:text-purple-600 
                         dark:hover:text-purple-400"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              {/* Add Task Button */}
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg 
                         bg-purple-600 hover:bg-purple-700 text-white
                         transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">{t('add_new_task')}</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-sm font-medium relative ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs">{tab.getCount(tasks)}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 dark:text-gray-400">{t('loading_tasks')}</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">{error}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              <div
                onClick={() => setIsTaskModalOpen(true)}
                className="w-full h-[200px] border-2 border-dashed border-gray-300 
                         dark:border-gray-600 rounded-lg flex flex-col items-center 
                         justify-center bg-white dark:bg-gray-800 
                         hover:bg-gray-50 dark:hover:bg-gray-700 
                         transition-colors cursor-pointer"
              >
                <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t('add_new_task')}
                </span>
              </div>

              {getFilteredTasks().map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <TaskForm
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;