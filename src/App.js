import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MyTemplates from "./containers/MyTemplates/MyTemplates";
import EditTemplate from "./containers/EditTemplate/EditTemplate";
import Form from "./components/Form/Form";

const App = () => {
  return  (
    <Layout>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/email-templates" element={<Form/>} />
        <Route path="/templates" element={<MyTemplates/>} />
        <Route path="/templates/:id" element={<EditTemplate/>} />
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Layout>
  )
};

export default App;