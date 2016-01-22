

/*===== model =====*/

var model = {
	currentCat: null,
	cats : [
		{
			name: 'cat1',
			numOfClick: 0,
			imgSrc: 'img/cat1.jpg',
			imgAttr: 'http://dfm212.github.io/ClickCat/img/cat001.jpg'
		},
		{
			name: 'cat2',
			numOfClick: 0,
			imgSrc: 'img/cat2.jpg',
			imgAttr: 'http://3rm.info/uploads/posts/2012-08/1345444048_19.jpg'

		},
		{
			name: 'cat3',
			numOfClick: 0,
			imgSrc: 'img/cat3.jpg',
			imgAttr: 'http://farm6.staticflickr.com/5233/5828169497_0102d6cd9c.jpg'

		},
		{
			name: 'cat4',
			numOfClick: 0,
			imgSrc: 'img/cat4.jpg',
			imgAttr: 'http://1.bp.blogspot.com/-tGB-eqJcDR8/VavCWKDVUqI/AAAAAAAAXhY/XFL-pYYJkpw/s640/maxresdefault%2B%25281%2529.jpg'

		},
		{
			name: 'cat5',
			numOfClick: 0,
			imgSrc: 'img/cat5.jpg',
			imgAttr: 'http://mmbiz.qpic.cn/mmbiz/lh2HcicryDGu1lM53fDXTPDvRztqFAZqQyCgNnxGU39ebJGUYIB9qTka3BII7ibgyXaCCw8UoU0bMAbpMXCFlsFA/0?wx_fmt=jpeg'

		}
		]
};
const NUM_OF_IMG = model.cats.length;	//define number of Cat picture that will be used

/*===== octopus ======*/

var octopus = {
	//octopus is used when view needs to access model for data acquisition, manipulation and etc.
	//1. init -> init model and view
	//2. getAllCats -> View can get data in model only via octopus with this function
	//3. incrementCounter -> increase number of Click counter and return that value (to catView so that i can update that # of Clicks)

	init: function(){
		model.init();
		catlistView.init();
	},

	getAllCats: function(){
		return model.cats;
	},

	incrementCounter: function(pIndex){
		model.cats[pIndex].numOfClick += 1;
		return model.cats[pIndex].numOfClick;
	}

};


/*=====Views =====*/
var catlistView = {
	init: function(){
		//1. assign DOM elemnt to variable
		//2. event handler for admin button

		// this.catListElem = document.getElementById('list');
		this.catListElem = $('#list')[0];
		// this.adminButton = document.getElementById('')
		$('#adminButton').click(function(){
			$('#adminArea').append('hi');

		});

		//render the view. update element with corresponding values
		this.render();
	},

	render: function(){
		//1. get all the cats from model via octopus
		//2. add them as checkbox input onto #list
		//3. bind event to handler (click on checkout -> append catImage to #display)

		var elem;	//for newly created DOM element
		var cat; 	//for a single cat
		var cats = octopus.getAllCats();

		this.catListElem.innerHTML = '';

		for(var i=0; i<NUM_OF_IMG; i++){
			cat = cats[i];
			$('#list').append('<input type=checkbox id="' + cat.name + '_list">' + cat.name +'<br><br>' );

			// click checkbox -> make catView render checked cat image.
			$('#' + cat.name + '_list').click((function(iCopy, catCopy){
				return function(){
					catView.render(iCopy, catCopy);
				};
			})(i, cat));
		};
	}//end of render
};

var catView = {
	init: function(pIndex, pCat){

	},

	render: function(pIndex, pCat){
		//1-1. if checkbox is checked, display cat image on #display
		//1-2 if it is not checked, remove div for cat image on #display
		//2. click cat image -> increment numOfClick via octopus

		if($('#' + pCat.name + '_list').hasClass("checked") == false){ //when box was unchecked -> checked
			//indicate box checked in list
			$('#' + pCat.name + '_list').addClass("checked");

			//append cat image to #display
			$("#display").append('<div id="' + pCat.name + '_div">' + pCat.name + '<br><img id="' + pCat.name + '"src="' + pCat.imgSrc +'" alt="' + pCat.name +
				'" style="width:100px;height:100;margin-left:1.5em"><p id="num' + (pIndex+1) + '">The number of Clicks : ' + pCat.numOfClick + '</p></div>' ) ;

					// bind click event on image to increment counter by 1
			$('#' + pCat.name).click(function(){
				// console.log(catNameCopy + 'pic clicked');
				// pCat.numOfClick += 1;
				var plusedClick = octopus.incrementCounter(pIndex);
				// console.log(plusedClick);

				$('#num' + (pIndex+1)).html ('The number of Clicks : ' + plusedClick);
			});

		}
		else { 	//when box was checked -> unchecked
			//indicate box unchecked in list
			$('#' + pCat.name + '_list').removeClass("checked");

			$('#' + pCat.name + '_div').remove();
		}
	}
};


catlistView.init();




// var ImgArr = [];
// var catName;
// var fileName;
// // var numOfClicks= [];

// //initialize number of clicks for each picture
// // for (var i=0; i<NUM_OF_PIC; i++){
// // 	numOfClicks[i] =0;
// // }

// function clickPicCallback(pNum){
// 	return function(){
// 		pNum = pNum + 1;
// 		console.log(pNum);
// 	}
// };

// function imageSetup(){
// 	for (var i=0; i<NUM_OF_PIC; i++){
// 		ImgArr[i] = new Image();
// 		catName = "cat" + (i+1);
// 		fileName = catName + ".jpg";
// 		ImgArr[i].src = fileName;
// 		numOfClick = numOfClicks[i];

// 		//=====Create DOM for cat selector in #list=====
// 		$('#list').append('<input type=checkbox id="' + catName + '_list">' + catName +'<br><br>' );

// 		// ========When cats are clicked in #list, they appear in main screen(#display) and num of clicks is registered to that picture.=======
// 		$('#' + catName + '_list').click((function(iCopy, catNameCopy, fileNameCopy, numOfClickCopy){
// 			return function(){
// 				if($('#' + catNameCopy + '_list').hasClass("checked") == false){ //when box was unchecked -> checked
// 					//indicate box checked in list
// 					$('#' + catNameCopy + '_list').addClass("checked");

// 					$("#display").append('<div id="' + catNameCopy + '_div">' + catNameCopy + '<br><img id="' + catNameCopy + '"src="' + fileNameCopy +'" alt="' + catNameCopy +
// 						'" style="width:100px;height:100;margin-left:1.5em"><p id="num' + (iCopy+1) + '">The number of Clicks : ' + numOfClickCopy + '</p></div><br>' ) ;

// 					$('#' + catNameCopy).click(function(){
// 						// console.log(catNameCopy + 'pic clicked');
// 						numOfClickCopy += 1;
// 						$('#num' + (iCopy+1)).html ('The number of Clicks : ' + numOfClickCopy);
// 					});
// 				}
// 				else { 	//when box was checked -> unchecked
// 					//indicate box unchecked in list
// 					$('#' + catNameCopy + '_list').removeClass("checked");

// 					$('#' + catNameCopy + '_div').remove();
// 				}
// 			};
// 		})(i, catName, fileName, numOfClick));
// 	}
// };