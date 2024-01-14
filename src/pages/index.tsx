import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import loginImg from "@/assets/login_img.jpg";

export default function Login() {
  return (
    <div className="lg:grid lg:grid-cols-2 h-screen">
      <div className="bg-primary shadow-xl lg:block hidden">
        <Image
          src={loginImg}
          alt="a picture of book"
          className="h-screen w-full object-cover opacity-60"
        />
      </div>
      <div className="flex lg:justify-start items-center  justify-center lg:pl-[50px] bg-primary bg-opacity-10 lg:h-auto h-full">
        <LoginForm />
      </div>
    </div>
  );
}
