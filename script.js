// HW deep copy & deep compare
//
// first obj
let obj1 = {
	name: "obj1",
	obj: 1,
	nestedObj: {
		name: "nested obj1",
		nestedMethod() {
			console.log(`This's ${this.name} nested method`);
		},
		thirdLevel: {
			name: "this is third level",
			thirdLevelMethod() {
				console.log(`third level nesting works`);
			},
		},
	},
	logInfo() {
		console.log(`This's ${this.name}`);
	},
};

// clone obj
let obj2 = deepCopy(obj1);
// clone check

// obj2.nestedObj.name = 'lva'; // nested name change
// console.log(obj1.nestedObj.name === obj2.nestedObj.name); // false -> object is not a reference

function deepCopy(obj) {
	let result = {};
	for (let key in obj) {
		typeof obj[key] === "object"
			? (result[key] = deepCopy(obj[key]))
			: (result[key] = obj[key]);
	}
	return result;
}

// comparation part
console.log(deepCompare(obj1, obj2));

// comparation check
// obj1.nestedObj.nestedMethod = () => console.log('Method has been changed');
// obj2.nestedObj.thirdLevel.name = 'this field is changed';
// console.log(deepCompare(obj1,obj2))

function deepCompare(obj1, obj2) {
	// objs are converted into arrays
	// then compared
	let arr1 = [],
		arr2 = [];
	obj1 = flatThatObj(obj1, arr1);
	obj2 = flatThatObj(obj2, arr2);

	function flatThatObj(obj, arr) {
		for (key in obj) {
			if (typeof obj[key] === "object") {
				return flatThatObj(obj[key], arr);
			}
			arr.push(key, obj[key]);
		}
		return arr.flat(Infinity);
	}
	// fast compare by length
	if (obj1.length !== obj2.length) return false;
	// further comapation
	for (let i = 0; i < obj1.length; i++) {
		// for methods comparation
		if (typeof obj1[i] === "function")
			(obj1[i] = obj1[i].toString()), (obj2[i] = obj2[i].toString());
		// values comparation
		if (obj1[i] !== obj2[i]) return false;
	}
	return true;
}
