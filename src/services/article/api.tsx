import {request} from "@umijs/max";


export async function submitArticle(body:ARTICLE.EditArticle,  options?: {[key: string]: any}) {
  return request<SYSTEM.OptionalResult<void>>('/api-article/article', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function querySortInfo(options?: {[key: string]: any}) {
  return request<SYSTEM.OptionalResult<ARTICLE.SortInfo[]>>('/api-article/category/sortInfo', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function querySortArticles(options?: {[key: string]: any}) {
  return request<SYSTEM.OptionalResult<ARTICLE.SortArticles>>('/api-article/article/sortArticles', {
    method: 'GET',
    ...(options || {}),
  })
}