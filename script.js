document.addEventListener('DOMContentLoaded', () => {

    const hotspots = document.querySelectorAll('.hotspot');
    const layers = document.querySelectorAll('.image-layer');
    const container = document.querySelector('.interactive-container');
    const aboutSection = document.querySelector('.about-section');

    const aboutData = {
        'who-we-are': {
            title: 'Кто мы',
            category: 'О команде',
            text: 'Tambur Records — студия с фокусом на рэп и хип-хоп. Мы помогаем артистам собрать сильный трек: от записи вокала до финального мастера. Каждый проект — поиск своего звучания внутри жанра.',
            meta: [
                { label: 'Основана', value: '2019' },
                { label: 'Проектов', value: '200+' },
                { label: 'Город', value: 'Москва' }
            ],
            focus: '51.5% 68%',
            scale: '1.5'
        },
        'equipment': {
            title: 'Оборудование',
            category: 'Технический райдер',
            text: 'Топовые преампы Neve и SSL, конденсаторные микрофоны Neumann U87, мониторы Genelec и полностью аналоговый тракт записи. Всё, чтобы ваш звук был безупречным.',
            meta: [
                { label: 'Стойки', value: '4' },
                { label: 'Инструменты', value: '30+' },
                { label: 'Формат', value: '24bit / 96kHz' }
            ],
            focus: '22% 48%',
            scale: '1.7'
        },
        'team': {
            title: 'Команда',
            category: 'Наши инженеры',
            text: 'Звукорежиссёры с фокусом на рэп и хип-хоп — от андеграунд-сцены до коммерческих релизов. Знаем, как звучит современная читка и как её правильно собрать в миксе.',
            meta: [
                { label: 'Специалистов', value: '12' },
                { label: 'Жанры', value: 'Rap / Hip-Hop' },
                { label: 'Опыт', value: '10+ лет' }
            ],
            focus: '72% 55%',
            scale: '1.6'
        },
        'about-studio': {
            title: 'О студии',
            category: 'Пространство',
            text: 'Студия спроектирована с учётом идеальной акустики. Зона отдыха и атмосфера, в которой удобно работать долго — всё, чтобы сосредоточиться на звуке.',
            meta: [
                { label: 'Площадь', value: '320 м²' },
                { label: 'Залов', value: '3' },
                { label: 'Режим', value: '24/7' }
            ],
            focus: '45% 52%',
            scale: '1.7'
        },
        'our-projects': {
            title: 'Наши проекты',
            category: 'Портфолио',
            text: 'Из наших стен вышли сотни треков, звучащих по всей России — от андеграунд-рэпа до коммерческих хип-хоп релизов.',
            meta: [
                { label: 'Релизов', value: '200+' },
                { label: 'Артистов', value: '60+' },
                { label: 'Формат', value: 'Digital' }
            ],
            focus: '88% 38%',
            origin: '80% 38%',
            scale: '2.0'
        },
        'session-vibe': {
            title: 'Сессия',
            category: 'Процесс · Атмосфера',
            text: 'Здесь не торопят. Сидим до того момента, пока тейк не начнёт звучать так, как должно. Свет, бит в наушниках, своя комната — никого лишнего, никаких часов на стене. Артисту должно быть комфортно — тогда пойдёт настоящая читка.',
            meta: [
                { label: 'Формат', value: 'без ограничений по дублям' },
                { label: 'Атмосфера', value: 'спокойно и по-домашнему' },
                { label: 'Окружение', value: 'только команда и артист' }
            ],
            focus: '57% 38%',
            scale: '1.7'
        }
    };

    function switchLayer(targetId) {
        layers.forEach(layer => {
            layer.classList.remove('active');
            layer.style.removeProperty('--img-focus');
            layer.style.removeProperty('--img-scale');
        });

        const targetLayer = document.getElementById(targetId);
        if (targetLayer) {
            targetLayer.classList.add('active');
        }
    }
    
    function openSplitView(hotspot) {
        const dataKey = hotspot.getAttribute('data-split');
        populateSplitView(dataKey);
        
        const parentLayer = hotspot.closest('.image-layer');
        const siblingSplits = parentLayer.querySelectorAll('.hotspot-split');
        
        let tabsContainer = aboutSection.querySelector('.about-tabs-container');
        if (!tabsContainer) {
            tabsContainer = document.createElement('div');
            tabsContainer.className = 'about-tabs-container';
            aboutSection.insertBefore(tabsContainer, aboutSection.firstChild);
        }
        
        if (siblingSplits.length > 1) {
            let tabsHtml = '<div class="about-tabs">';
            siblingSplits.forEach(sib => {
                const sKey = sib.getAttribute('data-split');
                const sText = sib.querySelector('.text').textContent;
                const isActive = (sKey === dataKey) ? 'active' : '';
                tabsHtml += `<button class="about-tab ${isActive}" data-split="${sKey}">${sText}</button>`;
            });
            tabsHtml += '</div>';
            tabsContainer.innerHTML = tabsHtml;
            
            const tabs = tabsContainer.querySelectorAll('.about-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    populateSplitView(tab.getAttribute('data-split'));
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                });
            });
        } else {
            tabsContainer.innerHTML = ''; 
        }

        const mainContent = document.getElementById('main-content-tour');
        if (mainContent) mainContent.classList.add('about-mode');
    }

    function populateSplitView(dataKey) {
        const data = aboutData[dataKey];
        if (!data) return;
        const titleEl = document.getElementById('about-title');
        const descEl = document.getElementById('about-description');
        const tagEl = document.getElementById('about-tag');
        const metaEl = document.getElementById('about-meta');
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.text;
        if (tagEl) tagEl.textContent = data.category || '';
        if (metaEl) {
            if (data.meta && data.meta.length) {
                metaEl.innerHTML = data.meta.map(m =>
                    `<div class="about-meta-item"><span class="meta-label">${m.label}</span><span class="meta-value">${m.value}</span></div>`
                ).join('');
                metaEl.style.display = 'flex';
            } else {
                metaEl.innerHTML = '';
                metaEl.style.display = 'none';
            }
        }
        
        const activeLayer = document.querySelector('.image-layer.active');
        if (activeLayer) {
            activeLayer.style.setProperty('--img-focus', data.focus || 'center');
            activeLayer.style.setProperty('--img-scale', data.scale || '1.25');
            if (data.origin) {
                activeLayer.style.setProperty('--img-origin', data.origin);
            } else {
                activeLayer.style.removeProperty('--img-origin');
            }
        }
    }

    // Close about section handler (Button inside sidebar)
    const closeAboutBtn = document.getElementById('about-close-btn');
    if (closeAboutBtn) {
        closeAboutBtn.addEventListener('click', closeInfoView);
    }

    // Top-left "Back to Room" Button
    const cornerBackBtn = document.getElementById('about-back-top-left');
    if (cornerBackBtn) {
        cornerBackBtn.addEventListener('click', closeInfoView);
    }

    function closeInfoView() {
        const mainContent = document.getElementById('main-content-tour');
        if (mainContent) mainContent.classList.remove('about-mode');
        const activeLayer = document.querySelector('.image-layer.active');
        if (activeLayer) {
            activeLayer.style.removeProperty('--img-focus');
            activeLayer.style.removeProperty('--img-scale');
            activeLayer.style.removeProperty('--img-origin');
        }
    }

    if (hotspots.length > 0) {
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', (e) => {
                if (hotspot.classList.contains('hotspot-split')) {
                    openSplitView(hotspot);
                    return;
                }
                if (hotspot.classList.contains('btn-about-back')) {
                    if (container) container.classList.remove('about-mode');
                    const activeLayer = document.querySelector('.image-layer.active');
                    if (activeLayer) {
                        activeLayer.style.removeProperty('--img-focus');
                        activeLayer.style.removeProperty('--img-scale');
                    }
                    return;
                }

                const target = hotspot.getAttribute('data-target');
                if (target) {
                    switchLayer(target);
                }
            });
        });
    }

});
