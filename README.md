## Welcome!

Please see the **Frontend Assessment.pdf** for all the information about your assessment.\
Below is just a quick overview to get you up and running. Good luck!

From the frontend directory, install both the FE and BE packages:

```bash
npm run install-all-packages
```

Create the development environment file:

```bash
cp .env.example .env.development
```

Run the frontend development server from the frontend directory:

```bash
npm run start-fe
```

Run the backend development server from the frontend directory:

```bash
npm run start-be
```

If you want to run the backend without the delay (See assessment PDF) for easier development:

```bash
npm run start-be-without-delay
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.\
The backend api runs at [http://localhost:4000](http://localhost:4000)

### Api documentation

In the root of the project, you will find **API-docs.yaml**. This will specify how to use the api for this project.\
For easy reading, you can import the file in the [swagger editor](https://editor.swagger.io/)

### Login credentials

**email**: test@axxes.com\
**password**: test

### What I changed

- Added route protection and session validation
- Added search and pagination to the song lists
- Added loading, empty and error states
- Made the song rows expandable to show the extra song information
- Added light and dark themes
- Updated the layout and styling for different screen sizes

### Some implementation details

- API types are generated from `API-docs.yaml` and used by `openapi-fetch`.
- TanStack Query handles fetching, caching and request states.
- React Router loaders check the session before rendering protected pages.
- Tailwind CSS is used for the layout and themes.

### Development commands

```bash
npm run lint
npm run format:check
npm run generate:api-types
npx tsc --noEmit
npx vite build
```

### If I had more time

- Improve feedback when login or a mutation fails
- Check and refine the layout on more screen sizes
- Do a proper accessibility pass, including keyboard and screen-reader testing
- Add support for multiple playlists
- Add tests for the main flows
- Add drag-and-drop between the lists
- Extract repeated UI patterns into reusable components
- Use `class-variance-authority` to manage variants for components such as `Button`
