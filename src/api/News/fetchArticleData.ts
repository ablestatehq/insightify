import { ArticleType } from "../../utils/types";
import getImageUrl from "../ImageUrl/getImageUrl";
import getArticles from "./getNewsArticles";
// import getText from "./getText";

export async function fetchArticlesData() {

  const res:ArticleType[] = [];
  
  const articles = await getArticles()
  await Promise.all(
    articles.map(async (article: any) => {
      const articleData = {
        articleID: article.id,
        title: article.title.rendered,
        // excerpt: getText(article.excerpt.rendered),
        // articleContent: getText(article.content.rendered),
        featured_image: `${await getImageUrl(article.featured_media) ?? ''}`,
        author: {
          name: "",
          imageUrl: "",
          ID: ""
        },
        publishedAt: article.date
      }
      // res.push(articleData);
    })
  );

  return res;
}