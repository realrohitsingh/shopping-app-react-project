import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ErrorPage() {

  const navigate = useNavigate();
  function Change(){
    navigate('/')
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">
        Unfortunately the page you are looking for has been moved or deleted
      </h1>
      <img
        src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png"
        alt="Error-404"
      />
        <button onClick={Change} className="btn-primary">
          <FaSignInAlt className="text-lg" />
          <span className="text-black text-1xl font-bold">GO TO HOME PAGE</span>
        </button>
    </div>
  );
}

export default ErrorPage;
