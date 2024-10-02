//CONTAINS ALL THE INDIVIDUAL PAGES FOR THE REVIEW 
import Image from 'next/image';
import { Share } from 'next/font/google';
import Heading from '../../components/Heading';
import {getReview, getSlugs} from '@/lib/reviews';
import ShareButtons from '../../components/ShareButton';


// GENERATE STATIC PAGES FOR THE FOLLOWING SLUGS EVEN IF USING SYNAMIC ROUTES
/**This can be used in combination with dynamic route segments
 * to "statically" generate routes at "build time" instead of 
 * on-demand at request time.  
 * 
 * generateStaticParams should return an "array of objects" <<==
 * where each object represents the populated dynamic segments 
 * of a single route.
 * */
export async function generateStaticParams(){  //SERVER WILL NOT RE-RENDER THE PAGE
   //return an array specifying which routes are valid
   //  slugs: [ 'hellblade', 'hollow-knight', 'stardew-valley' ]
   const slugs = await getSlugs();   
   console.log('[ReviewPage] generateStaticParams: ', slugs)
   // "array of objects" 
   return slugs.map((slug) => ({slug})); //slug is the object literal 
   // return [
   //    {slug:'hellblade'},
   //    {slug:'hollow-knight'}
   // 
}
// Fetch metadata that requires "dynamic" data
export async function generateMetadata({params:{slug}}){
   const review = await getReview(slug);
   return {
      title:review.title
   };
}

//Reviews page props: { params: { slug: 'hollow-knight' }, searchParams: {} }
/** DYNAMIC ROUTE - 
 *  By making the ReviewPage function asynchronous, you can ensure that 
 *  the page   doesn't render until the review data is available, which can
 *  improve the  perceived performance of your application.*/ 
export default async function ReviewPage({params:{slug}}){ 
/**In production it prefetches all the links */    
//See comment below
  const review = await getReview(slug);
//   console.log('[ReviewPage] rendering', slug);
  return(
        <>
          <Heading>{review.title}</Heading>
          <div className='flex gap-3 items-baseline'> 
          <p>{review.date}</p>
          <ShareButtons/>
          </div>
          {/* Original size is 1280x720 */}
          <Image src={review.image}
             alt=""
             width="640" 
             height="360"
             className="mb-2 rounded"
          />        
          <article dangerouslySetInnerHTML={{__html:review.body}} 
           className='prose prose-stone max-w-screen-sm'/>
        </>
    )
}

{
   /* dangerouslySetInnerHTML:
              This is a React property that allows you to inject raw HTML
              content into a component. 
              
              __html: 
              The double underscores (__) in __html are not technically 
              required for dangerouslySetInnerHTML to work in React.
              
              1.)Convention: 
                 It's a common practice in React to use double underscores (__) 
                 for keys that hold HTML content within JSX.
                 
                 This helps developers identify these specific keys and be aware 
                 of the potential security risks associated with using 
                 dangerouslySetInnerHTML.

              2.)Security Reminder: 
                 The double underscores act as a visual cue, 
                 reminding developers that they're dealing with potentially 
                 dangerous content. 
                 
                 This can help prevent accidental security vulnerabilities by 
                 making the code more self-documenting.*/}

/**In the code import { readFile } from 'node:fs/promises',
 * the colon (:) serves a specific purpose within JavaScript modules
 * and the new module system introduced in Node.js versions 12 and above.
 * 
 *  Here's a breakdown:

Module Exports and Imports:

In JavaScript, modules can export values using the export keyword.
These exported values can then be imported by other modules
using the import statement.

There are two main types of exports:
1.)Default Exports:
   A module can have only one default export, which is imported 
   without curly braces ({}). 
    For example: export default function add(a, b) { ... }

2.)Named Exports: 
   A module can have multiple named exports, which are imported using 
   curly braces ({}) and specifying the desired export names.
   
   For example: 
   export function add(a, b) { ... }; 
   export function subtract(a, b) { ... }

Understanding the Colon (:)

In your code:

JavaScript
import { readFile } from 'node:fs/promises';

The node:fs/promises part refers to the module you're importing from. 

It likely provides functionalities related to the file system 
and promises (asynchronous operations).

The curly braces {} indicate that you're importing a named export.

The colon : separates the module path from the specific named export 
you want to import. 

In this case, you're only importing the readFile function from the fs/promises module.
Alternative Syntax (Without Colon):

If the module only has one named export and you want to import it with the same name,
you can omit the colon and curly braces:

JavaScript
import readFile from 'node:fs/promises'; // Assuming there's only one named export

Benefits of Named Exports and Colons:

Clarity and Maintainability:
 Using named exports and colons makes your code more readable and maintainable.
 
 It explicitly specifies which named exports you're importing, 
 avoiding potential naming conflicts, especially when importing from modules
 with many exports.

 Selective Imports: 
 You can import only the specific functions or variables you need from a module, 
 reducing bundle size and improving application performance.

In summary, the colon (:) in the import statement acts as a separator 
between the module path and the specific named export you're importing, 
promoting clarity and allowing for selective imports in modern JavaScript modules.
 * 
 */


