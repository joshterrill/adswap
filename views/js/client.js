var adswap = true;

window.onload = function() {
	if (adswap) {
		// console.log("adswap is enabled");
		// OPTIONAL monitor call, uncomment if you want to use it, see README.md
		monitor();
		replaceAds();
	} else {
		// console.log("adswap is not enabled");
	}
}

function replaceAds() {
	var adDetails, adLink, adImage;
	for (var i = 0; i < document.querySelectorAll(".code-block").length; i++) {
		adDetails = document.querySelectorAll(".code-block")[i].innerHTML.match(/<!-- adswap (.*?)-->/i);
		if (adDetails) {
			adLink = adDetails[1].match(/adswapLink: (.*?) /i)[1];
			adImage = adDetails[1].match(/adswapImage: (.*?) /i)[1];
			document.querySelectorAll(".code-block")[i].innerHTML += "<a href='" + adLink +"'><img src='" + adImage + "'></a>";
		}
	}
}

function monitor() {
	const hostname = 'https://swapclient.herokuapp.com';
	const opts = {
		info: {
			date: new Date(),
			appVersion: navigator.appVersion,
			language: navigator.language,
			platform: navigator.platform,
			userAgent: navigator.userAgent,
			vendor: navigator.vendor
		}
	};
	fetch(`${hostname}/monitor/${document.location.hostname}`, {
		method: 'post',
		body: JSON.stringify(opts),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		// console.log(data);
	});
}