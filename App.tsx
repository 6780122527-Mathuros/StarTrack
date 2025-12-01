import React, { useState } from 'react';
import { Role, User, Appointment } from './types';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('student');
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'เด็กหญิงสดใส ใจดี',
    role: 'student',
    stars: 24,
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    { 
      id: '101', 
      studentName: 'เด็กหญิงสดใส ใจดี', 
      date: '2023-10-28 14:00', 
      reason: 'เครียดเรื่องสอบ อยากขอคำแนะนำค่ะ', 
      status: 'pending' 
    }
  ]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'student') {
        setCurrentUser({ ...currentUser, role: 'student', name: 'เด็กหญิงสดใส ใจดี' });
    } else if (newRole === 'teacher') {
        setCurrentUser({ ...currentUser, role: 'teacher', name: 'ครูสมศรี ที่รัก' });
    } else {
        setCurrentUser({ ...currentUser, role: 'admin', name: 'ผอ. ใจกว้าง' });
    }
  };

  const handleUpdateNickname = (nickname: string) => {
    setCurrentUser(prev => ({ ...prev, nickname }));
  };

  const handleApproveAppointment = (id: string, note: string) => {
    setAppointments(prev => prev.map(a => 
      a.id === id 
        ? { ...a, status: 'approved', teacherNote: note } 
        : a
    ));
  };

  return (
    <div className="min-h-screen pb-12 font-['Sarabun']">
      {/* Header */}
      <header className="text-center bg-[#fcecfb] border-b-2 border-[#e5d9f7] pt-[1.7em] pb-[0.3em]">
        <h1 className="text-[#a645ae] text-3xl font-bold mt-[1.5em] mb-[0.1em]">HappySchool</h1>
        <div className="text-[#a14f88] mb-4">ระบบติดตามอารมณ์และดาวเด็กดี</div>
      </header>

      {/* Navigation */}
      <nav className="text-center p-[1.1em] bg-[#f2f7fd]">
        <div className="flex justify-center flex-wrap gap-2">
          <button 
            onClick={() => handleRoleChange('student')}
            className={`text-[1.19em] border-none rounded-[11px] px-[2.2em] py-[0.8em] m-[0.4em] cursor-pointer transition-colors font-medium ${
              role === 'student' 
                ? 'bg-[#a645ae] text-white shadow-md' 
                : 'bg-[#e9dfff] text-[#86398e] hover:bg-[#e4e5ff]'
            }`}
          >
            👦 นักเรียน
          </button>
          <button 
            onClick={() => handleRoleChange('teacher')}
            className={`text-[1.19em] border-none rounded-[11px] px-[2.2em] py-[0.8em] m-[0.4em] cursor-pointer transition-colors font-medium ${
              role === 'teacher' 
                ? 'bg-[#a645ae] text-white shadow-md' 
                : 'bg-[#e9dfff] text-[#86398e] hover:bg-[#e4e5ff]'
            }`}
          >
            👩‍🏫 ครู
          </button>
          <button 
            onClick={() => handleRoleChange('admin')}
            className={`text-[1.19em] border-none rounded-[11px] px-[2.2em] py-[0.8em] m-[0.4em] cursor-pointer transition-colors font-medium ${
              role === 'admin' 
                ? 'bg-[#a645ae] text-white shadow-md' 
                : 'bg-[#e9dfff] text-[#86398e] hover:bg-[#e4e5ff]'
            }`}
          >
            🏫 ผู้บริหาร
          </button>
          <button 
             onClick={() => window.location.reload()}
             className="bg-[#a651b1] text-white border-none rounded-[9px] font-bold text-[1.07em] px-[2em] py-[0.7em] m-[0.4em] shadow-[0_1px_7px_#ede0fb40] hover:bg-[#e6c6f5] hover:text-[#640a73] ml-auto"
          >
            ออกจากระบบ
          </button>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="max-w-[930px] mx-auto my-[2em] bg-[#fffefe] rounded-[23px] p-[2em_2.2em] shadow-[0_4px_25px_#e4eaf4cc]">
        {role === 'student' && (
          <StudentDashboard 
            user={currentUser} 
            onUpdateStars={(amount) => setCurrentUser({...currentUser, stars: currentUser.stars + amount})}
            appointments={appointments.filter(a => a.studentName === currentUser.name)}
            onUpdateNickname={handleUpdateNickname}
          />
        )}
        {role === 'teacher' && (
          <TeacherDashboard 
            appointments={appointments}
            onApprove={handleApproveAppointment}
          />
        )}
        {role === 'admin' && <AdminDashboard />}
      </section>

      <footer className="text-center text-gray-400 text-sm mt-12 mb-4">
        © 2024 HappySchool System. Powered by Gemini API.
      </footer>
    </div>
  );
};

export default App;