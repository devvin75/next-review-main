// module.exports = {
//     images: {
//       domains: ['localhost'],
//     },
//   };

module.exports = {
    //specifies which hostnames are allowed to be used for images 
    //this restricts which servers to call
    images: {          
    remotePatterns:[
        {
        protocol: 'http',
        hostname: 'localhost',
        port:'1337',
        // In Strapi all images are under uploads
        pathname: '/uploads/**',
    },        
    ],
},
}