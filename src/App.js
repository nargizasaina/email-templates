import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Templates from "./containers/Templates/Templates";
import MyTemplates from "./containers/MyTemplates/MyTemplates";
import EditTemplate from "./containers/EditTemplate/EditTemplate";

const App = () => {
  return  (
    <Layout>
      <Routes>
        <Route path="/" element={<Templates/>} />
        <Route path="/templates" element={<MyTemplates/>} />
        <Route path="/templates/:id" element={<EditTemplate/>} />
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Layout>
  )
};

export default App;