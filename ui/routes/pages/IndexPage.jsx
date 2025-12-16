import { router } from "../router";
import Header from "../../components/layout/header";

export default function IndexPage() {
  return (
    <>
      <Header />
      <button onClick={() => router.navigate({ to: "/userInfo" })}>
        Go to User Info
      </button>
    </>
  );
}
