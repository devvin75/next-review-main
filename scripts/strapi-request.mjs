import {writeFileSync} from 'node:fs';
import qs from 'qs';

// Mjs is telling node to enable ES6 module support
const url = 'http://localhost:1337/api/reviews' + '?' + qs.stringify({   
//When arrays are stringified, they follow the arrayFormat option, which defaults to indices:
// qs.stringify({ a: ['b', 'c', 'd'] });
// 'a[0]=b&a[1]=c&a[2]=d'
     fields: ['slug', 'title', 'subtitle', 'publishedAt'],
     populate: {image: {fields:['url']}}, //populate the image field with the url field of the image
     sort:['publishedAt:desc'], //sort the reviews by the published date in descending order
     paginaton: {pageSize: 6}, //set the page size to 6 instead of the default 25
}, {encodeValuesOnly:true}) ; //this means this will NOT encode the parameter names ONLY their values
// console.log('url:', url);
//encodeValuesOnly: false --> url: http://localhost:1337/api/reviews?fields%5B0%5D=slug&fields%5B1%5D=title
//encodeValuesOnly: true --> url: http://localhost:1337/api/reviews?fields[0]=slug&fields[1]=title

console.log('url:', url);
const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2); //null, which means all properties will be included.
const file = 'scripts/strapi-response.json'; //write the response to a file
  writeFileSync(file, formatted, 'utf8'); 

/**URL FIELD
 * --A field in a URL is a specific piece of information that helps "identify" and "locate" a 
 *  resource on the internet.

When you type a URL into your browser's address bar, it's broken down into several parts:

1.Protocol: 
  --This indicates the method used to access the resource (e.g., `http://`, `https://`, `ftp://`).

2.Domain name:
  --This is the unique name of the website or server hosting the resource (e.g., `www.example.com`).

3.Path:
  --This specifies the location of the resource within the website's file structure (e.g., `/folder/file.html`).

4.Query string: 
  --This is an optional part that contains additional information or parameters to be passed to the server 
   (e.g., `?param1=value1&param2=value2`).

NOTE:   
  Fields within the query string are often called parameters or variables. 
  
  They are used to provide specific instructions or data to the server, which can help it generate a 
  dynamic response.

Here's a simple example:

https://www.example.com/search?query=software+engineering

In this URL:
Protocol: https://
Domain name: www.example.com
Path: /search
Query string: ?query=software+engineering

The query string field query contains the search term "software engineering," 
which is used to search for relevant information on the website. */

/**QS
 What is `qs.stringify()
- It's a function used to convert an "object" into a query string format suitable for URLs.
- It takes an object and optional options as arguments.

Stringifying (Encoding):
->> By default, `qs.stringify()` URI encodes the output, meaning it converts special characters to a format
  understood by web browsers.
- Objects are serialized as expected, with nested objects using bracket notation (e.g., `a[b][c]`).

Customization Options:
1.)encode: 
     Set to `false` to disable URI encoding entirely.

2.)encodeValuesOnly: 
     Set to "true" to only encode the values of the object, NOT the keys.

3.)encoder: 
     Define a custom function to control how values and keys are encoded.

4.)decoder: (For `qs.parse`) Define a custom function to control how decoded values are returned.

**Array Serialization:**

- By default, arrays are serialized using their indices (e.g., `a[0]=b`).
- You can use the `arrayFormat` option to control this behavior:
    - `'indices'`: Default behavior (indices)
    - `'brackets'`: Uses square brackets (e.g., `a[]=b`)
    - `'repeat'`: Repeats the key for each value (e.g., `a=b&a=c`)
    - `'comma'`: Uses commas to separate values (e.g., `a=b,c`)

Object Serialization:
- By default, objects use bracket notation (e.g., `a[b][c]`).
- Use `allowDots` set to `true` for dot notation (e.g., `a.b.c`).
- `encodeDotInKeys` set to `true` encodes dots in object keys (requires `allowDots`).

Handling Empty Values:
- Empty strings and null values (with `strictNullHandling` set to `false`) omit the value 
  but keep the equals sign (`=`).
- Keys with empty objects or arrays are omitted.
- Undefined properties are entirely excluded.

**Other Options:**

- `addQueryPrefix`: Add a leading question mark (`?`) to the query string.
- `delimiter`: Change the delimiter between key-value pairs (default is `&`).
- `serializeDate`: Define a custom function to serialize `Date` objects.
- `sort`: Sort parameter keys before stringifying.
- `filter`: Control which keys are included and how their values are serialized.
- `strictNullHandling`: Set to `true` to differentiate between null values and empty strings.
- `skipNulls`: Omit keys with null values from the output.
- `charset`: Specify the character encoding to use (default is UTF-8).
- `charsetSentinel`: Include an additional parameter indicating the character encoding used.

**Key Takeaways:**

- `qs.stringify()` is a versatile tool for building query strings in Node.js applications.
- The various options allow you to customize the serialization behavior to fit your specific needs.
- Understanding these options helps you efficiently create query strings for interacting with APIs and building URLs.

Example:
const myObject = {
    "key with spaces": "value with spaces",
    "key&symbols": "value with special characters & symbols"
};

const stringified = qs.stringify(myObject);
console.log(stringified); 
// Output: key%20with%20spaces=value%20with%20spaces&key%26symbols=value%20with%20special%20characters%20%26%20symbols

const stringifiedOnlyValues = qs.stringify(myObject, { encodeValuesOnly: true });
console.log(stringifiedOnlyValues); 
// Output: key%20with%20spaces=value%20with%20spaces&key&symbols=value%20with%20special%20characters%20%26%20symbols

 * 
 */


