import {enquireScreen} from "enquire-js";
import React, {useEffect, useState} from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {Outlet} from "@umijs/max";
import {useDispatch, useSelector} from "react-redux";
import getUserInfo from "@/services/user/api";
import {setUserInfo} from "@/store";
import {message} from "antd";
let isMobile: boolean;
enquireScreen((b: any) => {
  isMobile = b;
});
const Home: React.FC = () => {
  const [mobile, setMobile] = useState<boolean>(isMobile);
  const userInfo = useSelector(state => state.state.userInfo);
  const dispatch = useDispatch();
  const setCurrentUser = async () => {
    console.log('userInfo', userInfo, 'access_token', sessionStorage.getItem('access_token'))
    if (userInfo === null && sessionStorage.getItem('access_token') !== null) {
      // 获取用户信息
      const result = await getUserInfo();
      console.log(result)
      if (result.respCode === 0) {
        dispatch(setUserInfo(result.data))
      } else {
        message.warning('登录状态过期，请重新登录！')
        sessionStorage.removeItem('access_token')
      }
    }

  }

  useEffect(() => {
    enquireScreen((b: any) => {
      setMobile(!!b)
    })
    setCurrentUser();
  }, []);



  const children = [
    <div>
      <Nav
        id="Nav"
        key="Nav"
        isMobile={mobile}
      ></Nav>
      <Outlet/>
      <Footer
        id="Footer"
        key="Footer"
        isMobile={mobile}
      >
      </Footer>
    </div>
  ]
  return (
    <div
      className="templates-wrapper"
    >{children}</div>)
}
export default Home;

