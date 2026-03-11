# Front End Frameworks: Module 1: Practice Activity 1

## Angular CLI Setup and Project Structure

### Learning Objective
Master the Angular CLI and project structure needed for Assignment 1.

### Prerequisites
- Node.js installed on your system

### Step 1: Angular CLI Installation
- `npm install -g @angular/cli`
- `ng version` *(verify Angular CLI is installed)*

### Step 2: Create Practice Project
Create a project:
- `ng new practice-session`
- Configuration:
  - Routing  Yes
  - Stylesheet: CSS
  - SSR: No

### Step 3: Understand Modern Angular Structure
Explore the project structure:
- `cd practice-session`
- `src/app/app.ts` (root component)
- `src/app/app.routes.ts` (routing file)
- `angular.json` (project configuration)

### Step 4: Test Your Setup
- `ng serve`
- Open [http://localhost:4200](http://localhost:4200)
- Verify app loads successfully

### Step 5: Practice with ESLint
ESLint is not included by default — add it to your project first:

- `ng add angular-eslint`

Then run the linter:
- `ng lint`
- Observe the output for any lint errors or warnings.

#### Create a Sample Lint Error
1. Open `src/app/app.ts`.
2. Add an unused variable at the top of the file:
   ```typescript
   const unused = 123;
   ```
3. Run `ng lint` again. You should see a warning or error about the unused variable.
4. Remove or use the variable to resolve the lint error.

### Step 6: Run Unit Tests with ng test
Angular projects include unit testing setup by default.

- Run the test suite:
  - `ng test --no-watch`
- Observe the test results and coverage.

You can add or modify tests in the `src/app` directory to practice writing and running tests.

### Step 7: Customize Your App

1. Remove Default Content from `app.html`:
   Open `src/app/app.html` and delete the placeholder content. 

2. Insert Your Own Image:
   Add an `<img>` tag to display your own image. For example:
   ```html
   <img src="your-image.png" alt="Market App" style="max-width: 100%; height: auto;" />
   ```
   Place your image file in the `public/` folder.

3. Change the App Title:
   In `src/app/app.ts`, update the title signal or property to your preferred app name, e.g.:
   ```typescript
   protected readonly title = signal('Everyday Market App');
   ```

4. Re-run the Tests:
   Run:
   ```bash
   ng test
   ```
   If any tests fail due to the changes, open the relevant spec files (e.g., `app.spec.ts`) and update the expected title or content to match your new app.

### Step 8: Create Header Component
Generate your first component using CLI:
- `ng generate component shared/header`
- Notice the generated files:
  - `header.ts` (standalone component)
  - `header.html` (template)
  - `header.css` (styles)

#### Add the Shared Header to Your App
1. Import the Header Component in `app.ts`:
   Open `src/app/app.ts` and add the import:
   ```typescript
   import { Header } from './shared/header/header';
   ```
   Then, add `Header` to the `imports` array in the `@Component` decorator:
   ```typescript
   @Component({
     // ...existing code...
     imports: [RouterOutlet, Header],
     // ...existing code...
   })
   ```

2. Add the Header to the App Template:
   Open `src/app/app.html` and insert the header selector at the top:
   ```html
   <app-header></app-header>
   <!-- ...existing content... -->
   ```

   Customize the header with some css style etc.

---

**Next Steps:** Practice Activity 2 will cover creating more reusable components and `@Input`/`@Output` for component communication.
