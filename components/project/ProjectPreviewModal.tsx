"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '@/hooks/usePreviewModal';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectPreviewModal({ isOpen, project, onClose }: ProjectPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech'>('overview');

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window Sheet */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-3xl h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Control Tabs */}
          <div className="px-5 pt-2 bg-slate-900 border-b border-slate-800 flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 text-sm font-medium transition-all relative cursor-pointer ${
                activeTab === 'overview' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <motion.div layoutId="activeTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`pb-2 text-sm font-medium transition-all relative cursor-pointer ${
                activeTab === 'tech' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tech Stack Highlights
              {activeTab === 'tech' && (
                <motion.div layoutId="activeTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400" />
              )}
            </button>
          </div>

          {/* Content Pane Panel */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'overview' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1.5">Project Brief</h4>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl">
                      {project.description}
                    </p>
                  </div>
                  
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1.5">Core Features</h4>
                      <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
                        {project.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Embedded Live View Preview Frame */}
                <div className="w-full h-full min-h-[200px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative">
                  <iframe 
                    src={project.demo} 
                    title={project.title}
                    className="w-full h-full border-none opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Architecture Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.hooks && project.hooks.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">React Hooks Applied</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.hooks.map((hook, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono">
                          {hook}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Footer buttons */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-end gap-3">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              Source Code
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all shadow-lg shadow-indigo-600/10"
            >
              Live Session
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}