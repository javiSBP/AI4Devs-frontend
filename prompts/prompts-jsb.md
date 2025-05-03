# Prompts Collection

---

### Understanding the frontend project structure and conventions

Prompt:

```
understand the project by reading the README.md files, checking the directory structure, code conventions and best practices used mainly for the frontend
```

---

### Creating a position screen with a kanban board for candidates

Prompt:

```
## role and context
now you are an experienced frontend software engineer with expertise in UI design that is going to create the position screen, which is a page to view and manage different candidates for a specific position.

## UI requiremements

- Title of position must be shown as the title of the screen in the top.
- Add an arrow to the left of the title so the user can go back to the @Positions.tsx screen
- The screen must show as many columns for a kanban representing different phases of the interview flow for the position-
- Each candidate card must be inside the corresponding column according to the interview phase the candidate is.
- Layout must be responsive so it can be properly viewed in mobile devices.
- An image is attached to give you an idea.
- Keep the overall style consistent with the rest of the screens.

## Technical requirements

- The route must be defined in @App.js and it can be navigated from the  primary button "Ver proceso" in @Positions.tsx
- Create and use re-usable components for the screen wherever you think.
- Keep in mind the KISS principle and don't overarchitecture things.
- On next steps we will implement API integration so the screen gets the actual interview step columns and candidates current interview step.
- Think a plan before acting and proceed step by step.
```

---

### Improving the position screen styling

Prompt:

```
improve to position screen styles to make it more appealing while keeping the overall project style
```

---

### Fixing rating circles size consistency

Prompt:

```
there is an issue with the size of the filled rating vs. the empty in the @CandidateCard.tsx . Can you increase filled style to be the same size as the empty one?
```