/**Named exports are a fundamental mechanism for sharing functionality
 * between JavaScript modules.
 * 
 * They allow you to export specific variables, functions, or classes 
 * from a module and import them by their designated names into other modules. 
 * 
 * This approach offers several advantages:

1. Modularization and Organization:
   By exporting only the necessary components, you create well-structured modules
   that focus on specific tasks. 
   
   This improves code organization and maintainability.

2. Selective Imports:
   You can import only the functionality you need from a module, 
   reducing bundle size and improving application performance. 
   
   This is particularly beneficial for large modules with many exports.

3. Avoiding Naming Conflicts:
   When you import using named exports, you explicitly specify the names
   you want to use in your module. 
   
   This avoids potential conflicts with variables or functions that might have 
   the same names in other modules.

Creating Named Exports:

To create named exports, you use the export keyword followed by the name 
you want to give to the exported value:

JavaScript
// module-a.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

export class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

In this example, module-a.js exports three named items:

add: A function that adds two numbers.
PI: A constant value for Pi.
User: A class representing a user.

Importing Named Exports:

To import named exports from another module, you use the import statement
with curly braces ({}) and specify the desired export names:

JavaScript
// module-b.js
import { add, PI } from './module-a.js';
import { User } from './module-a.js'; // Alternative syntax for multiple imports

const result = add(5, 3);
console.log(result); // Output: 8

const user1 = new User('Alice');
user1.greet(); // Output: Hello, my name is Alice

Here, module-b.js imports two specific named exports from module-a.js: 
the add function and the PI constant.

It also imports the User class using a separate import statement 
(alternative syntax for clarity).

Benefits Recap:

1.Modularization: Break down code into reusable components.
2.Selective Imports: Import only what you need.
3.Reduced Bundle Size: Smaller code improves application performance.
4.Conflict Avoidance: Explicit names prevent unintended clashes.
  By effectively utilizing named exports, you can create well-structured, 
  maintainable, and efficient JavaScript modules, 
  leading to cleaner and more scalable applications. 
 */


/**I'd be glad to explain dangerouslySetInnerHTML in React:

What it is:
>>dangerouslySetInnerHTML is a property in React that allows you to 
"inject" HTML content directly into a component.<< 

It's similar to using the browser DOM's innerHTML property.

What it does:

When you use dangerouslySetInnerHTML, React sets the HTML content of the element 
without processing it.

>>This means any HTML you provide, including potentially unsafe code like scripts,
will be rendered as-is.<<



Why and when to use it (with caution):

Use dangerouslySetInnerHTML sparingly and only as a last resort. 

It's generally considered a security risk because it opens the door 
to Cross-Site Scripting (XSS) vulnerabilities. 

If untrusted or unsanitized HTML is injected, malicious scripts could be executed
in the user's browser, potentially stealing data or compromising their system.

Here are some limited scenarios where dangerouslySetInnerHTML might be necessary 
(but prioritize safer alternatives if possible):
1.)Rendering rich text content from a third-party source (e.g., a CMS) 
   that you don't have full control over (sanitize rigorously!).

2.)Implementing third-party libraries that rely on dangerouslySetInnerHTML 
   internally (carefully evaluate the library's security practices).

   Better alternatives:

In most cases, there are safer and more React-friendly ways to achieve 
the desired outcome:

1.)JSX: 
   For basic HTML structures and styling, leverage JSX, React's syntax extension 
   for creating components that resemble HTML.

2.)Controlled Components: 
   If you need to dynamically update content based on user input, 
   use controlled components where the component maintains the state of the content 
   and updates the DOM accordingly. 
   
   This approach is safer and aligns better with React's philosophy.

3. Libraries for Sanitized HTML Rendering:
   If you must render HTML content from external sources, consider using 
  libraries like DOMPurify or react-html-parser that sanitize the HTML 
  before rendering it. 
  
  These libraries help mitigate XSS risks.

Key takeaway:
dangerouslySetInnerHTML is a powerful but potentially risky tool.

Use it with extreme caution and only when absolutely necessary. 

Always prioritize safer alternatives like JSX, controlled components, 
and sanitized HTML rendering libraries.

By understanding the security implications and exploring safer options, 
you can develop more secure and maintainable React applications.
   * 
   */


