import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { emptyCart } from "../Redux/cartredux";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to top, rgb(255, 148, 114), rgb(242, 112, 156))",
        fontSize: 20
      }}
    >
        Your order was placed successfully.Thank you for Shopping with us..
      <button style={{ padding: 10, marginTop: 20, cursor:"pointer", borderRadius:5}} 
        onClick={()=>{
          dispatch(emptyCart());
          navigate('/');
          }}
      >Go to Homepage </button>
  </div>
  );
};

export default Success;