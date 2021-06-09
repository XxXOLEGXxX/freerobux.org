let modInfo = {
	name: "The Lameass Tree",
	id: "lameid",
	author: "M U G E N#0530 (aka the one behind ST:R)",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "-0.1",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v-0.1</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Acamaeda will go bankrupt!!!<br><br>
Jαςοяβ will go bankrupt!!!<br><br>
Hevipelle will go bankrupt!!!<br><br><br><br>░░░░░░░░▄▀▀████████▀██████▄▄▄▄▄▄░░░░░░<br>
░░░░░░▄▀░▄▀░░▄▄▄▄▄░▀▄▄▄▄▄▄▀▀▀▄▄░▀▄░░░░<br>
░░░░▄▀░░▀░▄▄▀░░░░░▀█▄░░░▄▀▀▀▀▄▀▀░░█░░░<br>
░░░▄▀░░░░▄▀░▄███▀▀▄░▀░░█░▄▄▄▄▄░░▄▄█▄░░<br>
░▄▀░░▄▀▀▄░░▀▀░▄▀▀▀██░░░██▀▀▀░▀▀░▀▀▀██▄<br>
█░░▄▀░▄▄░▀▀░▀▀░░▄░▄▄░░░░█▄░░▄▄▀▀▀█▄░██<br>
█░░█░▀█░▀█▄▄▄▄▄▀░█░▄▄▄░░░▀██▄░░░▄░░▄██<br>
█░░░▀░░█▄▄█░░▀▀▀█▄▄░░▀░▀▀▀▀░░▄▄▀▀█░█▀░<br>
░▀▄░░░░░▀▄▀█▀█▄▄█▄░▀▀█▀▀█▀▀▀█░▄████▀░░<br>
░░▀▄░░░░░▄▀█▄░▀████████████████████░░░<br>
░░░░▀▄▄░░░▀▄▀▀▄█░░░░░█░░█░░█░█░▄▀░█▄░░<br>
░░░░░░░▀▄░░░▀▄▄░▀▀▄▄█▀▀▀▀▀▀▀▀▀▀▄░░░█▄░<br>
░░░░░░░░░▀▀▄▄░░▀▀▄▄░░░▄▄▄▄▄▄▄░▀▄▄░░░█░<br>
░░░░░░░░░░░░░▀▀▀▄▄▄▀▀▀▀▀▀▀▀▀▀▀▀▀░░▄▀░░<br>
░░░░░░░░░░░░░░░░░░░▀▀▄▄▄▄▄▄▄▄▄▄▄▄▀░░░░<br>
▄▄▄░░▄▄▄▄░░░▄▄▄░░▄▄▄▄░░▄▄░░░▄▄▄░▄▄░░░▄<br>
█░██░██░██░██░██░██▄█▀░██░░░██▄░███▄██<br>
█▀▀░░██▀█▄░██░██░██░██░██░░░██▀░██▀█▀█<br>
█░░░░██░██░▀█▄█▀░████▀░████░███░██░░░█<br>
░░░░░░░░░░░░░░░░░░░▄▄▄▄░░░░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░▄███▀▀▀██▄░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░███░░░░░███░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░░░░░▄▄▄██▀░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░░░░██▀▀░░░░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░░░░▄▄░░░░░░░░░░░░░░░░░<br>
░░░░░░░░░░░░░░░░░░░▀▀░░░░░░░░░░░░░░░░░<br><br><br><br><br><br><br>`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	gain = new Decimal(1)
	if(hasUpgrade("b", 11) && !hasUpgrade("b", 22)) gain = new Decimal(3)
	if(hasUpgrade("b", 12)) gain = gain.mul(upgradeEffect("b", 12))
	if(hasUpgrade("b", 13)) gain = gain.mul(upgradeEffect("b", 13))
	if(hasUpgrade("b", 21)) gain = gain.mul(upgradeEffect("b", 21))
	if(hasUpgrade("b", 31)) gain = gain.add(115)
	if(hasUpgrade("b", 32)) gain = gain.mul(1.36)
	if(hasUpgrade("b", 33)) gain = gain.pow(1.32)
	gain = gain.mul(layers.sb.effect())
	gain = new Decimal(Number(gain).toString(player.b.points))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.b.points.lte(6)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}