import React, { useState } from 'react';
import { User, DiaryEntry, Appointment } from '../types';
import { Star, Smile, Frown, Meh, Heart, CloudRain, Sparkles, Calendar, MessageCircle, PieChart as PieIcon, Edit2, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getSupportiveAdvice } from '../services/geminiService';

interface StudentDashboardProps {
  user: User;
  onUpdateStars: (amount: number) => void;
  appointments: Appointment[];
  onUpdateNickname: (nickname: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, appointments, onUpdateNickname }) => {
  const [selectedMood, setSelectedMood] = useState<string>('Happy');
  const [diaryText, setDiaryText] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isConsultingAi, setIsConsultingAi] = useState(false);
  
  // Nickname state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(user.nickname || '');

  const moods = [
    { label: 'Happy', icon: <Smile className="w-6 h-6" /> },
    { label: 'Neutral', icon: <Meh className="w-6 h-6" /> },
    { label: 'Sad', icon: <Frown className="w-6 h-6" /> },
    { label: 'Excited', icon: <Heart className="w-6 h-6" /> },
    { label: 'Anxious', icon: <CloudRain className="w-6 h-6" /> },
  ];

  // Mock stats for the student
  const studentStats = [
    { name: 'Happy', value: 15, color: '#b1e5e0' },
    { name: 'Neutral', value: 8, color: '#ffe780' },
    { name: 'Excited', value: 6, color: '#bfffa5' },
    { name: 'Sad', value: 2, color: '#a651b1' },
  ];

  const handleDiarySubmit = async () => {
    if (!diaryText.trim()) return;

    setIsConsultingAi(true);
    let aiFeedback = '';
    
    try {
        aiFeedback = await getSupportiveAdvice(diaryText, selectedMood);
    } catch (e) {
        aiFeedback = "ไม่สามารถเชื่อมต่อกับ AI ได้ในขณะนี้";
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('th-TH'),
      text: diaryText,
      mood: selectedMood,
      aiResponse: aiFeedback,
    };

    setEntries([newEntry, ...entries]);
    setDiaryText('');
    setIsConsultingAi(false);
  };

  const handleSaveNickname = () => {
    onUpdateNickname(nicknameInput);
    setIsEditingName(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] mb-[2em] shadow-[0_1px_18px_#e7e1fa60] flex justify-between items-center">
        <div>
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#a645ae] text-2xl font-bold">สวัสดี, </span>
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                placeholder="ใส่ชื่อเล่น..."
                className="p-1 px-3 rounded-lg border-2 border-[#a651b1] text-lg w-40 focus:outline-none text-[#a645ae] bg-white"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveNickname()}
              />
              <button onClick={handleSaveNickname} className="p-1.5 bg-[#b1e5e0] text-[#2c7a7b] rounded-md hover:bg-[#9adfd9] transition-colors">
                <Check className="w-5 h-5" />
              </button>
              <button onClick={() => setIsEditingName(false)} className="p-1.5 bg-[#ffd7ef] text-[#d13d84] rounded-md hover:bg-[#ffaad4] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group mb-1">
              <h2 className="text-[#a645ae] text-2xl font-bold mt-0 letter-spacing-[.03em]">
                สวัสดี, {user.nickname || user.name} 👋
              </h2>
              <button
                onClick={() => {
                  setNicknameInput(user.nickname || '');
                  setIsEditingName(true);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[#a651b1] hover:bg-[#fcecfb] p-1 rounded-md"
                title="แก้ไขชื่อเล่น"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
          <p className="text-[#7193a6]">วันนี้รู้สึกอย่างไรบ้าง?</p>
        </div>
        <div className="bg-[#fffefe] px-4 py-2 rounded-2xl border border-[#d3ecfd] flex items-center gap-2">
          <Star className="w-6 h-6 text-[#ffe780] fill-[#ffe780]" />
          <span className="text-2xl font-bold text-[#a651b1]">{user.stars}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Selector & Diary */}
        <div className="space-y-6">
          <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
            <h3 className="text-[#7193a6] text-lg font-semibold mb-4">เช็คอินอารมณ์</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  className={`flex-1 min-w-[60px] flex flex-col items-center justify-center p-3 rounded-2xl border-[1.3px] transition-all duration-200 ${
                    selectedMood === m.label 
                      ? 'bg-[#ffd7ef] border-[#bb5ecf] scale-105 shadow-md' 
                      : 'bg-[#e6f6ff] border-[#b6c5ee] hover:bg-[#f0f9ff]'
                  }`}
                >
                  <div className={selectedMood === m.label ? 'text-[#a645ae]' : 'text-[#7193a6]'}>
                      {m.icon}
                  </div>
                  <span className={`mt-1 text-xs font-medium ${selectedMood === m.label ? 'text-[#a645ae]' : 'text-[#7193a6]'}`}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
            <h3 className="text-[#7193a6] text-lg font-semibold mb-4">ไดอารี่ประจำวัน 📒</h3>
            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="วันนี้เจอเรื่องอะไรมาบ้าง เล่าให้ฟังหน่อยสิ..."
              className="w-full h-32 p-[0.7em] my-[0.13em] rounded-[7px] border-[1.25px] border-[#d3ecfd] bg-[#fff6f8] focus:border-[#a651b1] focus:outline-none resize-none text-gray-700 mb-4"
            />
            <button
              onClick={handleDiarySubmit}
              disabled={isConsultingAi || !diaryText.trim()}
              className="w-full bg-[#a651b1] text-white rounded-[9px] font-bold text-[1.07em] px-[2em] py-[0.7em] shadow-[0_1px_7px_#ede0fb40] hover:bg-[#e6c6f5] hover:text-[#640a73] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isConsultingAi ? (
                <Sparkles className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {isConsultingAi ? 'AI กำลังคิด...' : 'บันทึก & ถาม AI'}
            </button>
          </div>
        </div>

        {/* Right Column: Chart, Appointments & History */}
        <div className="space-y-6">
           {/* Emotion Chart */}
           <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
             <h3 className="text-[#7193a6] text-lg font-semibold mb-4 flex items-center gap-2">
               <PieIcon className="w-5 h-5 text-[#a651b1]" /> สรุปอารมณ์เดือนนี้
             </h3>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={studentStats}
                     cx="50%"
                     cy="50%"
                     innerRadius={40}
                     outerRadius={60}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {studentStats.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                   />
                   <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>

           {/* Appointments Section */}
           <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
             <h3 className="text-[#7193a6] text-lg font-semibold mb-4 flex items-center gap-2">
               <Calendar className="w-5 h-5" /> นัดหมายกับครู
             </h3>
             {appointments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">ไม่มีการนัดหมายเร็วๆ นี้</p>
             ) : (
                <div className="space-y-3">
                  {appointments.map(appt => (
                    <div key={appt.id} className="bg-white p-3 rounded-xl border border-[#d3ecfd]">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-bold text-[#a645ae]">{appt.date}</span>
                         <span className={`text-[10px] px-2 py-0.5 rounded-full ${appt.status === 'approved' ? 'bg-[#d9fff5] text-[#399d2f]' : 'bg-[#fff5d6] text-[#b38600]'}`}>
                            {appt.status === 'approved' ? 'อนุมัติแล้ว' : 'รอครูตอบรับ'}
                         </span>
                       </div>
                       <p className="text-sm text-gray-600 mb-2">"{appt.reason}"</p>
                       
                       {/* Teacher Note Display */}
                       {appt.status === 'approved' && appt.teacherNote && (
                         <div className="bg-[#f0fff4] p-2 rounded-lg border border-[#c6f6d5] flex items-start gap-2">
                           <MessageCircle className="w-4 h-4 text-[#399d2f] mt-0.5 shrink-0" />
                           <div className="text-sm">
                             <span className="font-bold text-[#2f855a] block text-xs mb-0.5">ข้อความจากครู:</span>
                             <span className="text-[#276749]">{appt.teacherNote}</span>
                           </div>
                         </div>
                       )}
                    </div>
                  ))}
                </div>
             )}
           </div>

           {/* History List */}
           <div className="space-y-4">
             <h3 className="text-[#7193a6] text-lg font-semibold px-2">บันทึกที่ผ่านมา</h3>
             {entries.length === 0 && <p className="text-gray-400 text-center py-4">ยังไม่มีบันทึก</p>}
             {entries.map((entry) => (
               <div key={entry.id} className="bg-[#f3f1fc] rounded-[10px] p-[0.7em_1em] mb-[0.5em] border border-[#e5d9f7]">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-[0.93em] text-[#ae8cc1] font-bold">{entry.date}</span>
                   <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-lg border border-[#d3ecfd]">{entry.mood}</span>
                 </div>
                 <p className="text-gray-700 text-sm mb-3">{entry.text}</p>
                 {entry.aiResponse && (
                   <div className="bg-[#f1ffea] p-[1em_1.5em] rounded-[10px] mt-[0.9em] flex gap-3">
                     <div className="bg-white p-1.5 rounded-full h-fit shadow-sm border border-[#d3ecfd]">
                        <Sparkles className="w-3 h-3 text-[#a645ae]" />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-[#a651b1] mb-1">พี่ AI แนะนำว่า:</p>
                       <p className="text-sm text-[#444] leading-relaxed">{entry.aiResponse}</p>
                     </div>
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;