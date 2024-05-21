'use client';
import React from 'react';
import { useState } from 'react';
import PartnerContent from './PartnerContent';
import ProjectContent from './ProjectContent';

export default function Collaboration() {
  const [selectedTab, setSelectedTab] = useState<'partner' | 'project'>(
    'partner',
  );

  return (
    <div className="px-[12.5rem] flex justify-center pt-[1.25rem] pb-[1.19rem]">
      <div className="bg-blue-50 w-[90rem] rounded-2xl p-[2rem]">
        {/* 토글버튼 */}
        <div className="flex justify-between font-bold">
          <div>강남점 외 (5) ⌄</div>
          <nav className="bg-[rgba(118,118,128,0.12)] rounded-lg p-[0.12rem]">
            <button
              className={`px-4 py-2 ${
                selectedTab === 'partner'
                  ? 'bg-white rounded-lg shadow'
                  : 'bg-blue'
              }`}
              onClick={() => setSelectedTab('partner')}
            >
              파트너
            </button>
            <button
              className={`px-4 py-2 ${
                selectedTab === 'project'
                  ? 'bg-white rounded-lg shadow'
                  : 'bg-blue'
              }`}
              onClick={() => setSelectedTab('project')}
            >
              프로젝트
            </button>
          </nav>
        </div>
        <div>
          {selectedTab === 'partner' ? <PartnerContent /> : <ProjectContent />}
        </div>
      </div>
    </div>
  );
}
