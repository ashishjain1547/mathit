;(function(global){
	// 'new' an object
    var jMath = function() {
        return new jMath.init();
    }
	
	// prototype holds methods (to save memory space)
    jMath.prototype = {
		charRepeatsInString: function(str){
			for (var i = 0; i < str.length; i++) {
				if ( str.indexOf(str[i]) !== str.lastIndexOf(str[i]) ) {
					return true; // repeats
				}
			}
			return false;
			
			// Using RegExp (URL: https://stackoverflow.com/questions/33656708/check-for-repeated-characters-in-a-string-javascript)
			// return /(.).*\1/.test(s);
		},
		
		getUniqueCharsInString: function(str){
			var uniqueChars = [];
			for (var i = 0; i < str.length; i++) {
				if ( str.indexOf(str[i]) === i ) {
					uniqueChars.push(str[i]);
				}
			}
			return uniqueChars;
		},
		
		countUniqueCharsInString: function(str){
			var chars = jM.getUniqueCharsInString(str);
			var charCounts = [];
			for(var i = 0; i < chars.length; i++){
				charCounts.push((str.match(new RegExp(chars[i], "g")) || []).length)
			}
			return charCounts;
		},
		
		calcCombinationsOfString: function(str, r){
			if(r){
				if ( !( parseInt(r) && parseInt(r) < str.length && parseInt(r) > 0 ) ) {
					throw "Input 'r' should be an integer greater than 0 and less than the length of the first argument (string).";
				}
			} 
			else {
				r = str.length;
			}
			
			if(jM.charRepeatsInString(str)){
				return jM.combinationsOfString(str, r).length;
				
				/* Important URLs:
					https://www.cs.sfu.ca/~ggbaker/zju/math/perm-comb-more.html
					http://www.statisticshowto.com/probability-and-statistics/probability-main-index/permutation-combination-formula/
				*/
				
			} else {
				return jM.factorial(str.length) / (jM.factorial(r) * jM.factorial(str.length - r));
			}
		},
		
		calcPermutationsOfString: function(str, r){
			if(r){
				if ( !( parseInt(r) && parseInt(r) < str.length && parseInt(r) > 0 ) ) {
					throw "Input 'r' should be an integer greater than 0 and less than the length of the first argument (string).";
				}
			} 
			else {
				r = str.length;
			}
			
			if(jM.charRepeatsInString(str)){
				return jM.permutationsOfString(str, r).length;
			} 
			
			else {
				return jM.factorial(str.length) / jM.factorial(str.length - r);
			}
		},
		
		combinationsOfString: function (str, r) {
			var result = [];

			var loop = function (start, depth, prefix) {
				for (var i = start; i < str.length; i++) {
					var next = prefix + str[i];
					if (depth > 0)
						loop(i + 1, depth - 1, next);
					else
						result.push(next);
				}
			};

			for (var i = 0; i < str.length; i++) {
				loop(0, i, '');
			}
			
			/* --- Combination Logic --- Ends */

			if(r){
				if ( !( parseInt(r) && parseInt(r) <= str.length && parseInt(r) > 0 ) ) {
					throw "Input 'r' should be an integer greater than 0 and should not be more than the length of the first argument (string).";
				}
			} 
			else {
				r = str.length;
			} 
			
			var _result = [];
			for(var i = 0; i < result.length; i++){
				if(result[i].length === r){
					_result.push(result[i])
				}
			}
			
			_result = jM.getUniqueCharsInString(_result); /* Here we are actually passing a String array and getting unique elements. */
			return _result;
		},
		
		factorial: function (num) {
			var result = 1;
			for (var i = 1; i < num; i++ , result *= i);
			return result;
		},
		
		permutationsOfString: function(str, r){
			function getAllPermutations(str) {
				var results = [];

				if (str.length === 1) {
					results.push(str);
					return results;
				}

				for (var i = 0; i < str.length; i++) {
					var firstChar = str[i];
					var charsLeft = str.substring(0, i) + str.substring(i + 1);
					var innerPermutations = getAllPermutations(charsLeft);
					for (var j = 0; j < innerPermutations.length; j++) {
						results.push(firstChar + innerPermutations[j]);
					}
				}
				return results;
			}
			
			if(r){
				if ( !( parseInt(r) && parseInt(r) <= str.length && parseInt(r) > 0 ) ) {
					throw "Input 'r' should be an integer greater than 0 and should not be more than the length of the first argument (string).";
				}
			} 
			else {
				r = str.length;
			}
			
			var allCombinations = jM.combinationsOfString(str, r);

			var _result = new Array();
			for (var i = 0; i < allCombinations.length; i++) {
				var temp = getAllPermutations(allCombinations[i]);
				_result = _result.concat(temp);
			}
			
			_result = jM.getUniqueCharsInString(_result); /* Here we are actually passing a String array and getting unique elements. */
			return _result;
		}
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    jMath.init = function() {
        var self = this;
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    jMath.init.prototype = jMath.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand 'jM' for ease our poor fingers
    global.jMath = global.jM = jMath(); // Not this (as in jQuery) global.jMath = global.jM = jMath;
	
}(window));