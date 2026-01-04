# Contributing to Modern Portfolio & Blog Template

First off, thank you for considering contributing! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (Node version, OS, browser)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Possible implementation** (if you have ideas)

### 🔧 Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
3. **Test your changes**:
   - Ensure `npm run build` works
   - Test in development mode (`npm run dev`)
   - Check TypeScript types (`npm run typecheck`)
4. **Commit with clear messages**:
   - Use present tense ("Add feature" not "Added feature")
   - Reference issues in commit messages
5. **Push to your fork** and submit a pull request

### 📝 Code Style

- **TypeScript**: Use strict mode, no `any` types
- **React**: Functional components with hooks
- **Formatting**: The project uses standard formatting (follow existing patterns)
- **Naming**: 
  - Components: PascalCase
  - Files: kebab-case for routes, PascalCase for components
  - Functions: camelCase

### 🧪 Testing

While we don't have automated tests yet, please manually test:
- Navigation between pages
- Blog post viewing
- Dark mode toggle
- Mobile responsiveness
- Build and production mode

### 📚 Documentation

- Update README.md if you change functionality
- Add JSDoc comments for complex functions
- Update inline comments for clarity

## Development Setup

```bash
git clone https://github.com/bykemalh/bykemalh.me.git
cd bykemalh.me
npm install
cp .env.example .env
# Configure your .env
npx prisma generate
npx prisma db push
npm run dev
```

## Questions?

Feel free to open an issue or reach out on Twitter [@bykemalh](https://twitter.com/bykemalh)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
