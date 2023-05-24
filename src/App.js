import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Templates from "./containers/Templates/Templates";
import MyTemplates from "./containers/MyTemplates/MyTemplates";

const App = () => {
  return  (
    <Layout>
      <Routes>
        <Route path="/" element={<Templates/>} />
        <Route path="/templates" element={<MyTemplates/>} />
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Layout>
  )
};

export default App;