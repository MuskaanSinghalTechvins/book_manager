import { useContext } from "react";
import LoginForm from "../auth/LoginForm";
import { UIContext } from "@/context";
import CreateBook from "../dashboard/CreateBook";

const Modal = () => {
  const {
    uiState: { visible, screen },
    dispatch,
  } = useContext(UIContext);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return visible ? (
    <div className="bg-black bg-opacity-80 fixed inset-0 flex  justify-center items-center">
      <div className="relative">
        {screen === "ADD_BOOK" && <CreateBook />}
        <button
          className="absolute right-[-15px] top-[-15px] h-[15px] w-[15px] rounded-full bg-white flex justify-center items-center text-xs"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
