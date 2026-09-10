import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'trailing-slash-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          const pages = [
            '/about', '/services', '/industries', '/case-studies', 
            '/insights', '/contact', '/privacy', '/terms',
            '/services/strategy', '/services/finance', 
            '/services/technology', '/services/innovation', '/services/growth'
          ];
          if (pages.includes(url)) {
            const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            res.writeHead(301, { Location: url + '/' + query });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        serviceStrategy: resolve(__dirname, 'services/strategy/index.html'),
        serviceFinance: resolve(__dirname, 'services/finance/index.html'),
        serviceTechnology: resolve(__dirname, 'services/technology/index.html'),
        serviceInnovation: resolve(__dirname, 'services/innovation/index.html'),
        serviceGrowth: resolve(__dirname, 'services/growth/index.html'),
        industries: resolve(__dirname, 'industries/index.html'),
        caseStudies: resolve(__dirname, 'case-studies/index.html'),
        insights: resolve(__dirname, 'insights/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
      },
    },
  },
});
