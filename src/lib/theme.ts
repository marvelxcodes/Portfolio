export const THEME_KEY = 'theme';

export const themeBootScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t)document.documentElement.dataset.theme=t}catch(e){}`;