/**## Understanding .mjs Extensions

A .mjs extension stands for "JavaScript Module". 
It's a file format specifically designed for importing and exporting modules in JavaScript.
This is a more modern approach compared to the traditional CommonJS modules (`.js`) used in Node.js.

**Why use .mjs?**

1. ES Modules Compatibility:
  `.mjs` files directly support the ECMAScript Modules (ES Modules) specification. 
   
  This means you can leverage features like:
   - Import paths:
       Using relative or absolute paths to import modules.
   
   - Export statements:
       Specifying what parts of your module can be accessed by other modules.
   
   - Dynamic imports:
       Loading modules on demand based on conditions.

2. Clarity and Organization: 
     .mjs files clearly indicate that they're intended for modular development. 
      This improves code readability and maintainability.

3. Tree Shaking: 
     When using a bundler like Webpack or Rollup, .mjs files can help with tree shaking. 
     This process removes unused code from your final bundle, resulting in smaller and faster applications.

Scenario and Sample Code:

Let's say you have two files: `utils.mjs` and `main.mjs`.

utils.mjs:
export function greet(name) {
  return `Hello, ${name}!`;
}

main.mjs:
import { greet } from './utils.mjs';

console.log(greet('Alice'));

In this example:
- `utils.mjs` exports a `greet` function.
- `main.mjs` imports the `greet` function from `utils.mjs` and uses it.

Key Points:
1.)File Extension: Always use `.mjs` for files that contain ES Modules.
2.)Import/Export Syntax: Use the `import` and `export` keywords for importing and exporting modules.
3.)Bundlers: If you're using a bundler, ensure it's configured to handle `.mjs` files correctly.

By using `.mjs` files, you can write cleaner, more organized, and potentially more efficient JavaScript code,
especially for larger projects.
 */

// II.
/**STRAPI 
1.)Default Behavior:
  By default, when you make a GET request to a Strapi endpoint (e.g., `/api/articles`), 
  the response only includes the "top-level" fields of the articles. 
  
  This means you'll get information like the article's title, content, and other directly associated fields. 
  However, any related data, such as comments, author details, or embedded media, won't be included.

2.)Population:
   To include related data in your API responses, you need to use the "populate" query parameter.
   This parameter allows you to specify which fields or relationships you want to populate.

Example:

If you want to retrieve articles along with their associated author details, you would make a GET request like this:

   GET /api/articles?populate=author

This will populate the author field of each article, meaning the response will include information about the author
associated with each article.


Multiple Fields:
You can populate multiple fields by separating them with commas:

   GET /api/articles?populate=author,comments

This will populate both the `author` and `comments` fields of each article.


Nested Relationships:
  If a relationship is nested (e.g., an article has many comments, and each comment has a user), 
  you can populate nested relationships using a dot notation:

  GET /api/articles?populate=comments.user

This will populate the `comments` field of each article, and for each comment, it will also populate the `user` field.

Permissions:
  It's important to ensure that you have the necessary permissions to populate specific fields. 
  In Strapi, you can control permissions for fields and relationships using the Content Manager. 
  
  If you don't have the `find` permission for a particular field or relationship, you won't be able to populate it.

In summary:

* By default, Strapi's REST API responses only include top-level fields.
* Use the `populate` query parameter to include related data in your responses.
* You can specify multiple fields to populate.
* Nested relationships can be populated using dot notation.
* Ensure you have the necessary permissions to populate fields.

By understanding population in Strapi, you can customize your API responses to include exactly the data you need for your applications. 
 */

