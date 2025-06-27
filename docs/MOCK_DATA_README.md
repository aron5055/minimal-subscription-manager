# Mock Subscription Data Usage Guide

## Overview

This project contains a complete set of mock subscription data for development and testing purposes. The data includes 12 different subscription services and 6 categories.

## Included Mock Data

### Categories
- Entertainment
- Productivity
- News
- Cloud
- Development
- Health

### Subscriptions
1. **Netflix** - $15.99/month - Entertainment
2. **Spotify Premium** - $9.99/month - Entertainment
3. **Notion Pro** - $8.00/month - Productivity
4. **ChatGPT Plus** - $20.00/month - Productivity
5. **GitHub Pro** - $4.00/month - Development
6. **iCloud+** - $2.99/month - Cloud
7. **New York Times** - $17.00/month - News
8. **Adobe Creative Cloud** - $52.99/month - Productivity
9. **Nike Training Club** - $14.99/month - Health (has end date)
10. **Steam** - $59.99/year - Entertainment
11. **Dropbox Plus** - $9.99/month - Cloud (paused)
12. **Figma Professional** - $12.00/month - Development

## How to Use Mock Data

### Method 1: Browser Console (Recommended)

1. Start the application in development mode
2. Open browser developer tools (F12)
3. Run the following commands in the console:

```javascript
// Load mock data
window.devTools.loadMockData()

// View mock data
window.devTools.showMockData()

// Check if existing data exists
window.devTools.hasExistingData()

// Clear all data
window.devTools.clearAllData()
```

### Method 2: Direct Import

If you need to use this data in your code, you can import it directly:

```typescript
import { mockSubscriptions, mockCategories, mockState } from "@/data/mockSubscriptions";

// Use a single subscription
const netflix = mockSubscriptions[0];

// Use all categories
const categories = mockCategories;

// Use complete state
const fullState = mockState;
```

## Data Characteristics

- **Date Format**: All dates use ISO 8601 format (e.g., "2025-01-01T00:00:00.000Z")
- **Currency**: Primarily uses USD, complying with the application's currency code requirements
- **Icon Types**: Contains three icon types:
  - `builtin`: Uses built-in Lucide icons
  - `text`: Uses text icons (e.g., "AI", "CC")
  - `favicon`: Can use URL icons (not used in examples)
- **Status**: Most subscriptions are "active", one is "paused"
- **Billing Cycle**: Includes monthly and yearly subscriptions
- **Pricing**: Covers different price ranges from $2.99 to $59.99

## Development Notes

- Mock data will override existing local storage data
- Development tools are not loaded in production environment
- All dates are set in 2025 to ensure data relevance
- Data conforms to Zod validation schema, ensuring type safety

## Custom Data

If you need to modify or add new mock data, please edit the `/src/data/mockSubscriptions.ts` file. Ensure:

1. Follow TypeScript type definitions
2. Use correct date format
3. Icon names exist in `GenericIcons`
4. Currency codes are in the supported list
5. Category IDs exist in the category object