/**What is getStaticProps?

Imagine you have a page that displays a list of products. 

getStaticProps is a special function in Next.js that allows you to fetch data 
(like product information) during the build process. 
This means Next.js fetches the data before the website is even deployed, 
and then uses that data to pre-render the page with the product list.

Benefits of getStaticProps:

1.)Faster Loading: 
Since the page is already pre-rendered with the data, 
it loads instantly for visitors, providing a smooth user experience.

2.)SEO Friendly: 
Pre-rendered pages are generally better for search engine optimization (SEO)
because search engines can easily crawl and understand the content.


Why Doesn't it Work in the App Router?

The app router in Next.js 14 is designed for different purposes:

1.)Global State Management: 
   It's meant for managing data that applies across your entire application,
   like user authentication or shopping cart information.

2.)Application-Wide Logic: 
   It's used for defining reusable components and logic that can be accessed
   by all pages in your app.

   getStaticProps relies on the build process, which happens before your application runs. However, the app router components are meant to be dynamic and run on the server or client-side whenever a user interacts with your app. This mismatch creates a problem:

If you try to use getStaticProps in the app router, 
the data fetching would happen during build time, but the app router components 
are not available during the build.

This would lead to errors and prevent your app from working as expected.
 * 
 */


/**Front Matter
 * Front-matter in Web Development

Frontmatter is not directly related to Tailwind CSS itself.

It's a concept used in static site generators (SSGs) like Jekyll, Hugo, or Eleventy,
which can be integrated with Tailwind CSS for building websites.

What is Frontmatter?
--Frontmatter is a way to EMBED metadata or configuration information at the beginning 
of a file, typically Markdown files. 

It's delimited by special markers, often triple dashes (---).

The content within these markers is parsed as YAML (YAML Ain't Markup Language)
or TOML (Tom's Obvious, Minimal Language), which are human-readable data formats.


Example (YAML):

Markdown
---
title: My Blog Post
date: 2024-05-07
author: John Doe
---

This is the content of my blog post.

What Does Frontmatter Do?

1.)Provides Metadata: 
Frontmatter allows you to store information about the file itself, such as title, author, 
date, tags, categories, etc.

This metadata can be used by the SSG to generate things like page titles, headers,
navigation menus, or feed entries.

2.)Custom Configuration: 
Frontmatter can also be used to define custom configuration options for the SSG or 
your Tailwind setup within the context of that particular file. 

This might include specifying a different layout template, enabling/disabling certain features,
or overriding default Tailwind settings for that specific page.

Why Do You Need to Know It (as a React Trainee)?

Understanding Static Site Generation: 
While you might primarily focus on React for interactive components, 
understanding SSGs can be beneficial. 

They're a great choice for content-heavy websites where SEO and performance are crucial.

Frontmatter is a core concept in SSGs, so knowing about it will broaden your understanding
of web development.

Integration with React Applications: 
Tailwind CSS can be seamlessly integrated into React projects.
If you're working on a hybrid project that combines React components with 
statically generated content, frontmatter might be used to manage content within 
those static pages.

Key Points:

Frontmatter is not specific to Tailwind CSS, but it's relevant when using Tailwind with SSGs.
It provides a way to store metadata and configuration options for SSGs or Tailwind within Markdown files.
Understanding frontmatter can be helpful for working with SSGs and hybrid React-SSG projects.
If you're interested in learning more about SSGs and frontmatter, I recommend exploring the documentation of your preferred SSG or searching online for tutorials.

Imagine you're creating content for a website, like a blog post or a product description. 
Front-matter acts as a "hidden compartment" at the beginning of your content file, 
typically written in Markdown format.  

It STORES metadata – information about the content itself –  
separate from the actual text or code that gets displayed on the webpage.

Here's a closer look:

Location:  
  Front-matter resides at the very beginning of the content file.

Content:  
  It holds key information about the webpage content,  like:

Title: The title displayed on the webpage and used for search engines.
Date: Publication date or last update date.
Tags: Keywords or categories associated with the content for organization.
Draft: A flag indicating if the content is a draft or ready for publication.
Author: The author's name or information (optional).
Data Format:  Front-matter uses formats like YAML (YAML Ain't Markup Language), TOML (Tom's Obvious, Minimal Language), or JSON (JavaScript Object Notation).  These formats allow structured data storage using key-value pairs.

Benefits of Front-matter:

Content Management: Separating metadata from the actual content makes managing and updating website content much easier. Imagine changing the title of a blog post – you can modify it in the front-matter without touching the main content.
Dynamic Websites: Static Site Generators (SSGs) and some Content Management Systems (CMS) leverage front-matter data to dynamically generate webpages. For instance, an SSG can use the title from the front-matter to create the webpage title, and the date can be displayed alongside the content.
SEO Optimization: Front-matter data like titles and descriptions can be used to improve a webpage's SEO ranking in search engines.
Example with YAML:

YAML
---
title: My Awesome Blog Post
date: 2024-05-04
author: John Doe
tags: [webdev, markdown]
---

This is the main content of my blog post...
Use code with caution.
content_copy
In this example, the YAML section at the beginning defines the front-matter data.  The title, date, author, and tags are specified as key-value pairs.  The content for the webpage follows the separator line (---).

By effectively using front-matter, you can streamline your website content management and create a more dynamic and informative web presence

 */

