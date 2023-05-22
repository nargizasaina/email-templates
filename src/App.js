import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

const App = () => {
  return  (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Register/>} />
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Layout>
  )
};

export default App;