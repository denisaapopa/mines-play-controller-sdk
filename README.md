
# PlayController

The `PlayController` component is a key part of the gameplay interface, allowing users to initiate a play or cash out based on their current game state. It supports manual play, autoplay for a specified number of plays, dynamic currency handling, and play amount adjustments.

---

## Component Overview

The `PlayController` allows the user to:

- Select a currency.
- Adjust the play amount.
- Start a play (manual or auto).
- Cash out winnings.
- Toggle between manual play and autoplay.

---

## Setup

### 1. Install the package using npm:

```bash
npm install @enigma-lake/play-controller-sdk
```

### 2. Import the component and styles in your project:

```tsx
import {
  AUTO_PLAY_STATE,
  GAME_MODE,
  AutoManualPlayProvider,
} from "@enigma-lake/play-controller-sdk";

import "@enigma-lake/play-controller-sdk/dist/style.css";
```

---

## Context & Provider

### `AutoManualPlayProvider`

The `AutoManualPlayProvider` wraps the PlayController, managing both manual play and autoplay. It uses React Context to provide game state and actions throughout the component tree.

🔹 **Features of `AutoManualPlayProvider`**:
- **Manages Game Mode**: Switches between MANUAL and AUTOPLAY.
- **Handles Autoplay**: Sets the number of plays, tracks rounds, and stops automatically.
- **Provides Context:** Exposes state and functions for controlling play behavior.

## Props

### 1. `StylingProps`

Handles the styling-related properties for the component.

- **`panel` (optional)**: Custom styling for the play controller.
  - **`bgColorHex`**: Hex color for the panel background.
  - **`bottom`**: Bottom margin for the panel relative to the window.

### 2. `CurrencyProps`

Handles currency-related logic and settings.

- **`currencyOptions`**: An object containing the following properties:
  - **`currentCurrency`**: The currently selected currency (e.g., `Currency.SWEEPS`).
  - **`currencies`**: Array of available currencies that the user can choose from.
  - **`winText`**: The win amount during the playing.

### 3. `ActionsProps`

Defines functions for the user actions.

- **`onPlay`**: A callback function to trigger when the user starts a play.
- **`onAutoPlay`**: A callback function to trigger when the user starts autoplay. It accepts `selection` (an array of selected indices) and `callback` (a function to be executed once autoplay finishes).
- **`onCashout`**: A callback function to trigger when the user decides to cash out their winnings.

### 4. `PlaySettingsProps`

Handles game-specific settings and states.

- **`playOptions`**: An object containing the following properties:
  - **`isPlaying`**: Boolean flag indicating whether the game is currently in progress.
  - **`canCashout`**: Boolean flag indicating whether the user can cash out their current play.
  - **`disabledController`**: Boolean flag to disable all interactive elements in the component, preventing user interactions (e.g., when the game is in progress).
  - **`displayController`**: Boolean flag to determine if the play controller should be visible.
  - **`showAutoPlayToast`**: A function to show a toast message during autoplay. Accepts an object with:
    - **`type`**: Message type (`"success"`, `"error"`, `"warning"`, or `"info"`).
    - **`message`**: The message to display.
  - **`playHook`**: A hook providing the current play amount, play limits, and a function to set the play amount.
    - **`playLimits`**: Play limits for the game.
    - **`playAmount`**: The current play amount.
    - **`setPlayAmount`**: A function to set the play amount.
  - **`autoPlayDelay`** (optional): The delay (in milliseconds) before auto play starts.

---

## Example Usage

```tsx
import "@enigma-lake/play-controller-sdk/dist/style.css";
import { AutoManualPlayProvider, GAME_MODE, AUTO_PLAY_STATE } from "@enigma-lake/play-controller-sdk";
import { Currency } from "@enigma-lake/zoot-platform-sdk";

const GameExample = () => {
  const config = {
    currencyOptions: {
      currentCurrency: Currency.SWEEPS,
      currencies: [Currency.SWEEPS, Currency.GOLD],
      winText: "0.00 SC",
    },
    onPlay: () => console.log("Play button clicked"),
    onAutoPlay: (selection, callback) => {
      console.log("Auto Play started with selection:", selection);
      callback();
    },
    onCashout: () => console.log("Cashout clicked"),
    playOptions: {
      displayController: true,
      canCashout: false,
      isPlaying: false,
      disabledController: false,
      showAutoPlayToast: (props) => {
        console.log(`${props.type}: ${props.message}`);
      },
      playHook: () => {
        return {
          playLimits: { min: 1, max: 100 },
          playAmount: 10,
          setPlayAmount: (value) => console.log("New play amount:", value),
        };
      },
    },
    panel: {
      bottom: '15px',
      bgColorHex: "#081E64"
    }
  };

  return (
    <AutoManualPlayProvider config={config}>
      {({ autoPlay: { selection, setSelection, state }, mode }) => (
        // children content
      )}
    </AutoManualPlayProvider>
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
