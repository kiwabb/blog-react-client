import React, {useState} from "react";
import loginImage from "@//assets/img/login.jpg"
import './index.less'
import "@/assets/css/animation.less"
import {Form, Input, message} from "antd";
import classNames from "classnames";
import {login} from "@/services/user/api";
import {history} from '@umijs/max';


const Login:React.FC = () => {
  const defaultUser:USER.LoginUser = {
    username: '',
    password: '',
    email: '',
    captcha: '',
    loginType: '1',
  }
  const [rightPanelActive, setRightPanelActive] = useState<boolean>(false)
  const [loginUser, setLoginUser] = useState<USER.LoginUser>(defaultUser);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setLoginUser(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  const formContainerClassName = classNames(
    'in-up',
    {
      rightPanelActive: rightPanelActive,
    }
  )


  const changeDialog = (value:string) => {

  }

  const loginSubmit = async () => {
    console.log(loginUser)
    const result = await login(loginUser);
    if (result.respCode === 0) {
      const loginResult = result.data;
      if (loginResult && loginResult.access_token) {
        sessionStorage.setItem('access_token', loginResult.access_token);
      }
      message.success('登录成功！');
      /** 此方法会跳转到 redirect 参数所在的位置 */
      history.push('/');
    } else {
      message.error(result.respMsg);
    }
  }


  const signIn = () => {
    setLoginUser(defaultUser)
    setRightPanelActive(false)
  }

  const signUp = () => {
    setLoginUser(defaultUser)
    setRightPanelActive(true)
  }

  return (<div className="myCenter in-up-container my-animation-hideToShow">
    <img
      className="my-image"
      style={{position: "absolute"}}
      alt={"加载失败"}
      src={loginImage}
    >
    </img>

    <div className={formContainerClassName}>
      <Form>
      <div
        className="form-container sign-up-container"
      >
        <div className="myCenter">
          <h1>注册</h1>
            <Input onChange={(e) => handleInputChange(e, 'username')} value={loginUser.username} type="text" maxLength={30} placeholder="用户名"></Input>
            <Input value={loginUser?.password} onChange={(e) => handleInputChange(e, 'password')} type="password" maxLength={30} placeholder="密码"></Input>
            <Input value={loginUser?.email} onChange={(e) => handleInputChange(e, 'email')} type="email" maxLength={30} placeholder="邮箱"></Input>
            <Input value={loginUser?.captcha} onChange={(e) => handleInputChange(e, 'captcha')} type="text" maxLength={30} placeholder="验证码"></Input>
            <a style={{margin: 0}} href="#" onClick={() => {changeDialog('邮箱验证码')}}>获取验证码
            </a>
            <button  type="button" onClick={loginSubmit}>注册</button>


        </div>
      </div>
      </Form>

      <div className="form-container sign-in-container">
        <div className="myCenter">
          <h1>登录</h1>
          <Input value={loginUser?.username} onChange={(e) => handleInputChange(e, 'username')} type="text" maxLength={30} placeholder="用户名/邮箱/手机号"></Input>
          <Input value={loginUser?.password} onChange={(e) => handleInputChange(e, 'password')} type="password" maxLength={30} placeholder="密码"></Input>
          <a href="#" onClick={() => {
            changeDialog('找回密码')
          }}>忘记密码？</a>
          <button type="button" onClick={loginSubmit}>登录</button>
        </div>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel myCenter overlay-left">
            <h1>已有帐号？</h1>
            <p>请登录🚀</p>
            <button
              type="button"
              className="ghost"
              onClick={signIn}>登录
            </button>
          </div>
          <div className="overlay-panel myCenter overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册吧😃</p>
            <button
              type="button"
              className="ghost"
              onClick={signUp}>注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;