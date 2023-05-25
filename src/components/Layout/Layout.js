import ToolBar from "../ToolBar/ToolBar";

const Layout = (props) => {
    return (
        <>
            <ToolBar/>
            <main className="main">{props.children}</main>
        </>
    );
};

export default Layout;