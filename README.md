# PlayController

The `PlayController` component is part of a gameplay interface, enabling users to initiate a play or cash out based on their current game state. It supports dynamic currency handling, play amount adjustment, and play limits, offering buttons to increase/decrease the play amount and handle user actions like initiating the play or cashing out.

---

## Component Overview

The `PlayController` allows the user to:
- Select a currency.
- Adjust the play amount.
- Start a play.
- Cash out winnings.

---

## Setup

To use the PlayController component in your project, follow these steps:

### 1. Install the package using npm:

```bash
npm install @enigma-lake/play-controller-sdk
```

### 2. Import the component and styles in your project:

```tsx
import PlayController from '@enigma-lake/play-controller-sdk';
import "@enigma-lake/play-controller-sdk/dist/style.css";
```

---

## Props

The component accepts the following props:

### 1. `StylingProps`
Handles the styling-related properties for the component.

- **`inputStyle` (optional)**: Custom styling for the input fields.
  - **`backgroundColorHex`**: Hex color for the input background.
  - **`textColorHex`**: Hex color for the input text.

### 2. `CurrencyProps`
Handles currency-related logic and settings.

- **`currencyOptions`**: An object containing the following properties:
  - **`currentCurrency`**: The currently selected currency (e.g., `Currency.SWEEPS`).
  - **`currencies`**: Array of available currencies that the user can choose from.
  - **`formatCurrency`**: A function to format the currency value (e.g., `formatCurrency(value, Currency.GOLD)`).

### 3. `ActionsProps`
Defines functions for the user actions.

- **`onPlay`**: A callback function to trigger when the user starts a play.
- **`onCashout`**: A callback function to trigger when the user decides to cash out their winnings.

### 4. `PlaySettingsProps`
Handles game-specific settings and states.

- **`playOptions`**: An object containing the following properties:
  - **`winAmount` (optional)**: The user's current win amount. Defaults to `0`.
  - **`isPlaying`**: Boolean flag indicating whether the game is currently in progress.
  - **`canCashout`**: Boolean flag indicating whether the user can cash out their current play.
  - **`disabledController`**: Boolean flag to disable all interactive elements in the component, preventing user interactions (e.g., when the game is in progress).
  - **`playHook`**: A hook providing the current play amount, play limits, and a function to set the play amount.

---

## Example Usage

```tsx
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import PlayController from '@enigma-lake/play-controller-sdk';
import "@enigma-lake/play-controller-sdk/dist/style.css";

const Example = () => {
  const [currency, setCurrency] = useState(Currency.SWEEPS);
  const [playAmount, setPlayAmount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canCashout, setCanCashout] = useState(false);

  const formatCurrency = (value: number, currency: Currency) => {
    return `${value} ${currency === Currency.SWEEPS ? 'SC' : 'GC'}`;
  };

  const playHook = () => ({
    playAmount,
    playLimits: {
      [Currency.SWEEPS]: { limits: { min: 0.5, max: 100 } },
      [Currency.GOLD]: { limits: { min: 1, max: 50 } }
    },
    setPlayAmount,
  });

  const onPlay = () => {
    console.log('Play Started!');
    setIsPlaying(true);
  };

  const onCashout = () => {
    console.log('Cashout!');
    setCanCashout(false);
  };

  return (
    <PlayController
      currencyOptions={{
        currentCurrency: currency,
        currencies: [Currency.SWEEPS, Currency.GOLD],
        formatCurrency,
      }}
      playOptions={{
        winAmount: 0,
        isPlaying,
        canCashout,
        disabledController: isPlaying,
        playHook,
      }}
      onPlay={onPlay}
      onCashout={onCashout}
      inputStyle={{
        backgroundColorHex: "#f0f0f0",
        textColorHex: "#333333",
      }}
    />
  );
};
```

---

## Key Features

1. **Dynamic Currency Handling**:
   - Supports multiple currencies (e.g., SWEEPS, GOLD).
   - Allows users to switch currencies easily.

2. **Play Amount Adjustment**:
   - Includes buttons to halve or double the play amount.
   - Validates play amounts against user balance and play limits.

3. **Custom Styling**:
   - Supports customizable input and button colors.

4. **Play & Cashout Actions**:
   - Allows users to initiate gameplay or cash out winnings seamlessly.

---

## Development Notes

1. **Play Amount Validation**:
   - The play amount is validated to ensure it falls within the minimum and maximum limits, as well as the user's available balance.

2. **Responsive Design**:
   - The component is styled to be responsive and integrate seamlessly into various layouts.
