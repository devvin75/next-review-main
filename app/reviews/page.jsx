//This is the Main Reviews Page
// import StardewValley from './[slug]/page';
import Link from 'next/link';
import Heading from '../components/Heading';
import Image from 'next/image';
import { getMoreReviews, getSlugs } from '@/lib/reviews';

export const metadata = {
  title: 'Reviews',
  description: 'All the reviews'
};

export default async function Reviews() {
  const reviews = await getMoreReviews();
  // console.log('[ReviewsPage] reviews:', reviews)
  
  return (
    <>
      <Heading>Reviews</Heading>
      {/* flex-wrap: It defines whether the flex items are forced 
       in a single line or can be flowed into multiple lines */}
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li key={review.slug}
            className="bg-white 
                       border 
                      rounded 
                      w-80 
                      text-black
                      hover:shadow-xl"          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                width="640"
                height="360"
                className="mb-2 rounded"
              />
              <h2
                className="font-orbitron 
                           py-1 text-center
                           font-semibold"
              >
                {review.title}
              </h2>
            </Link>
          </li>
        ))}

        {/* Refined code to non-repeating 
            <li className='bg-white 
                             border 
                             rounded 
                             w-80 
                             text-black
                             hover:shadow-xl'>
            <Link href="/reviews/stardew-valley">
                <img src="/images/stardew-valley.jpg" 
                     alt=""
                     width="320" 
                     height="180"
                     className="rounded-t"
                />    
                <h2 className='py-1 
                               text-center
                               font-orbitron
                               font-semibold'>
                 StardewValley
                </h2>                   
            </Link>
            </li> */}
      </ul>
    </>
  );
}
/**reviews:  [
  {
    slug: 'hellblade',
    title: 'hellblade',
    date: '2024-05-07',
    image: '/images/hellblade.jpg',
    body: '<p><strong>Hellblade</strong> Each day in Stardew Valley takes around 10 to 20 real minutes, and several of them are occupied by the slow business of starting a farm from scratch. Having to plant the right seeds, water your crops, and wait for the harvest before making any real money means there’s not a lot to do right away. Fitting, since my character had just left a stifling job at the Joja Corporation — Stardew Valley’s ever-present reminder that capitalism can grow soulless — for a simpler life on grandpa’s old farm. But Stardew Valley isn’t simple. It’s relaxed, sure, and lets you grow at your own pace, but it’s a rich world once you get past the slow first season.</p>\n'
  },
  {
    slug: 'hollow-knight',
    title: 'Hollow Knight',
    date: '2024-07-04',
    image: '/images/hollow-knight.jpg',
    body: '<p><strong>Hollow Knight</strong> is a 2017 Metroidvania video game developed and published by independent developer Team Cherry. The player controls the Knight, an insectoid warrior exploring Hallownest, a fallen kingdom plagued by a supernatural disease. </p>\n' +
      '<p>The game is set in diverse subterranean locations, featuring friendly and hostile insectoid characters and numerous bosses. Players have the opportunity to unlock abilities as they explore, along with pieces of lore and flavour text that are spread throughout the kingdom.</p>\n'
  },
  {
    slug: 'stardew-valley',
    title: 'Stardew Valley',
    date: '2024-05-04',
    image: '/images/stardew-valley.jpg',
    body: '<p>My favorite thing about <strong>Stardew Valley</strong> is not just that there’s a lot to see and do, but that it’s (almost) all intertwined. It’s not apparent at first — when I started my farm, I planned each tile for maximum efficiency and reset when I accidentally bought the wrong seeds. But the secret of the Valley is that it’s much more than making each day productive on the farm alone. As I ventured off my plot of 16-bit land and started to explore, I began to really enjoy the days for everything they are — and how its parts fit together to build a captivating rural life.</p>\n' +
      '<p>Each day in Stardew Valley takes around 10 to 20 real minutes, and several of them are occupied by the slow business of starting a farm from scratch. Having to plant the right seeds, water your crops, and wait for the harvest before making any real money means there’s not a lot to do right away. Fitting, since my character had just left a stifling job at the Joja Corporation — Stardew Valley’s ever-present reminder that capitalism can grow soulless — for a simpler life on grandpa’s old farm. But Stardew Valley isn’t simple. It’s relaxed, sure, and lets you grow at your own pace, but it’s a rich world once you get past the slow first season.</p>\n'
  }
]
 * 
 */

/**srcset attribute -- is used for different pixel densities
 * 2x -- will be used for high density screens
 */


