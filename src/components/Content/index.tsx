import React, {useEffect, useState} from "react";
import indexImage from "@//assets/img/index-image.jpg"
import "./index.less"
import "@/assets/css/animation.less"
import env from "@/env"
import Printer from "@/components/Printer";
import {DownOutlined} from "@ant-design/icons";
import Aside from "@/components/Aside";
import SortArticle from "@/components/SortArticle";
import {querySortArticles, querySortInfo} from "@/services/article/api";
import {message} from "antd";

const Content: React.FC<SYSTEM.HeaderProps> = () => {
  const [guShi, setGuShi] = useState(null);
  const [printerInfo, setPrinterInfo] = useState<string>("你看对面的青山多漂亮");
  const [showAside, setShowAside] = useState(true);
  const [indexType, setIndexType] = useState(1)
  const [sortInfo, setSortInfo] = useState<ARTICLE.SortInfo[]|undefined>([
    {
      id: "1",
      sortName: " 推荐文章 "
    },
    {
      id: "2",
      sortName: " 视听盛宴 "
    }
  ])


  const [sortArticles, setSortArticles] = useState<ARTICLE.SortArticles|undefined>({
    "1": [
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      }
    ],
    "2": [
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      },
      {
        id: "1",
        name: "123",
        articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg",
        createTime: "2024-01-10 17:19:21",
        articleTitle: "生活倒影 | 我的个人博客",
        viewCount: "12",
        commentCount: "9",
        likeCount: "10",
        articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说",
        cateId: "1",
        tagId: "1",
        tag: {id: "1", tagName: "源码"},
        cate: {id: "1", cateName: "Java"}
      }
    ]
  })
  const notices = ["欢迎光临！", "部署文档：https://poetize.cn/article/26"]


  const getGuShi = () => {
    fetch(env.jinrishici)
      .then(response => response.json())
      .then(data => {
        setGuShi(data);
        setPrinterInfo(data.content);
      })
      .catch(error => console.error('Error fetching guShi:', error));
  };

  const getSortInfo = async () => {
    const result = await querySortInfo();
    if (result.respCode === 1) {
      setSortInfo(result.data)
    } else {
      message.error(result.respMsg)
    }
  }


  const getSortArticles = async () => {
    const result = await querySortArticles();
    if (result.respCode === 1) {
      setSortArticles(result.data)
    } else {
      message.error(result.respMsg)
    }
  }
  useEffect(() => {
    getGuShi();
    getSortInfo()
    getSortArticles()
  }, []);


  useEffect(() => {
  }, [printerInfo]);


  const navigation = (selector: any) => {
    let pageId = document.querySelector(selector);
    window.scrollTo({
      top: pageId.offsetTop,
      behavior: "smooth"
    });
  }
  const selectSort = () => {

  }

  const selectArticle = () => {

  }


  return (<div>
    <img
      className="index-image"
      src={indexImage}
      alt={"首页图片"}></img>
    {/*  首页文字*/}
    <div className="signature-wall myCenter my-animation-hideToShow">
      <h1 className="playful">
        <span>JackMouse</span>
        <span>欢迎</span>
      </h1>
      <div className="printer" onClick={getGuShi}>
        <Printer
          key="Printer"
          printerInfo={printerInfo}
        >
        </Printer>
      </div>
      <div className="bannerWave1"></div>
      <div className="bannerWave2"></div>
      <DownOutlined className="el-icon-arrow-down" onClick={() => {
        navigation('.page-container-wrap')
      }}/>
    </div>
    {/*  首页内容*/}
    <div className="page-container-wrap">
      <div className="page-container">
        {showAside && (
          <div className="aside-content">
            <Aside
              selectSort={selectSort}
              selectArticle={selectArticle}
            ></Aside>
          </div>)}
        <div className="recent-posts">
          <div className="announcement background-opacity">
            <i className="fa fa-volume-up" aria-hidden="true">12</i>
            <div>
              {notices.map((notice, index) => (
                <div key={index}>
                  {notice}
                </div>
              ))}
            </div>
          </div>

          {/*  文章列表*/}
          {indexType === 1 && (
            <div>
              {sortInfo.map((sort, index) => (
                <div>
                  <div>
                    <div className="sort-article-first">
                      <div>
                        <svg viewBox="0 0 1024 1024" width="20" height="20" className="sort-svg">
                          <path
                            d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
                            fill="#FF623E"></path>
                        </svg>
                        {sort.sortName}
                      </div>
                      <div className="article-more" onClick={() => {
                      }}>
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             className="sort-svg">
                          <path
                            d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
                            fill="#009F72"></path>
                          <path
                            d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
                            fill="#F9DB88"></path>
                        </svg>
                        MORE
                      </div>
                    </div>
                    <SortArticle
                      articleList={sortArticles[sort.id]}
                    ></SortArticle>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>)
}
export default Content;