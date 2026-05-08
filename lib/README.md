# lib/

This directory contains shared code, utilities, types, and configuration for the Contigo platform.

## Structure

```
lib/
├── types/          # TypeScript type definitions
├── constants/      # Application constants
├── services/       # Data services and API helpers
├── utils/          # Utility functions
├── hooks/          # Custom React hooks (future)
└── config/         # Application configuration
```

## Types (`lib/types/`)

Shared TypeScript interfaces and types:
- `User`, `Student`, `Teacher`, `Admin` - User models
- `KPI`, `Activity`, `Message` - Feature models
- `Seat`, `ChartDataPoint` - Data structures
- `CEFRLevel`, `TrendDirection` - Enums

## Constants (`lib/constants/`)

Application-wide constants:
- `ROLES` - User role definitions with paths
- `COLORS` - Brand color palette
- `COLOR_CLASSES` - Tailwind color utility classes
- `APP_CONFIG` - Application metadata

## Services (`lib/services/`)

Data services and mock data:
- `mockData.ts` - Mock data for development
- Future: API service layers for backend integration

## Utils (`lib/utils/`)

Utility functions:
- `getScoreColorClass()` - Get Tailwind class for score
- `getScoreBgColorClass()` - Get background color for heatmap
- `formatDate()` - Date formatting
- `getTrendEmoji()` & `getTrendColorClass()` - Trend indicators
- `getInitials()` - Generate user initials

## Config (`lib/config/`)

Application configuration:
- `metadata.ts` - SEO and metadata configuration
- Future: Feature flags, environment config

## Usage Examples

```typescript
// Import types
import { Student, KPI } from '@/lib/types';

// Import constants
import { ROLES, COLORS } from '@/lib/constants';

// Import utilities
import { getScoreColorClass, formatDate } from '@/lib/utils';

// Import mock data
import { MOCK_STUDENTS, MOCK_ACTIVITIES } from '@/lib/services/mockData';

// Import metadata
import { generatePageMetadata } from '@/lib/config/metadata';
```
