import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Tasks', getCount: (tasks) => tasks.length },
    { id: 'todo', label: 'To do', getCount: (tasks) => tasks.filter(t => !t.completed).length },
    { id: 'progress', label: 'In Progress', getCount: (tasks) => tasks.filter(t => !t.completed && t.important).length },
    { id: 'completed', label: 'Completed', getCount: (tasks) => tasks.filter(t => t.completed).length }
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        
        const transformedTasks = data.todos.map(todo => ({
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

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !tasks.find(task => task.id === taskId).completed
        })
      });
      
      if (response.ok) {
        setTasks(tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: !task.completed }
            : task
        ));
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        })
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
        return tasks.filter(task => !task.completed);
      case 'progress':
        return tasks.filter(task => !task.completed && task.important);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className={`flex min-h-screen ${
      darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      {/* Sidebar */}
      <aside className="w-16 bg-gray-200 dark:bg-gray-800 flex flex-col items-center py-8 shadow-lg">
        <div className="w-8 h-8 bg-purple-600 rounded-lg mb-8"></div>
        <nav className="flex flex-col items-center space-y-6">
          <button className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <HomeIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <ClipboardDocumentListIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Website Design</h1>
              <span className="text-sm text-gray-500">From July 23</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 mb-8">
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
                <span className="ml-2 text-xs">
                  {tab.getCount(tasks)}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 dark:text-gray-400">Loading tasks...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500">{error}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              <div 
                onClick={() => setIsTaskModalOpen(true)}
                className="w-full h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <PlusIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">Add New Task</span>
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
}

export default Dashboard;