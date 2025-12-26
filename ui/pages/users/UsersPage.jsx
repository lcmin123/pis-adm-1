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

  // register: input을 폼에 등록하는 함수 (name, onChange, ref 등 자동 처리)
  // handleSubmit: 폼 제출 시 유효성 검사를 통과하면 실행될 함수
  // reset: 폼 데이터를 초기화하는 함수
  // formState: { errors }: 유효성 검사 에러 객체
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

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

  // handleSubmit이 넘겨주는 'data' 객체에는 이미 { name, birth, sex }가 들어있습니다.
  const addUser = async (data) => {
    await apiClient.post(`${API_BASE_URL}/api/users`, { ...data, id: data.sex + createUserId() });
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
     reset();
      // 3. 기존 쿼리 무효화 -> 데이터를 다시 받아옵니다 (Refetch)
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h1>Electron + React + Node.js + SQLite</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* 6. value, onChange, name을 지우고 {...register('키값')}으로 대체합니다. */}
          <div>
            <input
              {...register("name", { required: "이름은 필수입니다." })} 
              placeholder="이름 입력"
            />
            {/* 에러 메시지 표시 */}
            <span style={{ color: 'red', fontSize: '12px', marginLeft: 5 }}>
              {errors.name?.message}
            </span>
          </div>
          
          <div style={{ marginTop: 5 }}>
            <input
              {...register("birth", { required: "생년월일을 입력해주세요." })}
              placeholder="생년월일 입력"
            />
            <span style={{ color: 'red', fontSize: '12px', marginLeft: 5 }}>
              {errors.birth?.message}
            </span>
          </div>

          <div style={{ marginTop: 5 }}>
            <select 
              {...register("sex", { required: "성별을 선택해주세요." })}
              defaultValue="" // 초기값 설정
            >
              <option value="" disabled>성별 선택</option>
              <option value="1">남성</option>
              <option value="2">여성</option>
            </select>
            <span style={{ color: 'red', fontSize: '12px', marginLeft: 5 }}>
              {errors.sex?.message}
            </span>
          </div>
          
          {/* type="submit"으로 설정하여 폼 제출을 트리거합니다. */}
          <button type="submit" style={{ marginTop: 10 }}>추가</button>
        </form>

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
