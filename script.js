(function(){
	
	var Memory = {

		// создаём карточку
		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},
		shuffleCards: function(cardsArray){
			// используем встроенный метод .shuffle
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		cardClicked: function(){
			// получаем текущее состояние родительской переменной
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
						} else {
							_.guess = null;
							_.paused = true;
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// если мы перевернули все карточки
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		// показываем победное сообщение
		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// перезапуск игры
		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Тасование Фишера–Йетса - https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="./img/BackyB.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// карточки
	var cards = [
		{	
			// название
			name: "PS",
			// адрес картинки
			img: "./img/PS.png",
			// порядковый номер пары
			id: 1,
		},
		{
			name: "AI",
			img: "./img/AI.png",
			id: 2
		},
		{
			name: "AE",
			img: "./img/AE.png",
			id: 3
		},
		{
			name: "LRc",
			img: "./img/LRc.png",
			id: 4
		}, 
		{
			name: "PR",
			img: "./img/PR.png",
			id: 5
		},
		{
			name: "Figma",
			img: "./img/figma.png",
			id: 6
		},
		{
			name: "Blender",
			img: "./img/Blender.png",
			id: 7
		},
		{
			name: "Steam",
			img: "./img/Steam.png",
			id: 8
		},
		{
			name: "EpG",
			img: "./img/EpG.png",
			id: 9
		},
		{
			name: "Telegram",
			img: "./img/Telegram.png",
			id: 10
		},
		{
			name: "Vk",
			img: "./img/Vk.png",
			id: 11
		},
		{
			name: "Discord",
			img: "./img/Discord.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();
