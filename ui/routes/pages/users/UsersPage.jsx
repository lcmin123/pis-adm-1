import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@components/layout/header';

export default function UsersPage() {
  const [nameInput, setNameInput] = useState('');
  const [birthInput, setBirthInput] = useState('');

  const fetchUsers = useCallback(async () => {
    const res = await fetch('http://localhost:4000/api/users');
    const data = await res.json();
    //setUsers(data);
    return data;
  }, []);

  const userQueryList = () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <ul>
        {data.map(u => (
          <li key={u.id}>
            {u.name} {u.birth}
          </li>
        ))}
      </ul>
    );
  };

  const addUser = async () => {
    await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameInput, birth: birthInput })
    });
    setNameInput('');
    setBirthInput('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h1>Electron + React + Node.js + SQLite</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <input
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          placeholder="이름 입력"
        />
        <input
          value={birthInput}
          onChange={e => setBirthInput(e.target.value)}
          placeholder="생년월일 입력"
        />
        <button onClick={addUser}>추가</button>

        {userQueryList()}
      </div>
    </>
  );
}
