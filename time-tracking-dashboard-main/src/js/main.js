async function main(){
     async  function fetchData() {
        try {
            const response = await fetch("data.json");
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const appData = fetchData();
    console .log(appData)
}




//FungsiKEBAB/DOT MENU
function setupMenu(triggerBtn, menuEl) {
    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = triggerBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        triggerBtn.setAttribute('aria-expanded', 'true');
        menuEl.classList.add('is-active');
    }

    function closeMenu() {
        triggerBtn.setAttribute('aria-expanded', 'false');
        menuEl.classList.remove('is-active');
    }

    document.addEventListener('click', (e) => {
        if (!menuEl.contains(e.target) && !triggerBtn.contains(e.target)) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuEl.classList.contains('is-active')) {
            closeMenu();
            triggerBtn.focus();
        }
    });
}

const dotBtn = document.getElementById('dotBtn');
const dropdownMenu = document.getElementById('cardDropdown');
setupMenu(dotBtn, dropdownMenu);

main()