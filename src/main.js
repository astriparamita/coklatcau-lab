import './style.css';
import { store } from './store.js';
import { renderApp } from './ui.js';

const appRoot = document.getElementById('app');

function mount() {
  if (!appRoot) return;
  renderApp(appRoot, store);
}

store.subscribe(mount);
mount();
