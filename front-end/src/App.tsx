
import Header from "./shared/components/Header.tsx";
import AppRoutes from "../src/shared/routes/AppRoutes.tsx";

const App = ()=>{
  return (<div className="bg-[url('./assets/bg.jpg')] bg-no-repeat bg-center bg-cover min-h-screen overflow-hidden">
    <Header/>
    <AppRoutes/>
  </div>)
}
export default App;