/**Data serialization 
 * --is the process of converting complex data structures into a format 
 *   that can be easily:

1.)Stored: Saved on a disk or other storage devices.

2.)Transmitted: Sent across networks from one program to another.

3.)Reconstructed: Recreated later in its original form, possibly even 
   on a different system.

Imagine you have a complex object in your program that contains information about a user, 
like their name, address, and purchase history. 

Serialization takes that object and transforms it into a format 
that's more like a flat list or a stream of bytes. 

This makes it easier to store the data efficiently or send it over a network.


Here's a breakdown of the key points about data serialization:

Why Serialize? There are several reasons to serialize data:
Frontmatter is not directly related to Tailwind CSS itself. It's a concept used in static site generators (SSGs) like Jekyll, Hugo, or Eleventy, which can be integrated with Tailwind CSS for building websites.

What is Frontmatter?

Frontmatter is a way to embed metadata or configuration information at the beginning of a file, typically Markdown files. It's delimited by special markers, often triple dashes (---). The content within these markers is parsed as YAML (YAML Ain't Markup Language) or TOML (Tom's Obvious, Minimal Language), which are human-readable data formats.

Example (YAML):

Markdown
---
title: My Blog Post
date: 2024-05-07
author: John Doe
---

This is the content of my blog post.
Use code with caution.
content_copy
What Does Frontmatter Do?

Provides Metadata: Frontmatter allows you to store information about the file itself, such as title, author, date, tags, categories, etc. This metadata can be used by the SSG to generate things like page titles, headers, navigation menus, or feed entries.
Custom Configuration: Frontmatter can also be used to define custom configuration options for the SSG or your Tailwind setup within the context of that particular file. This might include specifying a different layout template, enabling/disabling certain features, or overriding default Tailwind settings for that specific page.
Why Do You Need to Know It (as a React Trainee)?

Understanding Static Site Generation: While you might primarily focus on React for interactive components, understanding SSGs can be beneficial. They're a great choice for content-heavy websites where SEO and performance are crucial. Frontmatter is a core concept in SSGs, so knowing about it will broaden your understanding of web development.
Integration with React Applications: Tailwind CSS can be seamlessly integrated into React projects. If you're working on a hybrid project that combines React components with statically generated content, frontmatter might be used to manage content within those static pages.
Key Points:

Frontmatter is not specific to Tailwind CSS, but it's relevant when using Tailwind with SSGs.
It provides a way to store metadata and configuration options for SSGs or Tailwind within Markdown files.
Understanding frontmatter can be helpful for working with SSGs and hybrid React-SSG projects.
If you're interested in learning more about SSGs and frontmatter, I recommend exploring the documentation of your preferred SSG or searching online for tutorials.
Persistence: Persisting program state or user data by saving it to a file.
Communication: Exchanging data between different programs or systems, even if they're written in different languages.
Remote Storage: Storing data in databases or cloud storage.
Common Serialization Formats:  Some popular data serialization formats include:

JSON (JavaScript Object Notation): A human-readable format using key-value pairs and widely used for web development.
XML (Extensible Markup Language): A more structured format with tags and attributes, often used for data exchange between different systems.
YAML (YAML Ain't Markup Language): A human-readable format similar to JSON but using indentation for hierarchy, often used for configuration files.

pen_spark

 * 
 */

