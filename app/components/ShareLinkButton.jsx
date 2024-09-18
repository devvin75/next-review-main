
import React, {useState} from 'react';
import { LinkIcon } from '@heroicons/react/20/solid'

export default function ShareLinkButton(){
    const [clicked, setClicked] = useState(false);
    
    const handleClick = () => {       
        //Pass the page url that us visible in the browser address bar
        navigator.clipboard.writeText(window.location.href)  //location.href returns the entire URL
        setClicked(true);
        setTimeout(() => setClicked(false), 10000);
    }    
    return(
        <button onClick={handleClick} 
            className="flex 
                       gap-1
                       items-center
                       border 
                       px-2 
                       py-1 
                       rounded 
                     text-slate-500 
                       text-sm
                     hover:bg-orange-100
                     hover:text-slate-700">
            <LinkIcon className="h-4 w-4"/>
            {clicked ? 'Link copied!' : 'Share Link'}
        </button>
    );
}

/**The process of rendering a component on the browser after
 * it was already pre-rendered on the server is called **hydration**.
 */