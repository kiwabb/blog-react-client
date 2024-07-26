import React, {useEffect, useRef, useState} from "react";
import {Avatar, Dropdown, MenuProps} from "antd";
import TweenOne from 'rc-tween-one';
import './index.less'
import {history} from '@umijs/max';
import {useDispatch, useSelector} from "react-redux";
import {setHeadShowType, setToolbar} from '@/store';
import mousedown from "@/utils/mousedown";
import classNames from "classnames";


const articleCateMenus: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div onClick={() => history.push('/category')}>
        文章分类
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div onClick={() => history.push('/category')}>
        文章标签
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div onClick={() => history.push('/category')}>
        文章归档
      </div>
    ),
  },
];

const Header: React.FC<SYSTEM.HeaderProps> = (props) => {
  const [hoverEnter, setHoverEnter] = useState(false);
  const {isMobile} = props;
  const [phoneOpen, setPhoneOpen] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [toolButton, setToolButton] = useState(false);
  const [mouseAnimation, setMouseAnimation] = useState(false);
  const oldScrollTopRef = useRef(0);
  const url = 'https://file.poetize.cn/webAvatar/Sara116383637867956';
  const toolbar = useSelector(state => state.state.toolbar);
  const headShowType = useSelector(state => state.state.headShowType);
  const userInfo = useSelector(state => state.state.userInfo);
  const phoneClick = () => {
    const isPhoneOpen = !phoneOpen
    setPhoneOpen(isPhoneOpen)
  }

  const userMenus = () => {
    if (userInfo) {
      return [
        {
          key:1,
          label: (
            <div>
              <i className="fa fa-user-circle" aria-hidden="true"></i> <span>个人中心</span>
            </div>
          )
        },
        {
          key:2,
          label: (
            <div>
              <i className="fa fa-user-circle" aria-hidden="true"></i> <span>退出登录</span>
            </div>
          )
        }
      ]
    } else {
      return  [
        {
          key: 1,
          label: (
            <div onClick={() => {
              history.push('/login')
            }}>
              <i className="fa fa-user-circle" aria-hidden="true"></i> <span>登陆</span>
            </div>
          )
        }
      ]
    }
  }


  const dispatch = useDispatch();
  const handleClick = () => {
    history.push("/")
    dispatch(setHeadShowType(1));
    dispatch(setToolbar({visible: true, enter: true}));
  };

  useEffect(() => {
    let toolbarStatus = {
      visible: true,
      enter: false
    };
    dispatch(setToolbar(toolbarStatus))
    if (mouseAnimation) {
      mousedown()
    }

    window.addEventListener("scroll", onScrollPage);

    return () => {
      window.removeEventListener("scroll", onScrollPage);
    }
  }, [])


  const onScrollPage = () => {
    setScrollTop(document.documentElement.scrollTop || document.body.scrollTop)
  }

  useEffect(() => {
    if (scrollTop !== oldScrollTopRef.current) {
      let enter = scrollTop > window.innerHeight / 2;
      const top = scrollTop - oldScrollTopRef.current < 0;
      let isShow = scrollTop - window.innerHeight > 30;
      setToolButton(isShow)
      let toolbarStatus = {
        enter: enter,
        visible: top,
      };
      dispatch(setToolbar(toolbarStatus))
      oldScrollTopRef.current = scrollTop;
    }
  }, [scrollTop]);

  const toolbarClassName = classNames(
    'header home-page-wrapper myBetween', {
      hoverEnter: hoverEnter,
      enter: toolbar.enter || headShowType === 2
    });
  const moment = phoneOpen === undefined ? 300 : null;
  return (
    <div>
      {
        toolbar.visible && <TweenOne
              component="header"
              animation={{opacity: 0, type: 'from'}}
              className="header home-page-wrapper"
          >
          {/*导航栏*/}
              <div
                  onMouseEnter={() => {
                    if (headShowType === 1) {
                      setHoverEnter(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoverEnter(false);
                  }}
                  className={toolbarClassName}
              >
                  <div className="toolbar-title">
                      <h2 onClick={handleClick}>JACKMOUSE</h2>
                  </div>
                {!isMobile ?
                  <div>
                    {headShowType === 1 &&
                        <ul className="scroll-menu">
                            <li onClick={() => {
                              history.push("/")
                            }}>
                                <div className="my-menu">
                                    <div className="menu-search">
                                        <input className="ais-SearchBox-input" type="text"
                                               placeholder="搜索文章" maxLength={32}/>
                                        <div className="ais-SearchBox-submit">
                                            <svg className="menu-svg" viewBox="0 0 1024 1024" width="20" height="20">
                                                <path
                                                    d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
                                                    fill="#51C492"></path>
                                                <path
                                                    d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
                                                    fill="#FFFFFF"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li onClick={() => {
                              history.push("/")
                            }}>
                                <div className="my-menu">
                                    🏡 <span>首页</span>
                                </div>
                            </li>
                            <Dropdown menu={{items: articleCateMenus}} placement="bottom" arrow>
                                <li>
                                    <div className="my-menu">
                                        📒 <span>文章归档</span>
                                    </div>
                                </li>
                            </Dropdown>
                            <li onClick={() => {
                              history.push('/love')
                            }}>
                                <div className="my-menu">
                                    💘 <span>恋爱笔记</span>
                                </div>
                            </li>
                            <li onClick={() => {
                              history.push('/love')
                            }}>
                                <div className="my-menu">
                                    🌏 <span>旅拍</span>
                                </div>
                            </li>
                            <li onClick={() => {
                              history.push('/love')
                            }}>
                                <div className="my-menu">
                                    💬 <span>聊天室</span>
                                </div>
                            </li>
                            <li onClick={() => {
                              history.push('/love')
                            }}>
                                <div className="my-menu">
                                    📪 <span>留言</span>
                                </div>
                            </li>
                            <li onClick={() => {
                              history.push('/love')
                            }}>
                                <div className="my-menu">
                                    🐟 <span>关于</span>
                                </div>
                            </li>
                            <li onClick={() => {
                              dispatch(setToolbar({visible: true, enter: true}));
                              dispatch(setHeadShowType(2));
                              window.removeEventListener("scroll", onScrollPage);
                              history.push('/editArticle/' + '1')
                            }}>
                                <div className="my-menu">
                                    🎨 <span>创作</span>
                                </div>
                            </li>
                            <li>
                                <Dropdown menu={{items: userMenus()}} placement="bottom" arrow>
                                  {userInfo ? (<Avatar size={32} src={userInfo.headImgUrl} className="user-avatar"></Avatar>)
                                    : (<Avatar size={32} className="user-avatar" src="https://kiwabb-blog.oss-cn-hangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20231031104035.jpg"></Avatar>)}
                                </Dropdown>
                            </li>
                        </ul>
                    }
                    {
                      headShowType === 2 &&
                        <ul className="scroll-menu">
                            <li>
                                <Dropdown menu={{items: userMenus()}} placement="bottom" arrow>
                                    <Avatar src={url} size={32} className="user-avatar"/>
                                </Dropdown>
                            </li>
                        </ul>
                    }
                  </div>
                  : <div></div>}
              </div>
              <div id="outerImg">
                  <div id="innerImg">
                      <img id="bigImg" src=""/>
                  </div>
              </div>
          </TweenOne>}
    </div>
  )
}

export default Header