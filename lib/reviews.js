import { readdir } from 'node:fs/promises';
import { marked } from 'marked';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function getFeaturedReview() {
  const reviews = await getMoreReviews();
  return reviews[0];
}

export async function getReview(slug) {
  const url = `${CMS_URL}/api/reviews?`
    + qs.stringify(
    //   {
    //   filters: { slug: { $eq: slug } },
    //   fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    //   populate: { image: { fields: ['url'] } },
    //   pagination: { pageSize: 1, withCount: false },
    // }, 
    { encodeValuesOnly: true });
  // console.log('getReview:', url);
  // const response = await fetch(url);
  const { data } = await fetchReviews(
    {
      filters: { slug: { $eq: slug } },
      fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
      populate: { image: { fields: ['url'] } },
      pagination: { pageSize: 1, withCount: false },
    },
  );
  const item = data[0]; //THE FIRST ITEM IN THE ARRAY
  return {
  //   slug: attributes.slug,
  //   title: attributes.title,
  //   date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
  //   image: CMS_URL + attributes.image.data.attributes.url,
  //   body: marked(attributes.body), //marked is a markdown parser
  // };

  //WE WILL JUST EXPAND THIS BY USING THE SPREAD SYNTAX
  ...toReview(item),
  body:marked(item.attributes.body, {headerIds:false, mangle:false})
  };
}

export async function getMoreReviews() {
  // const url = `${CMS_URL}/api/reviews?`
  //   + qs.stringify({
  //     fields: ['slug', 'title', 'subtitle', 'publishedAt'],
  //     populate: { image: { fields: ['url'] } },
  //     sort: ['publishedAt:desc'],
  //     pagination: { pageSize: 6 },
  //   }, { encodeValuesOnly: true });
  // console.log('getReviews:', url);
  // const response = await fetch(url);
  // 
  const { data } = await fetchReviews(
    {
      fields: ['slug', 'title', 'subtitle', 'publishedAt'],
      populate: { image: { fields: ['url'] } },
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 6 },
    }
  );
  return data.map(toReview); //converting it to our own object type
}

export async function getSlugs() {
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}


// This is an internal function that is not exported
async function fetchReviews(parameters) {
  const url = `${CMS_URL}/api/reviews?`
    //We can make this function make different requests by passing different parameters
    // We always fetch the same endpoint, but we can pass different parameters
     + qs.stringify(parameters, { encodeValuesOnly: true });
    //{
    //   fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    //   populate: { image: { fields: ['url'] } },
    //   sort: ['publishedAt:desc'],
    //   pagination: { pageSize: 6 },
    // }, 
    // { encodeValuesOnly: true });
  console.log('[fetchReviews]:', url);
  const response = await fetch(url);

  // CHECKING IF RESPONSE IS OK OR 404  IF THE RESOURCE DOES NOT EXIST OR 500 ERROR
  if(!response.ok){
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }

  return  await response.json(); //How to extract the data will be different in each case  
}
//IT WILL TAKE AN 'item' AS RETURNED BY THE CMS AMD CONVERT IT INTO A CUSTOM OBJECT EXTRACTING THE RIGHT PROPERTIES FROM THE CMS ATTRIBUTES
function toReview(item){ //This is a helper function that is not exported
  return{
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + item.attributes.image.data.attributes.url,
  };
}