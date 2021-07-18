const fetch = require("node-fetch");
var fs = require('fs');


async function main() {
    const data = await fetch("https://iptv-org.github.io/iptv/channels.json")
        .then(res => res.json())
        .then(data => data.map(result => `<url>
        <loc>https://www.dashtv.in/watch/${encodeURIComponent(result.name)}</loc>
        <changefreq>monthly</changefreq>
        <lastmod>2021-07-05</lastmod>
        </url>`))
        .then(res => res.join("\n"))
        .then(data => `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
    </urlset>
    `);
    fs.writeFile('public/sitemap.xml', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  
}


main()

