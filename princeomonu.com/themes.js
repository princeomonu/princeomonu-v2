const themes = {
    navy: {
        name: 'Navy',
        colors: {
            background: '#0a192f',
            'light-background': '#112240',
            'lightest-background': '#233554',
            text: '#8892b0',
            'light-text': '#a8b2d1',
            'lightest-text': '#ccd6f6',
            white: '#e6f1ff',
            accent: '#64ffda',
        }
    },
    ivory: {
        name: 'Ivory',
        colors: {
            background: '#ffffff',
            'light-background': '#f5f5f5',
            'lightest-background': '#e8e8e8',
            text: '#4a4a4a',
            'light-text': '#666666',
            'lightest-text': '#2d2d2d',
            white: '#ffffff',
            accent: '#D35400', // Burnt orange
        }
    },
    purple: {
        name: 'Purple',
        colors: {
            background: '#2d1b69',
            'light-background': '#392082',
            'lightest-background': '#4f2db3',
            text: '#b8b1d1',
            'light-text': '#cdc7e5',
            'lightest-text': '#e2ddf4',
            white: '#f5f3ff',
            accent: '#ff61d8',
        }
    },
    forest: {
        name: 'Forest',
        colors: {
            background: '#1a2f1c',
            'light-background': '#2a472c',
            'lightest-background': '#355937',
            text: '#92b094',
            'light-text': '#b8d1b9',
            'lightest-text': '#d6f6d7',
            white: '#f1fff2',
            accent: '#00ff9d',
        }
    },
    sunset: {
        name: 'Sunset',
        colors: {
            background: '#2f1a1a',
            'light-background': '#472a2a',
            'lightest-background': '#593535',
            text: '#b09292',
            'light-text': '#d1b8b8',
            'lightest-text': '#f6d6d6',
            white: '#fff1f1',
            accent: '#ff9d00',
        }
    }
};

// Function to apply theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });

    // Store the selected theme
    localStorage.setItem('selected-theme', themeName);

    // Update theme switcher button if it exists
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.dataset.currentTheme = themeName;
    }
}

// Function to get next theme
function getNextTheme(currentTheme) {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    return themeNames[nextIndex];
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('selected-theme') || 'navy';
    applyTheme(savedTheme);
}

// Export for use in other files
window.themeManager = {
    themes,
    applyTheme,
    initTheme,
    getNextTheme
};