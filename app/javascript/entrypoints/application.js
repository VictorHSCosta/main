import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import '../stylesheets/application.tailwind.css'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('../Pages/**/*.jsx', { eager: true })
    return pages[`../Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
