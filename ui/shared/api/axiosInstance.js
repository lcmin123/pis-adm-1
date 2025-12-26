import axios from 'axios';

// 1. Axios 인스턴스 생성
const apiClient = axios.create({
  timeout: 5000 // 요청 제한 시간 (선택)
});

apiClient.interceptors.request.use((config) => {
  console.log(`[API 요청] ${config.method.toUpperCase()} ${config.url}`, config.data ? config.data : '');
  return config;
})

// 2. 응답 인터셉터 설정 (실무형 에러 처리)
apiClient.interceptors.response.use(
  response => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터만 바로 쓰기 편하게 리턴하거나, response 전체를 리턴해도 됩니다.
    console.log(`[API 응답] ${response.config.url} (${response.status})`, response.data);
    return response;
  },
  error => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    if (error.response) {
      // 서버가 응답을 줬으나 상태 코드가 에러인 경우 (404, 500 등)
      console.error(`[API Error] ${error.response.status} : ${error.message}`);
    } else if (error.request) {
      // 요청은 보냈으나 응답을 못 받은 경우 (네트워크 문제)
      console.error('[API Error] No response received');
    } else {
      // 요청 설정 중에 에러가 난 경우
      console.error('[API Error]', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
