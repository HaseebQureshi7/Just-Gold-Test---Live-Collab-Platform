import { Outlet } from "react-router-dom";
import Appbar from "../components/Appbar/Appbar";
import { ColFlex } from "../styles/utils/flexUtils";

function DashboardLayout() {
  return (
    <div style={{ ...ColFlex, width: "100%", height: "100%" }}>
      <Appbar />
      {<Outlet/>}
    </div>
  );
}

export default DashboardLayout;
