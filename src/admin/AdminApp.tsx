import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import MentorList from './pages/MentorList';
import MentorForm from './pages/MentorForm';

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="mentors" element={<MentorList />} />
        <Route path="mentors/new" element={<MentorForm />} />
        <Route path="mentors/:id/edit" element={<MentorForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
