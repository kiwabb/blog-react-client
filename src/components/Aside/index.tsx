import React from "react";
import {Avatar} from "antd";
import './index.less'
import {history} from "@umijs/max";

interface AsideProps {
  selectSort: () => void;
  selectArticle: () => void;
}

const Aside:React.FC<AsideProps> = () => {
  const url = 'https://file.poetize.cn/webAvatar/Sara116383637867956';
  let recommendArticles:Array<ARTICLE.Article> = [
    {id: "1", name: "123", articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg", createTime: "2024-01-10 17:19:21", articleTitle: "生活倒影 | 我的个人博客", viewCount: "12", commentCount: "9", likeCount: "10", articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说", cateId: "1", tagId: "1", tag: {id: "1", tagName: "源码"}, cate: {id: "1", cateName: "Java"}},
    {id: "1", name: "123", articleCover: "https://s1.ax1x.com/2022/12/04/zsKgDs.jpg", createTime: "2024-01-10 17:19:21", articleTitle: "生活倒影 | 我的个人博客", viewCount: "12", commentCount: "9", likeCount: "10", articleContent: "休假后的第一件事就是出去旅游啦，哈哈哈，这是一篇迟到的孕中期旅游分享贴！\\n\\n当时是18-19w，孕中期后孕反消失，感觉身轻如燕且孕期检查都一路绿灯，于是就直接说", cateId: "1", tagId: "1", tag: {id: "1", tagName: "源码"}, cate: {id: "1", cateName: "Java"}}
  ];
  return (<div>
  {/*  网站信息*/}
    <div className="card-content1 shadow-box background-opacity">
      <Avatar src={url} size={120} className="user-avatar" style={{marginTop: '20px'}}/>
      <div className="web-name">JACKMOUSE</div>
      <div className="web-info">
        <div className="blog-info-box">
          <span>文章</span>
          <span className="blog-info-num">50</span>
        </div>
        <div className="blog-info-box">
          <span>分类</span>
          <span className="blog-info-num">5</span>
        </div>
        <div className="blog-info-box">
          <span>访问量</span>
          <span className="blog-info-num">1000</span>
        </div>
      </div>
      <a className="collection-btn">
        <i className="el-icon-star-off" style={{marginRight: '2px'}}></i>朋友圈
      </a>
    </div>

  {/*  推荐文章*/}
    <div
      className="shadow-box background-opacity wow recommend"
    >
      <div className="card-content2-title">
        <i className="el-icon-reading card-content2-icon"></i>
        <span>推荐文章</span>
      </div>
      {recommendArticles.map((article, index) => (
        <div key={index} onClick={() => { history.push('/article?id=' + article.id) }}>
          <div className="aside-post-detail">
            <div className="aside-post-image">
              <img className="article-img" src={article.articleCover} alt={"加载失败"}></img>
            </div>
            <div className="aside-post-title">
              { article.articleTitle }
            </div>
          </div>
          <div className="aside-post-date">
            <i className="el-icon-date aside-icon"></i>{ article.createTime }
          </div>
        </div>
      ))}
    </div>
  </div>)
}

export default Aside