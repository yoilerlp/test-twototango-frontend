import { cn } from '@/helpers/styles';
import { TaskStatus } from '@/interfaces/task';
import React from 'react';

const tabsList: {
  label: string;
  value: TaskStatus;
}[] = [
  {
    label: 'Pendientes',
    value: TaskStatus.PENDING,
  },
  {
    label: 'En proceso',
    value: TaskStatus.IN_PROGRESS,
  },
  {
    label: 'Completadas',
    value: TaskStatus.COMPLETED,
  },
];

type TabsProps = {
  currentTab: TaskStatus;
  setCurrentTab: (tab: TaskStatus) => void;
};

export default function TaskTabs({ currentTab, setCurrentTab }: TabsProps) {
  return (
    <div role='tablist' className='tabs tabs-boxed'>
      {tabsList.map((tab) => (
        <a
          role='tab'
          className={cn('tab ', {
            'tab-active !text-white': tab.value === currentTab,
          })}
          key={tab.value}
          onClick={() => setCurrentTab(tab.value)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
}

