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

---

### Using emojis for rating indicators

Prompt:

```
still having the issue maybe it's related to the font. try another strategy like using emoji.
```

---

### Implementing drag and drop for candidates

Prompt:

```
implement now a drag and drop system to move candidates into the different interview steps of the position
```

---

### Removing hover effect from kanban columns

Prompt:

```
Remove the card:hover effect from the @KanbanColumn.tsx
```

---

### Integrating with backend API for interview steps

Prompt:

````
now, let's integrate the positions kanban with the backend. The endpoints have been already developed so there is only frontend work to do. First let's get the interview steps that will match the columns of the kanban.

## backend endpoint interface

GET /positions/:id/interviewFlow

## backend response example

```json
{
      "positionName": "Senior backend engineer",
      "interviewFlow": {

              "id": 1,
              "description": "Standard development interview process",
              "interviewSteps": [
                  {
                      "id": 1,
                      "interviewFlowId": 1,
                      "interviewTypeId": 1,
                      "name": "Initial Screening",
                      "orderIndex": 1
                  },
                  {
                      "id": 2,
                      "interviewFlowId": 1,
                      "interviewTypeId": 2,
                      "name": "Technical Interview",
                      "orderIndex": 2
                  },
                  {
                      "id": 3,
                      "interviewFlowId": 1,
                      "interviewTypeId": 3,
                      "name": "Manager Interview",
                      "orderIndex": 2
                  }
              ]
          }
  }
````

## relevant information

- poistionName: This gives the position title
- interviewSteps: This gives the number of columns, the id of the interview step and the name of the interview step

## technical requirements

- check @routes directory to check the route and backend implementation
- use @services folder to call the endpoints
- do not implement any other endpoint, we will proceed step by step

```

---

### Fixing missing dependencies and unused imports

Prompt:

```

fix this errors

```

---

### Fixing 404 Not Found error when fetching interview flow

Prompt:

```

I am having this error in browser console when calling the backend for route
http://localhost:3010/positions/Senior%20Backend%20Engineer/interviewflow,
`404 Not Found` and I see the attached image on screen

```

---

### Debugging API call to backend

Prompt:

```

Still having the 404 issue, can you check if the frontend route call matches the backend route?

```

---

### Fixing singular/plural route mismatch

Prompt:

```

check also routes on @index.ts to see if it matches frontend

```

---

### Setting up Prisma seed configuration

Prompt:

```

add prisma:seed to project

```

---

### Fixing map of undefined error in API response

Prompt:

```

npw the API call is working but I get this error in browser:

```
PositionDetails.tsx:146 Error fetching interview flow: TypeError: Cannot read properties of undefined (reading 'map')
    at fetchInterviewFlow (PositionDetails.tsx:113:1)
fetchInterviewFlow	@	PositionDetails.tsx:146
await in fetchInterviewFlow
(anonymous)	@	PositionDetails.tsx:153
```

```

---

### Project Summary: AI4Devs-frontend

Prompt:

```

# Project Summary: AI4Devs-frontend

This conversation involved developing a frontend application for a talent tracking system with React. The main focus was creating a position screen with a kanban board to manage candidates through different interview stages.

## Key Development Steps:

1. **Initial Project Understanding**

   - Analyzed project structure (React frontend, Express backend with Prisma ORM)
   - Identified key directories and files
   - Reviewed code conventions and dependencies

2. **Position Screen Development**

   - Created a responsive kanban board layout
   - Implemented components: PositionDetails, KanbanColumn, CandidateCard
   - Added back navigation and proper styling

3. **UI Enhancements**

   - Improved visual styling with cards, shadows, and color-coding
   - Fixed rating indicators using emojis
   - Added responsive design for mobile devices

4. **Drag and Drop Implementation**

   - Added React DnD for candidate movement between columns
   - Created context for state management
   - Implemented visual feedback during drag operations

5. **Backend Integration**

   - Connected to API endpoints for interview flow data
   - Fixed route path issues (singular vs plural)
   - Added proper error handling and fallback mechanisms
   - Fixed TypeScript typing issues with nested API response structure

6. **Bug Fixes**
   - Resolved 404 errors by correcting API endpoint paths
   - Fixed TypeScript errors with proper interface definitions
   - Added data validation to handle unexpected API responses
   - Installed missing dependencies

The final implementation is a functional kanban board that displays interview stages from the backend API, allows drag-and-drop movement of candidates between stages, and handles various edge cases gracefully.

````

---

## Integrating Candidates API

The next endpoint gets information of the candidates applying for a position ID. So it returns the candidates to show on @CandidateCard.tsx.

## backend endpoint interface

GET /position/:id/candidates

## backend response example

```json
[
      {
           "fullName": "Jane Smith",
           "currentInterviewStep": "Technical Interview",
           "averageScore": 4
       },
       {
           "fullName": "Carlos García",
           "currentInterviewStep": "Initial Screening",
           "averageScore": 0
       },
       {
           "fullName": "John Doe",
           "currentInterviewStep": "Manager Interview",
           "averageScore": 5
      }
 ]
````

## relevant information

- **name**: Full name of the candidate
- **current_interview_step**: current phase of the candidate in the interview flow.
- **score**: Average candidate score

## technical requirements

- check @backend/routes directory to check the route and backend implementation
- use @services folder to call the endpoints
- do not implement any other endpoint, we will proceed step by step

---

## Updating Kanban Column Colors

```
change @getHeaderStyle to assign a color by ID to a maximum of 10 cases depending on the ID instead of the title
```

---

## Implementing candidate interview stage updates

````
The last endpoint updates the interview step of the candidate when is moved (drag'n drop) to a different interview step

## backend endpoint interface

PUT /candidates/:id/stage

## body data
{
     "applicationId": "1",
     "currentInterviewStep": "3"
 }

where:
- applicationId: The candidate application number
- currentInterviewStep: The new interview step for the application

## backend response example

```json
{
    "message": "Candidate stage updated successfully",
     "data": {
         "id": 1,
         "positionId": 1,
         "candidateId": 1,
         "applicationDate": "2024-06-04T13:34:58.304Z",
         "currentInterviewStep": 3,
         "notes": null,
         "interviews": []
     }
 }
````

## technical requirements

- check @candidateRoutes.ts because the /stage slug may be missing in the route
- use @services folder to call the endpoints
- do not implement any other endpoint, this is the last one

```

```
