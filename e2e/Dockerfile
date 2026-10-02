FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app/e2e
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY entrypoint.sh /usr/local/bin/e2e-entrypoint
RUN chmod +x /usr/local/bin/e2e-entrypoint

ENTRYPOINT ["e2e-entrypoint"]
CMD ["npx", "playwright", "test"]
