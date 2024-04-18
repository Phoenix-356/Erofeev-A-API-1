document.addEventListener('DOMContentLoaded', function() {
    // Получение данных из localStorage или использование пустого массива
    let data = JSON.parse(localStorage.getItem('schedule')) || [];

    // Функция для отображения расписания на странице
    function renderSchedule() {
        const tbody = document.querySelector('#schedule tbody');
        tbody.innerHTML = '';
        data.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.name}</td>
                <td>${course.time}</td>
                <td>${course.maxParticipants}</td>
                <td>${course.currentParticipants}</td>
                <td>
                    <button class="btn btn-primary enroll" data-id="${course.id}" ${course.currentParticipants >= course.maxParticipants ? 'disabled' : ''}>Записаться</button>
                    <button class="btn btn-secondary cancel" data-id="${course.id}" ${course.currentParticipants === 0 ? 'disabled' : ''}>Отменить запись</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        updateLocalStorage(); // Сохраняем данные в локальное хранилище при каждом обновлении расписания
    }

    // Функция для обновления данных в localStorage
    function updateLocalStorage() {
        localStorage.setItem('schedule', JSON.stringify(data));
    }

    // Обработчик клика по кнопке "Записаться"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('enroll')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const course = data.find(course => course.id === id);
            if (course.currentParticipants < course.maxParticipants) {
                course.currentParticipants++;
                renderSchedule();
            }
        }
    });

    // Обработчик клика по кнопке "Отменить запись"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const course = data.find(course => course.id === id);
            if (course.currentParticipants > 0) {
                course.currentParticipants--;
                renderSchedule();
            }
        }
    });

    // Инициализация расписания при загрузке страницы
    renderSchedule();
});