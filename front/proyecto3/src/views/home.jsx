
import NavBar from "../components/navBar";
import RegisterUserForm from "../components/RegisterUser";
import LoginUserForm from "../components/LoginUserForm";

const Home= () =>{
    return (
        <div>
        <h1>este es el componente home</h1>
        <NavBar/>
        <RegisterUserForm/>
     <LoginUserForm/>
        </div>

    );
};
export default Home