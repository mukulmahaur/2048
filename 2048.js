var Create = (function () {
		array = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		undoarray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		score = 0;
		stopflag = 0;
		storescore = 0;

		config = {
			0:{
				'color' : "#776e65",
				'background' : 'rgba(238, 228, 218, 0.35)'
			},
			2: {
				'color' : "#776e65",
				'background' : "#eee4da"
			},
			4: {
				'color' : "#776e65",
				'background' :"#eee4da"
			}, 
			8: {
				'color' : "#f9f6f2",
				'background' :"#f2b179"
			},
			16: {
				'color' : "#f9f6f2",
				'background' : "#f59563"
			}, 
			32: {
				'color' : "#f9f6f2",
				'background' : "#f67c5f"
			},
			64: {
				'color' :"#f9f6f2",
				'background' : "#f65e3b"
			},
			128: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			256: {
				'color' :"#f9f6f2",
				'background' : "#edc850"
			},
			512: {
				'color' :"#f9f6f2",
				'background' : "#edc53f"
			},
			1024: {
				'color' :"#f9f6f2",
				'background' : "#edc53f"
			},
			2048: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			4096: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			8192: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			16384: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			32768: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			65536: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			131072: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			},
			262144: {
				'color' :"#f9f6f2",
				'background' : "#edcf72"
			}
		}

		var score_element = document.getElementById('score');
		var elementsArray = [];
		function addelementsarray(){
			for (var i=0;i<4;i++){
				for (var j=0;j<4;j++){
					if (!elementsArray[i]){
						elementsArray[i] = [];
					}
					elementsArray[i][j] = document.getElementById(return_block(i, j));
				// elementsArray[i].push(document.getElementById(return_block(i, j)));
				}
			}
		}


		function return_block(a,b){
			num = (a*4)+(b+1);
			number = num.toString();
			return number;
		}

		function print_b(tempb){
			console.log(tempb.join("\n"));
		}

		function copy(a) {
			temp = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			for (var i=0;i<4;i++){
				for(var j = 0;j<4;j++){
					temp[i][j] = a[i][j];
				}
			}
			return temp;
		}

		function randomlimit(k) {
		    var x = Math.floor((Math.random() * k) + 1);
		    return x-1;
		}

		function randomnumb(b){
			fg = 0;
			while (fg == 0){
				r = randomlimit(4);
				temp = b[r]
				tempele = randomlimit(4);
				if (b[r][tempele] == 0){
					ex = randomlimit(2);
					if (ex == 0){
						b[r][tempele] = 2;
					}
					if (ex == 1){
						b[r][tempele] = 4;
					}
					fg = 1;
				}
			}
			return b;
		}

		function state_equals(a,b){
			for (var i = 0;i<a.length;i++){
				for (var j = 0;j<a[i].length;j++){
					if(a[i][j]!=b[i][j]){
						return false;
					}
				}
			}
			return true;
		}

		function find_greatest(){
			max = 0;
			for (var i = 0;i<array.length;i++){
				for (var j = 0;j<array[i].length;j++){
					if(array[i][j]>max){
						max = array[i][j];
					}
				}
			}
			return max;
		}

		function change_color(array) {
			addelementsarray();
			for(var i=0;i<4;i++){
				for(var j =0;j<4;j++){
					if(array[i][j] in config){
						elementsArray[i][j].parentElement.style.background = config[array[i][j]].background;//"config."+array[i][j]+".background";
						elementsArray[i][j].style.color = config[array[i][j]].color; //"config."+array[i][j]+".color" ;

					}
				}
			}
		}

		function initialize(id) {
			if (id){
			    var rootElement = document.getElementById(id);
			    var x = document.createElement("TABLE");
			    rootElement.appendChild(x);
	
			}else{
			    var x = document.createElement("TABLE");
			    document.body.appendChild(x);
			}
		    x.setAttribute("class", "grid");
		    text = "<tbody><tr><td class=\"block\"><p class=\"element\" id=\"1\"></p></td><td class=\"block\"><p class=\"element\" id=\"2\"></p></td><td class=\"block\"><p class=\"element\" id=\"3\"></p></td><td class=\"block\"><p class=\"element\" id=\"4\"></p></td></tr><tr><td class=\"block\"><p class=\"element\" id=\"5\"></p></td><td class=\"block\"><p class=\"element\" id=\"6\"></p></td><td class=\"block\"><p class=\"element\" id=\"7\"></p></td><td class=\"block\"><p class=\"element\" id=\"8\"></p></td></tr><tr><td class=\"block\"><p class=\"element\" id=\"9\"></p></td><td class=\"block\"><p class=\"element\" id=\"10\"></p></td><td class=\"block\"><p class=\"element\" id=\"11\"></p></td><td class=\"block\"><p class=\"element\" id=\"12\"></p></td></tr><tr><td class=\"block\"><p class=\"element\" id=\"13\"></p></td><td class=\"block\"><p class=\"element\" id=\"14\"></p></td><td class=\"block\"><p class=\"element\" id=\"15\"></p></td><td class=\"block\"><p class=\"element\" id=\"16\"></p></td></tr></tbody>"
			// var p = document.getElementsByClassName('grid');
			x.innerHTML = text;
			add_in_grid();
		}

		function add_in_grid(){
			change_color(array);
			if(score == 0){
				score_element.innerHTML = "SCORE : 0";
			}
			else{
				score_element.innerHTML = "SCORE :"+ score;
			}

			for (var i=0;i<4;i++){
				for (var j=0;j<4;j++){
					if (array[i][j]!=0){
						elementsArray[i][j].innerHTML = array[i][j];
					}
					else{
						elementsArray[i][j].innerHTML = "";
					}
				}
			}
		}

		function right_index(a,x){
			if (x==2){
				if (a[3]==0){
					return -1;
				}
				else if (a[3]!=0){
					return 3;
				}
				}
			if (x==1){
				if (a[2] == 0 && a[3]== 0){
					return -1;
				}
				else if (a[2] != 0){
					return 2;
				}
				else if (a[3] != 0){
					return 3;
				}
				}
			if (x==0){
				if (a[1]==0 && a[2]== 0 && a[3]== 0){
					return -1;
				}
				else if (a[1] != 0){
					return 1;
				}
				else if (a[2] != 0){
					return 2;
				}
				else if (a[3] != 0){
					return 3;
				}
			}
		}

		function nearest_same(a,p){
			m = right_index(a,p);
			if (a[m] == a[p]){
				return 1;
			}
			else{
				return 0;
			}
		}


		function perform(ele,score){
			flag = [0,0,0,0];
			for (var k = 2;k>=0;k--){
				// console.log("that");
				if (right_index(ele,k) == -1){
					// console.log("here1");
					ele[3]=ele[k];
					ele[k]=0;
				}
				else{
					if ((nearest_same(ele,k)==1)){
						if(flag[right_index(ele,k)] != 1){
							// console.log("here2");
							q = right_index(ele,k);
							flag[q]=1;
							ele[q] = ele[q]+ele[k];
							score = score + ele[q];
							ele[k] = 0;
						}
						else{
							// console.log("here3");
							q = right_index(ele,k)-1;
							if (q != k){
								// console.log("here4");
								ele[q] = ele[k];
								ele[k] = 0;
							}
						}
					}
					if (nearest_same(ele,k) == 0){
						// console.log("here5");
						q = right_index(ele,k)-1
						if (q != k){
							// console.log("here6");
							ele[q] = ele[k];
							ele[k] = 0;
						}
					}
				}
			}
			return [ele,score]; 
		}


		function right(b,sc){
			// print_b(b);
			new_arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			bcopy = copy(b);
			for (var i=0;i<bcopy.length;i++){
				// console.log("this");
				temp = perform(bcopy[i],sc);
				bcopy[i] = temp[0];
				sc = temp[1];
				new_arr[i] =  bcopy[i];
			}
			if (state_equals(b,new_arr)){
				array = copy(new_arr);
				score = sc;
			}
			else{
				new_arr = randomnumb(new_arr);
				array = copy(new_arr);
				score = sc;
			}
		}

		function rotate(grid)
		{
		    for (var x = 0; x < 4 / 2; x++)
		    {
		        for (var y = x; y < 4-x-1; y++)
		        {
		            var temp = grid[x][y];
		            grid[x][y] = grid[y][4-1-x];
		            grid[y][4-1-x] = grid[4-1-x][4-1-y];
		            grid[4-1-x][4-1-y] = grid[4-1-y][x];
		            grid[4-1-y][x] = temp;
		        }
		    }
		}

		function up(){
			rotate(array);
			rotate(array);
			rotate(array);
			right(array,score);
			rotate(array);
		}

		function left(){
			rotate(array);
			rotate(array);
			right(array,score);
			rotate(array);
			rotate(array);
		}

		function down(){
			rotate(array);
			right(array,score);
			rotate(array);
			rotate(array);
			rotate(array);
		}

		function undothis(a,sc) {
			ssc = 0;
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					undoarray[i][j] = a[i][j];
				}
			}
			storescore = sc;
		}

		function oppundothis(a,sc) {
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					array[i][j] = a[i][j];
				}
			}
			score = sc;
		}

		function check(b){
			if (state_equals(up(b,score),b) && state_equals(left(b,score),b) && state_equals(right(b,score),b) && state_equals(down(b,score),b)){
				score = 0;
				array = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				array = randomnumb(array);
				score_element.innerHTML = "SCORE : "+ score;
				array = add_in_grid(array);
				alert("Game Over !!!! Start New Game");
			}
			if(find_greatest() == 2048 && stopflag == 0){
				stopflag++;
				alert("You win made 2048!!! Press OK to continue");
			}
		}

		window.addEventListener("keydown", checkKeyPressed, false);
		array = randomnumb(randomnumb(array));
		function checkKeyPressed(e) {
			// check(array);
		    if (e.keyCode == '38') {
		        undothis(array,score);
		        up(array,score);
				add_in_grid(array);
		    }
		    else if (e.keyCode == '40') {
		        undothis(array,score);
		        down(array,score);
				add_in_grid(array);
		    }
		    else if (e.keyCode == '37') {
		        undothis(array,score);
		        left(array,score);
				add_in_grid(array);
		    }
		    else if (e.keyCode == '39') {
		        undothis(array,score);
		        right(array,score);
				add_in_grid(array);
		    }
		    else if (e.keyCode == '8') {
		        oppundothis(undoarray,storescore);
				add_in_grid(array);
		    }
		}
			return {
				initialize: initialize,
			};

})();