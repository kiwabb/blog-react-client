import Home from "@/pages/Home";
import '@/assets/css/color.less'
import {Provider} from "react-redux";
import store from "@/store";

export default function HomePage() {


  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}
