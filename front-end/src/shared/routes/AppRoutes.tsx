import { Route, Routes } from "react-router-dom";
import Home from "../../modules/users/pages/Home.tsx";
import About from "../../modules/users/pages/About.tsx";
import Signup from "../../modules/users/pages/SignUp.tsx";
import Login from "../../modules/users/pages/Login.tsx";
import Dashboard from "@/modules/users/pages/Dashboard.tsx";
import AdminDashboard from "@/modules/users/pages/adminDashboard.tsx";
import CreateQuiz from "@/modules/users/pages/CretaeQuiz.tsx";
import EditQuiz from "@/modules/users/pages/EditQuiz.tsx";
import QuizPage from "@/modules/users/pages/Quizpage.tsx";




const AppRoutes = ()=>{
    return (<>
        <Routes>
              <Route path="/" element={<Home/>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard"element={<Dashboard/>}></Route>
            <Route path="/admindashboard"element={<AdminDashboard/>}></Route>
            <Route path="/admin/create-quiz" element={<CreateQuiz />} />
            <Route path="/admin/edit-quiz/:id" element={<EditQuiz />} />
            <Route path="/quiz/:id" element={<QuizPage />} />

        </Routes>
    </>)

}

export default AppRoutes;