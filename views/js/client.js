var adswap = true;

window.onload = function () {
	if (adswap) {
		// console.log("adswap is enabled");
		// OPTIONAL monitor call, uncomment if you want to use it, see README.md
		monitor();
		replaceAds();
	} else {
		// console.log("adswap is not enabled");
	}
}

function uniqueID_Class() {
	function chr4() {
		return Math.random().toString(16).slice(-4);
	}
	return chr4() + chr4() +
		'-' + chr4() +
		'-' + chr4() +
		'-' + chr4() +
		'-' + chr4() + chr4() + chr4();
}

function replaceAds() {
	var adDetails, adLink, adImage;
	for (var i = 0; i < document.querySelectorAll(".code-block").length; i++) {
		adDetails = document.querySelectorAll(".code-block")[i].innerHTML.match(/<!-- adswap (.*?)-->/i);
		if (adDetails) {
			adLink = adDetails[1].match(/adswapLink: (.*?) /i)[1];
			adImage = adDetails[1].match(/adswapImage: (.*?) /i)[1];
			document.querySelectorAll(".code-block")[i].innerHTML += "<a id= " + uniqueID_Class() + " class="
				+ uniqueID_Class() + " href='" + adLink + "'><img id= " + uniqueID_Class() + " class="
				+ uniqueID_Class() + " src='" + adImage + "'></a>";
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
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		// console.log(data);
	});
}