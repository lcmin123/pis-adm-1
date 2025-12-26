import { useState } from 'react';
// useQueryClient 훅을 추가로 import 합니다.
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Header from '@widgets/header';
import apiClient from '@shared/api/axiosInstance';
import { router } from '@app/router';

export default function UsersPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // 1. 컴포넌트 내부에서 new QueryClient()를 하지 않고,
  //    상위 Provider에서 생성된 인스턴스를 가져오기 위해 훅을 사용합니다.
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    sex: '',
    id: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchUsers = async () => {
    const res = await apiClient.get(`${API_BASE_URL}/api/users`);
    if (res.status !== 200) {
      throw new Error('Failed to get users');
    }
    return res.data;
  };

  // 2. useQuery는 헬퍼 함수 내부가 아닌 컴포넌트 최상위 레벨로 끌어올립니다.
  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false
  });

  const createUserId = () => {
    const intAscii1 = Math.floor(Math.random() * 26) + 65;
    const intAscii2 = Math.floor(Math.random() * 26) + 65;
    const char = String.fromCharCode(intAscii1) + String.fromCharCode(intAscii2);
    const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return char + randomNum;
  }

  const addUser = async () => {
    await apiClient.post(`${API_BASE_URL}/api/users`, {...formData, id: formData.sex + createUserId()});
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
     setFormData({
       name: '',
       birth: '',
       sex: '',
       id: ''
     });

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
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름 입력"
        />

        <input
          name="birth"
          value={formData.birth}
          onChange={handleInputChange}
          placeholder="생년월일 입력"
        />

        <select name="sex" value={formData.sex} onChange={handleInputChange}>
          <option value="" disabled>성별 선택</option>
          <option value="1">남성</option>
          <option value="2">여성</option>
        </select>

        <button onClick={() => mutation.mutate()}>추가</button>

        {/* 4. 렌더링 로직을 JSX 내부로 직접 이동 */}
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {users && (
          <ul>
            {users.map(u => (
              <li key={u.id} onClick={() => router.navigate({ to: '/userInfo/$id', params: { id: u.id } })}>
                {u.id} {u.name} {u.birth} {u.sex === 1 ? '남성' : '여성'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
