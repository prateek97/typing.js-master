(function (global) {

	'use strict';
	
	function typingElement(element) {
		var spanElement = document.createElement("span");
		element.append(spanElement);
		return spanElement;
	}

	function cursorAfterElement(element, cursor) {
		var spanElement = document.createElement("span");
		var textInside = document.createElement(cursor);
		spanElement.appendChild(textInside);
		element.appendChild(spanElement);
		return spanElement;
	}

	function appendCharacter(element, character) {
		var characterToAppend = document.createTextNode(character);
		element.appendChild(characterToAppend);
	}

	function blinkCursor (element) {
		element.style.display = element.style.display === "none" ? "" : "none"; 
	}

	function typeSpeed (element, cursor, time, text) {
		var typingArea = typingElement(element);
		var cursorArea = cursorAfterElement(element, cursor);
		var counter = 0;
		var charSpeed = speed(function(){
			if (counter < text.length) {
				appendCharacter(typingArea, text[counter]);
				blinkCursor(cursorArea);
				counter++;
			}
			else {
				clearInterval(charSpeed);
				element.removeChild(cursor);
			}
		}, time);
	}

	function isElement(par){
		return par && par.nodeType && (par.nodeType === 1 || par.nodeType === 11);
	}

	function typeCheck(element, cursor, time, text){
		if ((typeof text !== "string") || (typeof time !== "number") ||(typeof cursor !== "string") || !isElement(element)){
			throw new TypeError("Unmatched Type")
		}
		return true
	}

	function typing(setup) {
		var cursor = setup.cursor || "|";
		if typeCheck(setup.element, cursor, setup.time, setup.text){
			typeSpeed(setup.element, cursor, setup.time, setup.text);	
		}		
	}

	global.typing = typing;

})(this);