//III.
/**fs.writeFileSync()
 
What is `fs.writeFileSync()`?
The `fs.writeFileSync()` method is a "synchronous" function from the Node.js `fs` module used to write data to a file. 

It takes two mandatory arguments:
1. Filename:
     The path to the file where you want to write the data.
2. Data:
     The data to be written to the file. This can be a string, Buffer, or an array of bytes.

What does it do?
1.Creates or opens the file: 
    If the specified file doesn't exist, it will be created. 
    If it already exists, it will be overwritten.

2.Writes data:
    The provided data is written to the file at the specified path.

3. Syncronous operation:
     This method is synchronous, meaning it blocks the execution of the code until the file is written successfully.

Why use fs.writeFileSync()?
You might use `fs.writeFileSync()` in Next.js or other Node.js applications when you need to:
1.)Create or update static files:
      For example, generating HTML files based on data from an API or database.

2.)Write data to a log file:
     Recording application events or errors for debugging or analysis.

3.)Save user-generated content:
     Storing data uploaded by users, such as images or text.

**Example in Next.js:**

import fs from 'fs';
const data = 'This is the content to be written to the file.';
fs.writeFileSync('output.txt', data);

This code will create a file named `output.txt` in the current directory and write the string 
"This is the content to be written to the file." to it.

Important Notes:
-Synchronous nature:
   While `fs.writeFileSync()` is convenient for simple use cases, it can block the main thread, potentially affecting performance. 
   For more complex scenarios, consider using asynchronous alternatives like `fs.writeFile()`.

-File permissions:
   Ensure that your application has the necessary permissions to create or modify files in the specified directory.

By understanding the `fs.writeFileSync()` method, you can effectively write data to files in your Next.js applications, 
enabling various functionalities. 

SYNTAX:
fs.writeFileSync(file, data[, options]);

Where:
-file: The path to the file you want to write to.
-data: The data to be written to the file. This can be a string, Buffer, or an array of bytes.
-options: An optional object that specifies additional parameters, such as:
    -encoding: The encoding to use when writing the data (default: 'utf8').
    -mode: The file mode (permissions) to use when creating the file (default: 0o666).
    -flag: The file flag to use when opening the file (e.g., 'w' for writing, 'a' for appending).

Here's an example:
const fs = require('fs');

const data = 'Hello, world!';

fs.writeFileSync('output.txt', data, { encoding: 'utf8' });
```

This code will create a file named `output.txt` and write the string "Hello, world!" to it using UTF-8 encoding.
 */

/**STRAPI terminologies* 
1.)Relations:
    -These are CONNECTIONS between different "content types" in your Strapi project.
    -They allow you to establish relationships between data..., such as a "Blog Post" being related to an "Author" 
     or a "Product" being associated with multiple "Categories."
    ->>Common types of relations include one-to-one, one-to-many, and many-to-many. <<--

2.)Media Fields:
    -These "fields" are specifically designed to STORE media files, such as images, videos, or audio files.
    -They provide a structured way to manage and reference media content within your Strapi application.
    -When you create a media field, you can specify the allowed file types and other constraints.

3.)Components:
    -Components are reusable building blocks that can be used to create more complex content types.
    -They allow you to define a set of fields and settings that can be reused across multiple content types.
    -For example, you could create a "Hero Section" component with fields for a headline, subtitle, and background image, and then use it in multiple pages or articles.

4.)Dynamic Zones:
    -Dynamic zones are flexible areas within content types where you can add "multiple components" or other content.
    -They provide a way to create dynamic and customizable layouts without having to create separate content types for each variation.
    -For example, you could have a "Blog Post" content type with a dynamic zone that allows you to add "different" types of content blocks, 
      such as text, images, or embedded videos.

The "populate" and "select" Parameters:
  -The `populate` parameter is used to include related data in your API responses. 
   By specifying the relations you want to populate, you can retrieve a MORE complete representation of your data.

  -The select parameter is used to LIMIT the fields returned in your API responses. 
   This can be helpful for reducing the amount of data transferred and improving performance.

Example:
  If you have a "Blog Post" content type with relations to "Author" and "Category," you could use the following query to retrieve a blog post
  with its author and category information:

    /api/blog-posts?populate=author,category


  To limit the fields returned for the author and category, you could use:

    /api/blog-posts?populate=author(name,email),category(name)*/