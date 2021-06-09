addLayer("b", {
    name: "base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(10),
    }},
    color: "white",
	prestigeButtonText() {return "Reset to lower base down to "+formatWhole(player.b.points.sub(1))+"<br><br>Req: "+format(player.points)+"/"+format(getNextAt("b", canMax=false, useType="static"))+" points"},
    requires() {let cost = new Decimal(10800)
				if(player.b.points.lte(9)) cost = new Decimal(331697)
				if(player.b.points.lte(8)) cost = new Decimal(1417600)
				if(player.b.points.lte(7)) cost = new Decimal(29765199)
				if(hasUpgrade("b", 22)) cost = cost.div(player.b.points)
				return cost}, // Can be a function that takes requirement increases into account
    resource: "bases", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 0,
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset to lower base", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "two plus two is four minus one that's three quick maths",
			description: "changes base point gain to 3",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(10),
		},
		12: {
			title: "upgrade upgrader",
			description: "boosts your point gain by the amount of upgrades you currently have",
			effect() {return player.b.upgrades.length+1},
			effectDisplay() {return "x"+format(this.effect())},
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(45),
			unlocked() {return hasUpgrade("b", 11)}
		},
		13: {
			title: "it's big brain time",
			description: "boosts your point gain by in-game base",
			effect() {return player.b.points},
			effectDisplay() {return "x"+format(this.effect())},
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(202.5),
			unlocked() {return hasUpgrade("b", 12)}
		},
		21: {
			title: "timewall gaming",
			description: "boosts your point gain by how much you were playing this masterpiece yes yes<br>(hardcapped at x6.90)",
			effect() {return new Decimal(player.timePlayed).root(2.953).min(6.9)},
			effectDisplay() {return "x"+format(this.effect())},
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(16402.5),
			unlocked() {return player.b.points.lte(9) && hasUpgrade("b", 13)}
		},
		22: {
			title: "run it back",
			description: "first upgrade is 100% weaker, but base cost is divided by in-game base",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(282943.125),
			unlocked() {return hasUpgrade("b", 21)}
		},
		23: {
			title: "plz",
			description: "unlocks 2nd row layer upgrades",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(150903),
			unlocked() {return hasUpgrade("b", 22)}
		},
		31: {
			title: "lame addition",
			description: "boosts point gain by +115 (in base 10)",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(924280.875),
			unlocked() {return hasUpgrade("b", 23) && player.b.points.lte(7)}
		},
		32: {
			title: "lame multiplication",
			description: "multiplies point gain by x1.36 (in base 10)",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(2056053.375),
			unlocked() {return hasUpgrade("b", 23) && player.b.points.lte(7)}
		},
		33: {
			title: "lame exponent",
			description: "exponents point gain by ^1.32 (in base 10)",
			currencyDisplayName: "points",
			currencyInternalName: "points",
			cost: new Decimal(4598391.6675),
			unlocked() {return hasUpgrade("b", 23) && player.b.points.lte(7)}
		},
	},
	doReset(resettingLayer) {
		if(layers[resettingLayer].symbol == "B") player.b.points = player.b.points.sub(2)
		if(layers[resettingLayer].symbol == "SB") layerDataReset("b", points)
	}
})

addLayer("sb", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
	effect() {let eff = player.sb.points.add(1)
			  if(hasUpgrade("sb", 11) && hasUpgrade("b", 23)) eff = eff.pow(2)
		      return eff},
	effectDescription() {return "boosting your point gain by x"+format(this.effect())},
    color: "white",
	symbol: "SB",
    resource: "static boosters",
    row: 1,
	position: 0,
    baseResource: "points",
    baseAmount() { return player.points },
    requires: new Decimal(4050),
    type: "static",
	base: 2,
    exponent: 2,
    gainMult() {
        return new Decimal(1)
	},
    gainExp() {
        return new Decimal(1)
    },
	upgrades: {
		rows: 1,
		cols: 1,
		11: {
			title: "it's free real estates",
			description: "static boosters's effect is squared",
			cost: new Decimal(3),
			unlocked() {return hasUpgrade("b", 23)}
		}
	},
    layerShown() { return hasUpgrade("b", 13) || player.sb.unlocked == true },
	branches: ["b"]
})

addLayer("rg", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
		random1: new Decimal(1.5),
		random2: new Decimal(3)
    }},
	update(){
		player.rg.random1 = new Decimal(Math.random() * (4 - 1.8) + 1.8)
		player.rg.random2 = new Decimal(Math.random() * (4 - 1.8) + 1.8)
	},
    color: "white",
	symbol: "RG",
    resource: "random generators",
    row: 1,
	position: 1,
    baseResource: "points",
    baseAmount() { return player.points },
    requires: new Decimal(4.2e69),
    type: "static",
	base() {return player.rg.random1},
	exponent() {return player.rg.random2},
    gainMult() {
        return new Decimal(1)
	},
    gainExp() {
        return new Decimal(1)
    },
    layerShown() { return hasUpgrade("b", 13) || player.rg.unlocked == true },
	branches: ["b"]
})