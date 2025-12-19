import { useState, useCallback } from 'react';
// useQueryClient 훅을 추가로 import 합니다.
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import Header from '@widgets/header';
import axios from 'axios';

export default function UsersPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // 1. 컴포넌트 내부에서 new QueryClient()를 하지 않고,
  //    상위 Provider에서 생성된 인스턴스를 가져오기 위해 훅을 사용합니다.
  const queryClient = useQueryClient();

  const [nameInput, setNameInput] = useState('');
  const [birthInput, setBirthInput] = useState('');

  const fetchUsers = useCallback(async () => {
    const res = await axios.get(`${API_BASE_URL}/users`);
    if (res.status !== 200) {
      throw new Error('Failed to get users');
    }
    return res.data;
  }, []);

  // 2. useQuery는 헬퍼 함수 내부가 아닌 컴포넌트 최상위 레벨로 끌어올립니다.
  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const addUser = async () => {
    await axios.post(`${API_BASE_URL}/users`, {
      name: nameInput,
      birth: birthInput
    });
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // 성공 시 입력창 초기화
      setNameInput('');
      setBirthInput('');

      // 3. 기존 쿼리 무효화 -> 데이터를 다시 받아옵니다 (Refetch)
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

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
        <button onClick={() => mutation.mutate()}>추가</button>

        {/* 4. 렌더링 로직을 JSX 내부로 직접 이동 */}
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {users && (
          <ul>
            {users.map(u => (
              <li key={u.id}>
                {u.name} {u.birth}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
