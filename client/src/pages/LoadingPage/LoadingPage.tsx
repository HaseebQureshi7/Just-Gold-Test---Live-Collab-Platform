import { CSSProperties } from "react";
import Loading from "../../components/ui/Loading";

interface ILoadingPage {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

function LoadingPage({width, height}: ILoadingPage) {
  return (
    <div
      style={{
        width: width ? width : "100%",
        height: height ? height : "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading scale={2} />
    </div>
  );
}

export default LoadingPage;
