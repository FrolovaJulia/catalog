/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
 if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

// Фильтр на мобильных устройствах
const sidebarToggleBtn = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const overlayEl = document.querySelector('#overlay');
const bodyEl = document.body;
const formBtn = document.querySelector('#form-btn');

// Клик по кнопке для скрытия / показа sidebar--mobile и изменение иконки
// (Клик по иконке гамбургер)
sidebarToggleBtn.addEventListener('click', function() {
    menuIcon.classList.toggle('menu-icon-active');
    sidebar.classList.toggle('sidebar--mobile-active');
    overlayEl.classList.toggle('active');
    bodyEl.classList.toggle('noscroll');
});

function removeActive() {
    menuIcon.classList.remove('menu-icon-active');
    sidebar.classList.remove('sidebar--mobile-active');
    overlayEl.classList.remove('active');
    bodyEl.classList.remove('noscroll');
}

// Скрытие sidebar--mobile при клике по form-btn (Применить / Сбросить фильтры)

formBtn.addEventListener('click', removeActive);

// Скрытие sidebar--mobile при клике по overlay

overlayEl.addEventListener('click', removeActive);

// Скрытие sidebar--mobile при ресайзе экрана

window.addEventListener('resize', removeActive);


// Показать ещё три карточки
const btnShowMoreCards = document.querySelector('.btn-more');
const hiddenCards = document.querySelectorAll('.card-linc--hidden');

// Клик по кнопке и показ трех скрытых карточек
btnShowMoreCards.addEventListener('click', function() {
    hiddenCards.forEach(function(card) {
        card.classList.remove('card-linc--hidden');
    });
});

// Показать/скрыть контент внутри виджетов
const widgets = document.querySelectorAll('.widget');

// Находим все виджеты на странице
widgets.forEach(function(widget) {

    // Слушаем клик внутри виджета
    widget.addEventListener('click', function(e) {
        // Если клик по заголовку - тогда скрываем / показываем тело виджета
        if (e.target.classList.contains('widget__title')) {
            e.target.classList.toggle('widget__title--active');
            e.target.nextElementSibling.classList.toggle('widget__body--hidden');
        }
    });
});

// Location - кнопка Любая
const checkboxAny = document.querySelector('#location-05');
const topLocationCheckboxes = document.querySelectorAll('[data-location-param]');

// Выбор кнопки Любая и отключение других чекбоксов
checkboxAny.addEventListener('change', function() {
    
    if (checkboxAny.checked) {
        topLocationCheckboxes.forEach(function(item) {
            item.checked = false;
        });
    }
});

// Отключаем кнопку Любая при выборе других параметров
topLocationCheckboxes.forEach(function(item) {
    item.addEventListener('change', function() {
        if (checkboxAny.checked) {
            checkboxAny.checked = false;
        }
    });
});

// Показать ещё 3 доп. опции в фильтре

const showMoreOptions = document.querySelector('.widget__btn-show-hidden');
const hiddenCheckBoxes = document.querySelectorAll('.checkbox--hidden');

showMoreOptions.onclick = function (e) {
    e.preventDefault();

    // Если блоки были скрыты - значит показываем
    if (showMoreOptions.dataset.options == 'hidden') {
		hiddenCheckBoxes.forEach(function (item) {
			item.style.display = 'block';
		});
		showMoreOptions.innerText = 'Скрыть дополнительные опции';
		showMoreOptions.dataset.options = 'visible';
	}
	// Если блоки были видны - значит скрываем
	else if (showMoreOptions.dataset.options == 'visible') {
		hiddenCheckBoxes.forEach(function (item) {
			item.style.display = 'none';
		});
		showMoreOptions.innerText = 'Показать ещё';
		showMoreOptions.dataset.options = 'hidden';
	}
}
