import ToolBar from "../ToolBar/ToolBar";

const Layout = (props) => {
    return (
        <>
            <ToolBar/>
            <main>{props.children}</main>
        </>
    );
};

export default Layout;