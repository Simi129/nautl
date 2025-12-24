'use client';

import { useState } from 'react';
import { Filter, Plus, MoreVertical, MoreHorizontal } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function PortfolioTab() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Design new landing page', priority: 'high' },
        { id: '2', title: 'Update documentation', priority: 'low' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '3', title: 'Implement authentication', priority: 'high' },
        { id: '4', title: 'Fix mobile responsiveness', priority: 'medium' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '5', title: 'Setup CI/CD pipeline', priority: 'medium' },
      ],
    },
  ]);

  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null);

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({ ...col, tasks: [...col.tasks] }));
      
      const sourceColumn = newColumns.find((col) => col.id === draggedTask.columnId);
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);

      if (sourceColumn && targetColumn) {
        const taskIndex = sourceColumn.tasks.findIndex((t) => t.id === draggedTask.task.id);
        if (taskIndex !== -1) {
          sourceColumn.tasks.splice(taskIndex, 1);
          targetColumn.tasks.push(draggedTask.task);
        }
      }

      return newColumns;
    });

    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-neutral-500';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-medium text-white">Project Dashboard</h1>
          <p className="text-xs text-neutral-500">Manage your tasks and workflow</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm text-white">
            <Filter size={16} />
            Filter
          </button>
          <button className="h-9 px-4 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-2 text-sm font-medium">
            <Plus size={16} />
            New Task
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="flex gap-6 h-full">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 flex flex-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-white">{column.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-xs">
                    {column.tasks.length}
                  </span>
                </div>
                <button className="text-neutral-500 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Tasks List */}
              <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 cursor-move hover:border-neutral-700 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-white flex-1">{task.title}</h4>
                      <button className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-white transition-opacity">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                      <span className="text-xs text-neutral-500 capitalize">{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Task Button */}
              <button className="mt-3 w-full h-9 rounded-lg border border-dashed border-neutral-700 hover:border-neutral-600 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-white">
                <Plus size={16} />
                Add Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}