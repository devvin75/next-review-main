import Link from 'next/link';
import './globals.css';
import Navbar from './components/Navbar';
import {orbitron} from './fonts';

export const metadata = {
  /**%s is a place holder hat will be replaced by the page-specific title */
  title: {
  default:  'Indie Gamer',
  template:'%s | Indie Gamer', 
  description:'Only the best Indie games, reviewed for you.'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={orbitron.variable}>
      {/* 	min-height: 100vh; */}
      <body className="bg-orange-100 flex flex-col px-4 py-2 min-h-screen"> 
        <header>
          <Navbar/>
        </header>
        {/* flex-grow: 1; */}
        <main className="grow py-3">
          {children}
        </main>
        <footer className="border-t 
                          py-3 
                          text-center 
                          text-xs
                          text-slate-500">
          Game data and images courtesy  of {' '}
           <a href="https://rawg.io/" target="_blank"  className="text-orange-800  hover:underline">
            RAWG
            </a>
        </footer>
      </body>
    </html>
  );
}

/**%s in Metadata

In the code snippet you provided, %s within the title object of the metadata export is a placeholder used for "string formatting". 
It's a common convention in many programming languages and templating systems. 

Here's how it works:
1.)Default Value: 
The default property sets the default title if no specific page title is provided: 'Indie Gamer'

2.)Template with Placeholder: 
The template property defines a format that can be dynamically adjusted. 
In this case, it's '%s | Indie Gamer'. 
The %s acts as a placeholder where a specific page title will be inserted later.

How It Works at Runtime

When this code is used within a Next.js application, the framework likely replaces %s with the actual title of the current page
(if provided). For example, if the page is about "Stardew Valley," the final title might become:

Stardew Valley | Indie Gamer


Other Formatting Placeholders:

While %s is the most common, here are some other placeholders you might encounter in different contexts:

%d: Placeholder for an integer (whole number)
%f: Placeholder for a floating-point number (decimal)
%s: Placeholder for a string (as seen in this example)
%c: Placeholder for a single character
Specific Formatting:

You might also see formatting options used within the placeholder itself, like specifying the minimum number of digits 
or decimal places:

Python
"%03d" % 12  # Outputs "012" (pads with leading zeros to 3 digits)
"%.2f" % 3.14159  # Outputs "3.14" (rounds to 2 decimal places)
Use code with caution.

When to Use Placeholders

Dynamic Titles and Content: Placeholders are useful when you want to create a generic format that can be populated with different values depending on the context. This is often used for page titles, filenames, error messages, and more.
Internationalization (i18n): When building applications for a global audience, placeholders can streamline the process of displaying translated strings. You can have separate templates with placeholders for specific languages.
Understanding Context

The specific meaning and usage of formatting placeholders can vary depending on the programming language, library, or templating system you're working with. It's always best to consult the documentation for the tools you're using to get a complete understanding. */