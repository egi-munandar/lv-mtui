import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react'
import { MaterialTailwindControllerProvider } from './context';
import { Provider } from 'react-redux';
import { store } from './store/utils';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<ThemeProvider><MaterialTailwindControllerProvider>
            <Provider store={store}>
                <App {...props} />
            </Provider>

        </MaterialTailwindControllerProvider></ThemeProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
