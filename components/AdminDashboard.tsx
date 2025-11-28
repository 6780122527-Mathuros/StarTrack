import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { EmotionStat } from '../types';
import { BarChart3, PieChart as PieIcon, GraduationCap, Briefcase } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock Data Students
  const studentEmotionData: EmotionStat[] = [
    { name: 'Happy', value: 40, color: '#b1e5e0' },
    { name: 'Neutral', value: 25, color: '#ffe780' },
    { name: 'Sad', value: 15, color: '#a651b1' },
    { name: 'Anxious', value: 10, color: '#ffd7ef' },
    { name: 'Excited', value: 10, color: '#bfffa5' },
  ];

  // Mock Data Teachers
  const teacherEmotionData = [
    { name: 'Happy', value: 18, color: '#b1e5e0' },
    { name: 'Neutral', value: 12, color: '#ffe780' },
    { name: 'Tired', value: 5, color: '#a651b1' },
    { name: 'Excited', value: 14, color: '#bfffa5' },
    { name: 'Stressed', value: 6, color: '#ffd7ef' },
  ];

  const activityData = [
    { name: 'Mon', entries: 12 },
    { name: 'Tue', entries: 19 },
    { name: 'Wed', entries: 15 },
    { name: 'Thu', entries: 22 },
    { name: 'Fri', entries: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] mb-[2em] shadow-[0_1px_18px_#e7e1fa60]">
        <h2 className="text-[#a645ae] text-2xl font-bold mt-0 letter-spacing-[.03em] mb-1">แผงควบคุมผู้บริหาร 🏫</h2>
        <p className="text-[#7193a6]">ภาพรวมสุขภาพจิตทั้งโรงเรียน</p>
      </div>

      {/* Row 1: Emotion Distribution (Student vs Teacher) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Emotion */}
        <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60] flex flex-col items-center">
          <h3 className="text-[#7193a6] text-lg font-bold mb-2 w-full flex items-center gap-2">
            <GraduationCap className="text-[#a651b1]" /> สัดส่วนอารมณ์นักเรียน
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentEmotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studentEmotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">นักเรียนส่วนใหญ่มีความสุขและผ่อนคลาย</p>
        </div>

        {/* Teacher Emotion */}
        <div className="bg-[#fffefe] border border-[#d3ecfd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60] flex flex-col items-center">
          <h3 className="text-[#7193a6] text-lg font-bold mb-2 w-full flex items-center gap-2">
            <Briefcase className="text-[#2c7a7b]" /> สถิติอารมณ์คุณครู
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teacherEmotionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={70} tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {teacherEmotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">คุณครูมีความกระตือรือร้นสูงในการสอน</p>
        </div>
      </div>

      {/* Row 2: Weekly Activity */}
      <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
        <h3 className="text-[#7193a6] text-lg font-bold mb-6 w-full flex items-center gap-2">
          <BarChart3 className="text-[#a651b1]" /> การบันทึกไดอารี่รายสัปดาห์ (ทั้งโรงเรียน)
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
              <Tooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="entries" fill="#a651b1" radius={[6, 6, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#e9dfff] rounded-2xl p-4 text-center">
          <h4 className="text-[#86398e] font-bold text-sm">นักเรียนทั้งหมด</h4>
          <p className="text-2xl font-bold text-[#640a73] mt-1">1,240</p>
        </div>
        <div className="bg-[#c6f6d5] rounded-2xl p-4 text-center">
           <h4 className="text-[#276749] font-bold text-sm">คุณครูทั้งหมด</h4>
           <p className="text-2xl font-bold text-[#22543d] mt-1">85</p>
        </div>
        <div className="bg-[#ffd7ef] rounded-2xl p-4 text-center">
           <h4 className="text-[#d13d84] font-bold text-sm">กลุ่มเสี่ยง (รวม)</h4>
           <p className="text-2xl font-bold text-[#9e2b63] mt-1">15</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;