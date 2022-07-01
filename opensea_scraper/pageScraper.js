const scraperObject = {
	url: 'https://opensea.io/collection/pixel-interfaces',
	async scraper(browser){
		let page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);

		const collection = []
		await page.waitForSelector("div.sc-7qr9y8-0.iUvoJs.Price--amount")
		let prices = await page.$$eval("div.sc-7qr9y8-0.iUvoJs.Price--amount:first-of-type", price => price.map(price => price.textContent))
		console.log(prices)
		await page.waitForSelector("div.sc-7qr9y8-0.sc-nedjig-1.iUvoJs.fyXutN")
		let titles = await page.$$eval(".sc-7qr9y8-0.sc-nedjig-1.iUvoJs.fyXutN", title => title.map(title => title.textContent))
		console.log(titles)
		await page.waitForSelector(".Asset--anchor")
		let links = await page.$$eval(".Asset--anchor", link => link.map(link => link.href))
		console.log(links[0])

		listingArray = []
		for (var i = 0; i < prices.length; i++){
			listingArray.push(createListingObject(titles[i], prices[i], links[i]))
		}

		console.log(listingArray)
		console.log(listingArray.length)

	}
}

let createListingObject = function(titles, prices, links){
	return {
		title: titles,
		price: prices,
		link: links
	}

}

module.exports = scraperObject;