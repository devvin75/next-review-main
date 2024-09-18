import Image from 'next/image';
import Heading from './components/Heading';
import Link from 'next/link';
import { getFeaturedReview } from '../lib/reviews';



export default async function Home() {
  const review = await getFeaturedReview() //
  // console.log("review:", review)
  // console.log('[HomePage] rendering');

  return (
    <>
      <Heading>Indie Games</Heading>
      <p className='pb-3'>
        Only the best indie games, reviewed for you.     
      </p>
      <div
        className="bg-white border rounded w-80 text-black hover:shadow-xl sm:w-full">     
        <Link href={`/reviews/${review.slug}`}
              className='flex flex-col sm:flex-row'>
          <img
            src={review.image}
            alt=""
            width="320"
            height="180"
            className="rounded-t
                      sm:rounded-l
                      sm:rounded-r-none"
                       
          />
          <h2
            className="py-1 
                       text-center
                       font-orbitron
                       font-semibold
                       sm:px-2"
          >           
            {review.title}
          </h2>
        </Link>
      </div>
    </>
  );
}
