import Link from 'next/link';
import {orbitron} from '../fonts' //used with Next.js


export default function Heading({children}){
    return (
        <h1 className={
            `font-bold 
             pb-3    
             text-2xl
             // See comment below
             ${orbitron.className}
             font-orbitron`}>
            {children}
        </h1>
    )

}
    /**${orbitron.className} is a template literal that combines a 
     * JavaScript variable (orbitron.className) with a string. 
     * 
     * This pattern is frequently used to dynamically insert 
     * variable values into strings. orbitron: 
     * This variab
     * le is imported from the ../fonts file. 
     * 
     * It's likely an instance of the Orbitron font created using 
     * the next/font/google library.
     * 
     * .className: 
     * This property accesses the CSS class name associated with
     *  the orbitron font.
     * 
     * The next/font/google library automatically generates CSS 
     * classes for the imported fonts, ensuring proper font loading 
     * and styling.
     * 
     * How it Works:
     * The Orbitron font is imported and configured 
     * (likely in the ../fonts file).
     * 
     * >>The orbitron.className property holds the generated 
     * CSS class name for the Orbitron font.
     * 
     * In the Heading component, the template literal 
     * ${orbitron.className} is used within the className attribute 
     * of the h1 element.
     * 
     * When the component is rendered, the template literal is 
     * evaluated, and the actual CSS class name from orbitron.className
     * is inserted into the className attribute. 
     *       
     */