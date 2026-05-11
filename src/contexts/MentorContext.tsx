import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { mentors as staticMentors } from '../data/mentors';
import type { Mentor } from '../data/mentors';

const STORAGE_KEY = 'mentor_platform_mentors';

function loadFromStorage(): Mentor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return staticMentors;
}

function saveToStorage(data: Mentor[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

interface MentorContextValue {
  mentors: Mentor[];
  addMentor: (m: Omit<Mentor, 'id'>) => void;
  updateMentor: (id: number, m: Partial<Mentor>) => void;
  deleteMentor: (id: number) => void;
  resetToDefault: () => void;
}

const MentorContext = createContext<MentorContextValue | null>(null);

export function MentorProvider({ children }: { children: ReactNode }) {
  const [mentors, setMentors] = useState<Mentor[]>(loadFromStorage);

  const persist = useCallback((next: Mentor[]) => {
    setMentors(next);
    saveToStorage(next);
  }, []);

  const addMentor = useCallback((m: Omit<Mentor, 'id'>) => {
    setMentors((prev) => {
      const maxId = prev.reduce((a, b) => Math.max(a, b.id), 0);
      const next = [...prev, { ...m, id: maxId + 1 }];
      saveToStorage(next);
      return next;
    });
  }, []);

  const updateMentor = useCallback((id: number, patch: Partial<Mentor>) => {
    setMentors((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...patch } : m));
      saveToStorage(next);
      return next;
    });
  }, []);

  const deleteMentor = useCallback((id: number) => {
    setMentors((prev) => {
      const next = prev.filter((m) => m.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    persist(staticMentors);
  }, [persist]);

  return (
    <MentorContext.Provider value={{ mentors, addMentor, updateMentor, deleteMentor, resetToDefault }}>
      {children}
    </MentorContext.Provider>
  );
}

export function useMentors() {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error('useMentors must be used within MentorProvider');
  return ctx;
}