/**
 * 1.)Async Nature of getReview: 
 * The getReview function is declared as async, indicating it deals with 
 * asynchronous operations (like reading a file using readFile). 
 * 
 * It likely returns a Promise that resolves with the review data 
 * ({title, date, image, body}).
 * 
 * 2.)await Ensures Completion: 
 * Inside the StardewValley function, you're using 
 * const review = await getReview();.
 * 
 * The await keyword here "pauses" the execution of StardewValley until the 
 * Promise returned by getReview resolves. 
 * 
 * >> This ensures that the review variable actually has the data before you try
 * to access its properties (title, date, etc.) within the JSX elements.<<
 * 
 * Without await, the code might continue execution even if getReview hasn't 
 * finished fetching the data. 
 * 
 * This could lead to errors if you try to use properties from an 
 * undefined review object.
 * 
 * 3.)Chaining Asynchronous Operations:
 *  Although getReview is likely the only asynchronous operation in this example,
 *  await is essential for handling any potential asynchronous behavior 
 *  within getReview. 
 * 
 * It establishes a cleaner and more readable pattern for dealing with 
 * asynchronous code.
 * 
 * In summary, using await with getReview guarantees that the StardewValley
 * function doesn't proceed until the review data is fully retrieved and available.
 * 
 * It prevents potential errors and ensures your component renders with the correct
 * information. */

/**   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
   Generating static pages (0/7)  [    ][HomePage] rendering
[HomePage] rendering
 ✓ Generating static pages (7/7)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization    

Route (app)                              Size     First Load JS
┌ ○ /                                    5.29 kB          99 kB
├ ○ /_not-found                          871 B          87.8 kB
├ ○ /about                               178 B          93.9 kB
├ ○ /reviews                             178 B          93.9 kB
└ ƒ /reviews/[slug]                      178 B          93.9 kB
+ First Load JS shared by all            86.9 kB
  ├ chunks/23-b6b066db8b1efede.js        31.4 kB
  ├ chunks/fd9d1056-2821b0f0cabcd8bd.js  53.6 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

//////////////////////////////////////////////////////////
Symbol Meaning:

The symbol ƒ in the output of your Next.js build process
indicates a dynamic route. 

This means that the route /reviews/[slug] can handle URLs with a 
variable slug portion after /reviews/. 

For example, it could match URLs like:

/reviews/awesome-product
/reviews/another-great-item

Code Snippet Breakdown:

The code snippet you provided shows the output of a
Next.js build process.

Here's a breakdown of the relevant parts:

1.)Creating an optimized production build ...: 
This line indicates that Next.js is building 
your application for production.

2.)Compiled successfully:
 This confirms that your code has been successfully 
 compiled into JavaScript.

3.)Linting and checking validity of types: 
This means that Next.js has checked your code for potential errors
and type mismatches (if you're using TypeScript).

4.)Collecting page data: 
This step involves gathering data for all the pages in your application.

5.)Generating static pages (0/7) ... (7/7):
 Next.js attempts to pre-render as many pages as possible as static HTML
 for faster loading times. 
 The numbers indicate the progress and completion of this step.

6.)Collecting build traces: 
This might involve gathering information about any errors 
or warnings encountered during the build process.

7.)Finalizing page optimization:
Next.js performs final optimizations on your application to ensure 
its efficiency.

8)Route (app): 
This section shows information about the routes defined in your Next.js
application.

9.)Size: 
This column displays the estimated size of the initial HTML file 
for each route.

First Load JS: 
This column shows the estimated size of the JavaScript code that
needs to be downloaded in the browser for the initial rendering 
of each route.

○ (Static): 
This symbol indicates that a route is pre-rendered as static HTML,
meaning it's already generated at build time and can be served directly 
by the server without any server-side rendering.

ƒ (Dynamic): 
This symbol signifies a dynamic route that is server-rendered on demand.
When a user requests a URL with a specific slug value, Next.js executes
your code to generate the HTML content tailored to that specific slug.

Key Points:

Dynamic routes allow for flexible URLs that can handle a wider range
of content.

Next.js pre-renders static pages whenever possible for better performance.

>>Dynamic routes are server-rendered<<
for flexibility but might require slightly more processing power.
 */


































