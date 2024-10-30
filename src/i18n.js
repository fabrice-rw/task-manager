// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "website_design": "Website Design",
        "from_date": "From July 23",
        "all_tasks": "All Tasks",
        "to_do": "To Do",
        "in_progress": "In Progress",
        "completed": "Completed",
        "loading_tasks": "Loading tasks...",
        "add_new_task": "Add New Task",
        "task_error": "Failed to load tasks",
        "important": "Important", 
        "status": "Status",
        "create_task": "Create Task",
        "title": "Title",
        "description": "Description",
        "date": "Date",
        "task_title_placeholder": "Enter task title",
        "task_description_placeholder": "Enter task description",
        "mark_as_completed": "Mark as completed",
        "mark_as_important": "Mark as important"
      }
    },
    fr: {
      translation: {
        "website_design": "Conception de site web",
        "from_date": "À partir du 23 juillet",
        "all_tasks": "Toutes les tâches",
        "to_do": "À faire",
        "in_progress": "En cours",
        "completed": "Terminées",
        "loading_tasks": "Chargement des tâches...",
        "add_new_task": "Ajouter une nouvelle tâche",
        "task_error": "Échec du chargement des tâches",
        "important": "Important", 
        "status": "Statut",
        "create_task": "Créer une tâche",
        "title": "Titre",
        "description": "Description",
        "date": "Date",
        "task_title_placeholder": "Entrez le titre de la tâche",
        "task_description_placeholder": "Entrez la description de la tâche",
        "mark_as_completed": "Marquer comme terminée",
        "mark_as_important": "Marquer comme importante" 
      }
    }
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
