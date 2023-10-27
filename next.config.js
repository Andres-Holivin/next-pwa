/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    // swSrc: "/public/service-worker.js"

})

module.exports = withPWA({
    // other congigs
    reactStrictMode: false
})