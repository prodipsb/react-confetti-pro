# React Confetti Pro

A customizable confetti animation for React. Easily add a fun and interactive confetti effect to your React applications.

![React Confetti](https://github.com/user-attachments/assets/39198ce7-91a6-4e56-bf2a-bfb63d9cbc0d)

## Installation

You can install `react-confetti-pro` via npm or yarn:

```bash
npm install react-confetti-pro
```

or

```bash
yarn add react-confetti-pro
```

## Usage

Import and use the `Confetti` component in your React application:

```jsx
import { Confetti } from 'react-confetti-pro';

function App() {
  return (
    <Confetti
      particleCount={150}
      duration={10000}
      direction={'center'}
    />
  );
}

export default App;
```

## Props

| Prop           | Type    | Default | Description |
|---------------|--------|---------|-------------|
| `particleCount` | number | `100`  | Number of confetti particles. |
| `duration`      | number | `5000`  | Duration of the confetti effect in milliseconds. |
| `direction`     | string | `'center'` | Direction of the confetti (`'left'`, `'right'`, `'center'`). |

## License

This project is licensed under the ISC License.
