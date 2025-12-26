import Header from "@widgets/header";
import { useParams } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "@shared/api/axiosInstance";

export default function UserDetailPage() {
		const API_BASE_URL = import.meta.env.VITE_API_URL;

    const { id } = useParams({ from: "/userInfo/$id" });
    const { data, isLoading, error } = useQuery({
        queryKey: ["users", id],
        queryFn: async () => {
            const res = await apiClient.get(`${API_BASE_URL}/api/users/${id}`);
            return res.data;
        }
    });

		const createAthNo = async () => {
			const athNo = data.birth + '-' + data.id;
			await apiClient.put(`${API_BASE_URL}/api/users/${id}`, { ath_no: athNo });
		}

		const mutation = useMutation({
			mutationFn: createAthNo,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["users", id] });
			}
		})

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Header />
            <div style={{ padding: 20 }}>
                <h1>User Detail</h1>
                {data ? (
                    <>
                        <p><strong>ID:</strong> {data.id}</p>
                        <p><strong>체육인 번호:</strong> {data.ath_no ? data.ath_no : '체육인 번호를 생성하세요'}</p>
                        <p><strong>이름:</strong> {data.name}</p>
                        <p><strong>생년월일:</strong> {data.birth}</p>
                        <p><strong>성별:</strong> {data.sex === '1' || data.sex === 1 ? '남성' : '여성'}</p>
												{data.ath_no ? <p>체육인 번호가 생성되었습니다.</p> : <button onClick={() => mutation.mutate()}>체육인 번호 생성</button>}
                    </>
                ) : (
                    <p>사용자를 찾을 수 없습니다.</p>
                )}
            </div>
        </>
    );
}