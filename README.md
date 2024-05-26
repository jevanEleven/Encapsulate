# Encapsulate

## Guide for Local Development

First, run the development server:
### Version Checking
- Ensure you have Node installed with version 18.17.0 or later (you can check in terminal with node -v)
- Ensure you have Next installed with version 10.5.0 or later (you can check in terminal with next -v)
- Update the ENV file to have the correct links (see ENV below).

- Run the development server:

```bash
npm run dev
@@ -14,11 +31,11 @@ pnpm dev
bun dev
```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
- If you are getting a JSX element implicitly has type 'any' " error, you may try to either:
  - Reload VSCode window if in VSCode: ```ctrl shit P -> Developer: Reload Window```
  - Install Typescript React compatibility: ```npm install --dev @types/react```
 - If you are getting a supabase not found error, you may try to install the library.
  - ```npm install @supabase/supabase-js```
  
*This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.*

## Env

```env
NEXT_PUBLIC_URL="http://localhost:3000"

PGSQL_URI=""

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```
## Testing

This project is set up with Jest to facilitate testing.

Test files should be placed in the `__tests__` directory at the root of the project.

To run the tests, use

```bash
npm run test
```

More documentation at [jestjs.io](https://jestjs.io/docs/getting-started)
