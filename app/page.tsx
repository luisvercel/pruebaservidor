import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { Login } from "@/components/login";
import { LoginModal } from "@/components/login/LoginModal";

const Home: NextPage = () => {
  return <Content />;
  //return <LoginModal></LoginModal>
};

export default Home;
