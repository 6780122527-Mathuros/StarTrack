import React, { useState } from 'react';
import { User, Appointment, MOCK_STUDENTS } from '../types';
import { Star, Calendar, CheckCircle, Clock, MessageCircle, PieChart as PieIcon, Plus, Minus, AlertCircle, Smile, Meh, Frown, Heart, CloudRain, Save } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TeacherDashboardProps {
  appointments: Appointment[];
  onApprove: (id: string, note: string) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ appointments, onApprove }) => {
  const [students, setStudents] = useState<User[]>(MOCK_STUDENTS);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [confirmAction, setConfirmAction] = useState<{ studentId: string; amount: number; studentName: string } | null>(null);

  // Teacher Mood State
  const [teacherMood, setTeacherMood] = useState<string>('Happy');
  const [teacherNote, setTeacherNote] = useState('');
  const [myStats, setMyStats] = useState([
    { name: 'Happy', value: 8, color: '#b1e5e0' },
    { name: 'Neutral', value: 3, color: '#ffe780' },
    { name: 'Sad', value: 1, color: '#a651b1' },
    { name: 'Excited', value: 4, color: '#bfffa5' },
    { name: 'Anxious', value: 2, color: '#ffd7ef' },
  ]);

  const moods = [
    { label: 'Happy', icon: <Smile className="w-6 h-6" /> },
    { label: 'Neutral', icon: <Meh className="w-6 h-6" /> },
    { label: 'Sad', icon: <Frown className="w-6 h-6" /> },
    { label: 'Excited', icon: <Heart className="w-6 h-6" /> },
    { label: 'Anxious', icon: <CloudRain className="w-6 h-6" /> },
  ];

  const updateStars = (studentId: string, amount: number) => {
    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, stars: Math.max(0, s.stars + amount) } 
        : s
    ));
  };

  const handleNoteChange = (id: string, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  const handleTeacherMoodSubmit = () => {
    if (!teacherNote.trim()) return;
    
    // Simulate updating stats
    setMyStats(prev => prev.map(stat => 
      stat.name === teacherMood 
        ? { ...stat, value: stat.value + 1 } 
        : stat
    ));
    
    setTeacherNote('');
    alert("บันทึกอารมณ์เรียบร้อยแล้วครับคุณครู! ✌️");
  };

  // Mock stats for the class
  const classStats = [
    { name: 'Happy', value: 12, color: '#b1e5e0' },
    { name: 'Neutral', value: 8, color: '#ffe780' },
    { name: 'Sad', value: 4, color: '#a651b1' },
    { name: 'Excited', value: 6, color: '#bfffa5' },
    { name: 'Anxious', value: 3, color: '#ffd7ef' },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] mb-[2em] shadow-[0_1px_18px_#e7e1fa60]">
        <h2 className="text-[#a645ae] text-2xl font-bold mt-0 letter-spacing-[.03em] mb-1">จัดการห้องเรียน 👩‍🏫</h2>
        <p className="text-[#7193a6]">ส่งกำลังใจให้เด็กๆ กันเถอะ</p>
      </div>

      {/* Teacher Self-Care Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#fffefe] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60] border border-[#fcecfb]">
          <h3 className="text-[#a651b1] text-lg font-bold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" /> Daily Check-in สำหรับครู
          </h3>
          <div className="space-y-4">
             <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setTeacherMood(m.label)}
                  className={`flex-1 min-w-[50px] flex flex-col items-center justify-center p-2 rounded-xl border-[1.3px] transition-all duration-200 ${
                    teacherMood === m.label 
                      ? 'bg-[#ffd7ef] border-[#bb5ecf] scale-105 shadow-md' 
                      : 'bg-[#f7f9fd] border-[#e5e7eb] hover:bg-[#f0f9ff]'
                  }`}
                >
                  <div className={teacherMood === m.label ? 'text-[#a645ae]' : 'text-[#9ca3af]'}>
                      {m.icon}
                  </div>
                </button>
              ))}
            </div>
            <textarea
              value={teacherNote}
              onChange={(e) => setTeacherNote(e.target.value)}
              placeholder="วันนี้ครูเป็นอย่างไรบ้าง? (บันทึกส่วนตัว)"
              className="w-full p-3 text-sm border border-[#d3ecfd] rounded-lg bg-[#fbfdff] focus:border-[#a651b1] focus:outline-none resize-none h-20"
            />
            <button
              onClick={handleTeacherMoodSubmit}
              disabled={!teacherNote.trim()}
              className="w-full bg-[#b1e5e0] text-[#2c7a7b] font-bold py-2 rounded-lg hover:bg-[#9adfd9] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" /> บันทึกความรู้สึก
            </button>
          </div>
        </div>

        <div className="bg-[#fffefe] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60] border border-[#fcecfb]">
          <h3 className="text-[#7193a6] text-lg font-bold mb-4 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-[#a651b1]" /> สถิติอารมณ์ของคุณครู
          </h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={myStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {myStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5d9f7] my-2"></div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column: Student List */}
        <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
          <h3 className="text-[#7193a6] text-lg font-bold mb-4 flex items-center gap-2">
            <Star className="text-[#ffe780] fill-[#ffe780]" /> จัดการดาวเด็กดี
          </h3>
          <div className="space-y-3">
            {students.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-white border border-[#d3ecfd] rounded-xl hover:bg-[#f3f1fc] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e9dfff] rounded-full flex items-center justify-center text-[#86398e] font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#444]">{student.name}</p>
                    <p className="text-xs text-[#7193a6] font-medium">{student.stars} ดวง</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setConfirmAction({ studentId: student.id, amount: -1, studentName: student.name })}
                    className="w-8 h-8 flex items-center justify-center bg-[#ffd7ef] hover:bg-[#ffaad4] text-[#d13d84] rounded-lg transition-all active:scale-90"
                    title="ลดดาว"
                    aria-label={`Decrease stars for ${student.name}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setConfirmAction({ studentId: student.id, amount: 1, studentName: student.name })}
                    className="w-8 h-8 flex items-center justify-center bg-[#ffe780] hover:bg-[#ffdf4d] text-[#764108] rounded-lg transition-all active:scale-90"
                    title="เพิ่มดาว"
                    aria-label={`Increase stars for ${student.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chart & Appointments */}
        <div className="space-y-6">
          {/* Class Emotion Chart */}
          <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
             <h3 className="text-[#7193a6] text-lg font-bold mb-4 flex items-center gap-2">
               <PieIcon className="text-[#a651b1]" /> ภาพรวมอารมณ์ห้องเรียน
             </h3>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={classStats}
                     cx="50%"
                     cy="50%"
                     innerRadius={40}
                     outerRadius={60}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {classStats.map((entry, index) => (
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

           {/* Appointments */}
           <div className="bg-[#f7f9fd] rounded-[15px] p-[1.35em_2em] shadow-[0_1px_18px_#e7e1fa60]">
              <h3 className="text-[#7193a6] text-lg font-bold mb-4 flex items-center gap-2">
               <Calendar className="text-[#a651b1]" /> นัดหมายปรึกษา
             </h3>
             <div className="space-y-3">
               {appointments.length === 0 && <p className="text-gray-400 text-center py-4">ไม่มีนัดหมายใหม่</p>}
               {appointments.map(appt => (
                 <div key={appt.id} className="p-4 border border-[#d3ecfd] bg-white rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-[#a645ae]">{appt.studentName}</span>
                       <span className={`text-xs px-2 py-1 rounded-full ${appt.status === 'approved' ? 'bg-[#d9fff5] text-[#399d2f]' : 'bg-[#fff5d6] text-[#b38600]'}`}>
                         {appt.status === 'approved' ? 'อนุมัติแล้ว' : 'รออนุมัติ'}
                       </span>
                    </div>
                    <div className="text-sm text-[#7193a6] mb-3 space-y-1">
                       <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> {appt.date}</div>
                       <div className="opacity-80">"{appt.reason}"</div>
                    </div>
                    
                    {appt.status === 'pending' ? (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2 text-[#7193a6] text-sm">
                          <MessageCircle className="w-4 h-4" />
                          <span>ข้อความถึงนักเรียน:</span>
                        </div>
                        <textarea
                           value={notes[appt.id] || ''}
                           onChange={(e) => handleNoteChange(appt.id, e.target.value)}
                           placeholder="เช่น: ยินดีครับ เดี๋ยวครูรอที่ห้องพักครูนะ..."
                           className="w-full p-2 mb-3 text-sm border border-[#d3ecfd] rounded-lg bg-[#fff6f8] focus:border-[#a651b1] focus:outline-none resize-none"
                           rows={2}
                        />
                        <button 
                         onClick={() => onApprove(appt.id, notes[appt.id] || '')}
                         className="w-full py-2 bg-[#ffc285] text-[#764108] font-bold rounded-lg hover:bg-[#ffb366] flex justify-center items-center gap-2 shadow-[0_1px_5px_#ede0fb40]"
                        >
                          <CheckCircle className="w-4 h-4" /> ยืนยันนัดหมาย
                        </button>
                      </div>
                    ) : (
                      appt.teacherNote && (
                        <div className="mt-3 bg-[#f0fff4] border border-[#c6f6d5] p-3 rounded-lg flex items-start gap-3">
                           <div className="bg-[#c6f6d5] p-1.5 rounded-full text-[#2f855a] shrink-0">
                             <MessageCircle className="w-4 h-4" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-[#2f855a] mb-0.5">ข้อความถึงนักเรียน:</p>
                              <p className="text-sm text-[#276749]">{appt.teacherNote}</p>
                           </div>
                        </div>
                      )
                    )}
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl transform transition-all scale-100 border-2 border-white">
            <h3 className="text-xl font-bold text-[#a645ae] mb-3 flex items-center gap-2">
              {confirmAction.amount > 0 ? (
                <Star className="w-6 h-6 fill-[#ffe780] text-[#ffe780]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-[#d13d84]" />
              )}
              {confirmAction.amount > 0 ? 'มอบดาวเด็กดี' : 'ลดดาว'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              ยืนยันการ{confirmAction.amount > 0 ? 'เพิ่ม' : 'ลด'} 1 ดาว ให้กับ <br/>
              <span className="font-bold text-[#444] text-lg">{confirmAction.studentName}</span> ใช่หรือไม่?
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  updateStars(confirmAction.studentId, confirmAction.amount);
                  setConfirmAction(null);
                }}
                className={`px-5 py-2 rounded-xl font-bold shadow-md transition-all transform active:scale-95 ${
                  confirmAction.amount > 0 
                    ? 'bg-[#ffe780] text-[#764108] hover:bg-[#ffdf4d]' 
                    : 'bg-[#ffd7ef] text-[#d13d84] hover:bg-[#ffaad4]'
                }`}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;