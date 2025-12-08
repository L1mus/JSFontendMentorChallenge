document.addEventListener('DOMContentLoaded', function() {
    const timeframes = ['daily', 'weekly', 'monthly'];
    let activeTimeframe = 'weekly';
    let jsonData = [];
    const navButtons = document.querySelectorAll('.profile-card__nav a');
    
    function loadData() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'data.json', true);

        ajax.addEventListener('load', function() {
            if (this.status === 200) {
                try {
                    jsonData = JSON.parse(this.responseText);
                    updateDashboard(activeTimeframe);
                } catch (error) {
                    console.error('Gagal memproses JSON:', error);
                }
            } else {
                console.error('Gagal mengambil data. Status:', this.status);
            }
        });

        ajax.addEventListener('error', function() {
            console.error('Terjadi kesalahan jaringan.');
        });
        ajax.send();
    }

    function updateDashboard(timeframe) {
        jsonData.forEach(function(activity) {
            const titleSlug = activity.title.toLowerCase().replace(' ', '-');
            const card = document.querySelector('.main-container_' + titleSlug);

            if (card) {
                const currentEl = card.querySelector('.current-hours');
                const previousEl = card.querySelector('.previous-hours');
                let dataTimeframe = activity.timeframes[timeframe];
                const currentHours = dataTimeframe.current;
                let previousHours = dataTimeframe.previous;

                let previousLabel = '';
                switch(timeframe) {
                    case 'daily':
                        previousLabel = 'Yesterday';
                        break;
                    case 'weekly':
                        previousLabel = 'Last Week';
                        break;
                    case 'monthly':
                        previousLabel = 'Last Month';
                        break;
                }
                currentEl.textContent = currentHours + 'hrs';
                previousEl.textContent = previousLabel + ' - ' + previousHours + 'hrs';
            }
        });
    }

    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            navButtons.forEach(function(b) {
                b.classList.remove('active');
            });

            this.classList.add('active');

            activeTimeframe = this.id;

            updateDashboard(activeTimeframe);
        });
    });

    function initDotMenus() {
        const wrappers = document.querySelectorAll('.dot-menu-wrapper');

        wrappers.forEach(function(wrapper) {
            const btn = wrapper.querySelector('.dot-btn');
            const menu = wrapper.querySelector('.dropdown-menu');

            if (!btn || !menu) return;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();

                let isOpened = btn.getAttribute('aria-expanded') === 'true';

                closeAllMenus();

                if (isOpened) {
                    closeMenu(btn, menu);
                } else {
                    openMenu(btn, menu);
                }
            });
        });

        function openMenu(btn, menu) {
            btn.setAttribute('aria-expanded', 'true');
            menu.classList.add('is-active');
        }

        function closeMenu(btn, menu) {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.remove('is-active');
        }

        function closeAllMenus() {
            const allMenus = document.querySelectorAll('.dropdown-menu.is-active');
            allMenus.forEach(function(menu) {
                const wrapper = menu.closest('.dot-menu-wrapper');
                const btn = wrapper.querySelector('.dot-btn');
                closeMenu(btn, menu);
            });
        }
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dot-menu-wrapper')) {
                closeAllMenus();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllMenus();
            }
        });
    }
    initDotMenus();
    loadData();
});

