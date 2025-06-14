# Random User Card Component(API)

This React component (`Card.js`) fetches random user data from the [Random User API](https://randomuser.me/) and displays it in a card format.

## Features

- Fetches random user data using the Random User API.
- Displays user's name, email, city, and country.
- Allows user to fetch a new random user on button click.

### DEMO
 - Demo : [Simple Profile Card](https://profileinfothroughapi.netlify.app/)
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Import the `Card` component:

   ```jsx
   import Card from './Card';
   ```

2. Include the `Card` component in your JSX:

   ```jsx
   <Card />
   ```

## Example

```jsx
import React from 'react';
import Card from './Card';

const App = () => {
  return (
    <div>
      <h1>Random User Card</h1>
      <Card />
    </div>
  );
};

export default App;
```
