import { router } from '@app/router';
import Header from '@widgets/header';

export default function IndexPage() {
  return (
    <>
      <Header />
      <button onClick={() => router.navigate({ to: '/userInfo' })}>
        Go to User Info
      </button>
    </>
  );
}
