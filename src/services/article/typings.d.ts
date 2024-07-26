declare namespace ARTICLE {
  type SortInfo = {
    id: string;
    sortName: string;
  }
  type SortArticles = {
    [key: string] : Array<Article>
  }
  type Article = {
    id: string;
    name: string;
    articleCover: string;
    createTime: string;
    articleTitle: string;
    viewCount: string;
    commentCount: string;
    likeCount: string;
    articleContent: string;
    cateId: string;
    cate: Cate;
    tagId: string;
    tag: Tag;
  }
  type Cate = {
    id: string;
    cateName: string;
  }

  type Tag = {
    id: string;
    tagName: string;
  }

  type EditArticle = {
    id?:string;
    articleTitle:string;
    articleVideo:string;
    articleContent: string;
    articleCover?:string;
    categoryId: string;
    tagIdList: [];
  }

}