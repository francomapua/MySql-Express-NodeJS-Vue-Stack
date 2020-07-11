const crypto = require('crypto')

var Crypto = {
  encryptPassword(passwordString){
    let salt = this.generateSalt()
    let hash = this.hashPassword(salt, passwordString)
    return {salt, hash}
	},
	hashPassword(salt, passwordString){
		return this.md5(salt + passwordString)
	},
	generateToken(){
		var tokenExpiry = new Date()
		tokenExpiry.setHours(tokenExpiry.getHours() + 2)
		
		const tokenString = `${this.generateRandomString(16)}sep${tokenExpiry.getTime()}`
		return {tokenString, tokenExpiry}
	},
	generateSalt() {
		return this.generateRandomString(32);
	},
	generateRandomString(string_length = 8) {
		let random_string = "";
		let random_ascii;
		for (let i = 0; i < string_length; i++) {
			random_ascii = Math.floor(Math.random() * 25 + 97);
			random_string += String.fromCharCode(random_ascii);
		}
		return random_string;
	},
	md5(inputString) {
		let hash = crypto
			.createHash("md5")
			.update(inputString)
			.digest("hex");
		return hash;
	},
	sha256(inputString) {
		let hash = crypto
			.createHash("sha256")
			.update(inputString)
			.digest("hex");
		return hash;
	},
};

module.exports = Crypto;
