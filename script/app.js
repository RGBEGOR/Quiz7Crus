const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	
	new Question("Какое событие стало поводом к началу крестовых походов? ", 
	[
		new Answer('Захват Иерусалима крестаносцами', 0),
		new Answer("Арабский халифат", 0),
		new Answer("Нападение Византии", 0),
		new Answer("Захват турками-сельджуками палестины", 1)
	]),
	new Question("Кто выступил с призывом к первому крестовому походу?", 
	[
		new Answer('Папа римский УрбанII', 1),
		new Answer("Папа Клементий", 0),
		new Answer("Рыцари крестаносцы", 0),
		new Answer("Папа Лев 10", 0)
	]),
	new Question("Какой важный  палестинский город был захвачен крестоносцами в результате первого крестового похода? ", 
	[
		new Answer('Анкара', 0),
		new Answer("Эдесса", 0),
		new Answer("Антиохия", 0),
		new Answer("Иерусалим", 1)
	]),
	new Question("Крестовый поход, организованный в 1212 году, получил название", 
	[
		new Answer('Взрослый ', 0),
		new Answer("Детский", 1),
		new Answer("Нищий", 0),
		new Answer("Голодный", 0)
	]),
	new Question("Общепринятые хронологические рамки крестовых походов", 
	[
		new Answer('1096-1272', 1),
		new Answer("1069-1722 ", 0),
		new Answer("1096-2712 ", 0),
		new Answer("1906-7122", 0)

	]),
	new Question("Почему начались Крестовые походы?", 
	[
		new Answer('Понты Папы Римского ', 0),
		new Answer("Освободить святые землю Гроба Господня", 1),
		new Answer("От безделья ", 0),
		new Answer("Желание обоготится на новых землях", 0)
	]),
	new Question("Что пообещал папа Урбан II европейцам в 1096 году, чтобы призвать их отправиться на Восток?", 
	[
		new Answer('Популярность', 0),
		new Answer("Много уважухи", 0),
		new Answer("Освобождение от грехов", 1),
		new Answer("Деньги яхты автомобили", 0)
	]),
	new Question("Кто участвовал в Крестовых походах?", 
	[
		new Answer('крестьяне', 0),
		new Answer("горожане ", 0),
		new Answer("рыцари", 0),
		new Answer("верно все перечисленное", 1)
	]),
	new Question("Как называлось главное государство крестоносцев на Востоке?", 
	[
		new Answer('Иерусалимское королевство', 1),
		new Answer("Тевтонское королевство", 0),
		new Answer("Тамплиерское королевство", 0),
		new Answer("Ливонский орден", 0)
	]),
	new Question("Как называется организация монахов и рыцарей со своими целями и правилами поведения?", 
	[
		new Answer('Гильдия ', 0),
		new Answer("Союз ", 0),
		new Answer("Орден", 1),
		new Answer("Конгламерат ", 0)
	]),


	new Question("Чем закончились все Крестовые походы?", 
	[
		new Answer('Победой Римской церкви ', 0),
		new Answer("Победой крестоносцев ", 0),
		new Answer("Поражением и мирным договорм с Востоком", 1),
		new Answer("Восток сатл колонией Запада", 0)
	]),
	new Question("Когда закончились крестовые походы?", 
	[
		new Answer('в 13 веке', 1),
		new Answer("в 12 веке", 0),
		new Answer("в 11 веке", 0),
		new Answer("в 10 веке", 0)
	]),
	new Question("Император Священной Римской империи, возглавивший третий крестовый поход:", 
	[
		new Answer('Карл 13', 0),
		new Answer("Оттон 1 ", 0),
		new Answer("Фридрих 3 ", 0),
		new Answer("Фридрих Барбаросса ", 1)
	]),
	new Question("Укажите, какое из ниже перечисленных государств не было госу¬дарством крестоносцев:", 
	[
		new Answer('королевство Иерусалим', 0),
		new Answer("графство Толедо", 1),
		new Answer("княжество Антиохия", 0),
		new Answer("графство Триполи; ", 0)
	]),
	new Question("Как в Европе называли султана, захватившего Иерусалим?", 
	[
		new Answer('Салахаддин ', 1),
		new Answer("Мухаммед", 0),
		new Answer("Али", 0),
		new Answer("Гарун-аль-Рашид", 0)

	]),

	new Question("Укажите имя Папы римского, призвавшего в городе Клермон к поъходу со словами Так хочет Бог: ", 
	[
		new Answer('Урлих1', 0),
		new Answer("Урбан 2  ", 1),
		new Answer("Инокентий 2 ", 0),
		new Answer("Стефан 1", 0)
	]),
	new Question("Где произошло это событие - В огне пожаров погибли… ценнейшие произведения искусства. Крестоносцы разграбили храм Святой Софии", 
	[
		new Answer('Константинополь', 1),
		new Answer("Иерусалим", 0),
		new Answer("Анкара", 0),
		new Answer("Клермон-феран", 0)
	]),
	new Question("Выберите короля который не участвовал в крестовых походах", 
	[
		new Answer('Болдуин 4', 0),
		new Answer("Фридрих Барабароса", 0),
		new Answer("Ричард львиное сердце", 0),
		new Answer("Карл Великий", 1)
	]),
	new Question("Выберите ряд личностей, которые имели отношение к крестовым походам", 
	[
		new Answer('Мешко I, Болеслав I Храбрый, князь Симеон', 0),
		new Answer("Саладин, Урбан II, Филипп II Август", 1),
		new Answer("Хлодвиг, Карл Мартелл, Пипин Короткий", 0),
		new Answer("Путин Байден Зеленский", 0)
	]),
	new Question("Выберите характеристики, отличающие католическую церковь от православной", 
	[
		new Answer(' богослужение велось на латинском языке, главой церкви был Папа Римский и служителям нельзя было вступать в брак ', 1),
		new Answer("глава церкви - пророк Мухаммед, богослужение велось на арабском языке, было принято многоженство", 0),
		new Answer("Префекты", 0),
		new Answer("глава церкви был византийский патриарх, богослужение велось на местных и греческом языках, в брак нельзя было вступать только монахам", 0)

	]),

	new Question("Централизованная, богатая и очень могущественная", 
	[
		new Answer('Римский Папа', 0),
		new Answer("Каталичекая церковь ", 1),
		new Answer("Рыцари", 0),
		new Answer("Королесвкая власть", 0)
	]),
	new Question("Раскол христианской церкви на православную и католическую произошёл в", 
	[
		new Answer('1054', 1),
		new Answer("1504", 0),
		new Answer("1405", 0),
		new Answer("5104", 0)
	]),
	new Question("Как могучие владыки, вмешивались в дела царств и подчиняли королей", 
	[
		new Answer('Евреи', 0),
		new Answer("Короли Франции", 0),
		new Answer("Хлодвиг1", 0),
		new Answer("Римскийе Папы", 1)
	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



