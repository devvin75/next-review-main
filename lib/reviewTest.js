import { readdir } from 'node:fs/promises';
import { marked } from 'marked';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';


export async function getFeaturedReview() {
    const reviews = await getMoreReviews();
    return reviews[0];
  }

  export async function getReview(slug) {
    // const url = `${CMS_URL}/api /reviews?` + qs.stringify({
    //     filters:{slug:{$eq:slug}},
    //     fields:['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    //     populate:{image:{fields:['url']}},
    //     pagination:{pageSize:1, withCount:false}
    // }, {encodeValuesOnly:true});    
    // console.log('getReview', url);
    // const response = await fetch(url);

    const url = `${CMS_URL}/api/reviews?`
    + qs.stringify({ encodeValuesOnly: true });
    
    // const {data} = await response.json();  replacing
       const {data} = await fetchReviews(
        {
            filters:{slug:{$eq:slug}},
            fields:['slug', 'title', 'subtitle', 'publishedAt', 'body'],
            populate:{image:{fields:['url']}},
            pagination:{pageSize:1, withCount:false}
        }
       );

     //get the first element of the data array
    const {item} = data[0];
    
    // convert to objects
    return {
        // slug:attributes.slug,
        // title:attributes.title,
        // date:attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        // image:CMS_URL + attributes.image.data.attributes.url,

    ...toReview(item),

        // parsing mark down to HTML
        body:marked(item.attributes.body, {headerIds:false, mangle:false}),
    }    
    
}

export async function  getMoreReviews(){
    /**We no longer need to know which URL to call here or how to encode the parameters*/
    // const {data} = await response.json(); replacing this part
    const {data} = await fetchReviews({
        fields:['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate:{image:{fields:['url']}},
        sort:['publishedAt:desc'],
        pagination:{pageSize:6},
    });

    return data.map(toReview)

}



export async function getSlugs() {
    const files = await readdir('./content/reviews');
    return files.filter((file) => file.endsWith('.md'))
      .map((file) => file.slice(0, -'.md'.length));
  }


async function fetchReviews(parameters){
    //We can make this function make different request with different options 
    // and fetch the same endpoint with""DIFFERENT" parameters
    const url = `${CMS_URL}/api/reviews?` + qs.stringify( parameters, {encodeValuesOnly:true});
    console.log('[fetchreviews]:', url)
    const response = await fetch(url);

   // CHECKING IF RESPONSE IS OK OR 404  IF THE RESOURCE DOES NOT EXIST OR 500 ERROR
//   if(!response.ok){
//     throw new Error(`CMS returned ${response.status} for ${url}`);
//   }


    return await response.json()    
}


//IT WILL TAKE AN 'item' AS RETURNED BY THE CMS AMD CONVERT IT INTO A CUSTOM OBJECT EXTRACTING THE RIGHT PROPERTIES FROM THE CMS ATTRIBUTES
// when calling to review we can pass a full CMS object
//IT WILL TAKE AN 'item' AS RETURNED BY THE CMS AMD CONVERT IT INTO A CUSTOM OBJECT EXTRACTING THE RIGHT PROPERTIES FROM THE CMS ATTRIBUTES
function toReview(item){ //This is a helper function that is not exported
    return{
      slug: item.attributes.slug,
      title: item.attributes.title,
      date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
      image: CMS_URL + item.attributes.image.data.attributes.url,
    };
  }