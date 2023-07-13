import Loader from "../../assets/Spinner-Loader.gif";
import "./index.scss";

export default function LoaderComponent() {
  return (
    <div className="loadingLogo">
      <img src={Loader} />
    </div>
  );
}
