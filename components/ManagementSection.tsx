
import React, { useState } from 'react';
import { MANAGEMENT_STEPS } from '../constants';
import { ManagementStep } from '../types';
import { InitiativeModal } from './InitiativeModal';

const StepCard: React.FC<{ step: ManagementStep; onOpen: () => void }> = ({ step, onOpen }) => (
  <div className="bg-[#1e3a4c]/40 backdrop-blur-md p-8 rounded-[30px] flex flex-col h-full border border-white/5 hover:border-white/20 transition-all">
    <div className="flex-grow">
      {step.icon}
      <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
      <p className="text-gray-300 mb-8 text-sm leading-relaxed">{step.description}</p>
      
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-bold text-2xl text-yellow-400">{step.stat1_val}</p>
          <p className="text-gray-400 text-xs uppercase tracking-widest">{step.stat1_desc}</p>
        </div>
        <div>
          <p className="font-bold text-2xl text-yellow-400">{step.stat2_val}</p>
          <p className="text-gray-400 text-xs uppercase tracking-widest">{step.stat2_desc}</p>
        </div>
      </div>
    </div>
    
    <button 
      onClick={onOpen}
      className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${step.buttonColor}`}
    >
      {step.buttonText}
    </button>
  </div>
);

export const ManagementSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12">
      <h3 className="text-3xl font-bold text-white mb-12">Управляем городом вместе</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MANAGEMENT_STEPS.map((step) => (
          <StepCard key={step.id} step={step} onOpen={() => setIsModalOpen(true)} />
        ))}
      </div>
      <InitiativeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
