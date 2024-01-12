import LoginForm from "@/components/auth/LoginForm";
import { Inter } from "next/font/google";
import Image from "next/image";
import loginImg from "@/assets/login_img.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary shadow-xl">
        <Image
          src={loginImg}
          alt="a picture of book"
          className="h-screen w-full object-cover opacity-60"
        />
      </div>
      <div className="flex justify-start items-center pl-[50px]">
        <LoginForm />
      </div>
    </div>
  );
}
