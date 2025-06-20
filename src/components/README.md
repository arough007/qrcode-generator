# Component Architecture

This QR Code Generator has been refactored into smaller, reusable components following React best practices with a focus on accessibility and user experience.

## Components

### QRCodeGenerator (Main Component)

- **Purpose**: Orchestrates the entire QR code generation flow
- **State**: Manages text input, QR type, vCard data, and color options
- **Hooks**: Uses custom hooks for QR code generation and debouncing
- **Accessibility**: Includes skip navigation links and proper ARIA structure

### QRTypeSelector

- **Purpose**: Dropdown to select between Text/URL and vCard modes
- **Props**: `qrType`, `onTypeChange`
- **Responsibility**: Single responsibility for type selection
- **Accessibility**: Proper labeling and keyboard navigation

### TextInput

- **Purpose**: Textarea for text/URL input
- **Props**: `value`, `onChange`
- **Responsibility**: Handles text input with proper labeling
- **Accessibility**: Associated labels and ARIA attributes

### VCardForm

- **Purpose**: Form with all vCard contact fields
- **Props**: `vcardData`, `onDataChange`
- **Responsibility**: Manages contact information input with grid layout
- **Accessibility**: Proper form structure and field associations

### ColorControls

- **Purpose**: Color pickers and transparency checkbox
- **Props**: `colors`, `onColorChange`
- **Responsibility**: Handles color customization options
- **Accessibility**: High contrast colors and proper labeling

### QRCodeDisplay

- **Purpose**: Shows generated QR code with export options
- **Props**: `canvasRef`, `showQRCode`, `error`, `qrType`, `onDownload`
- **Responsibility**: Displays results and handles export functionality
- **Features**: Integrates ExportOptions component for multiple formats

### ExportOptions

- **Purpose**: Multi-format export interface
- **Props**: `canvasRef`, `qrType`, `isDisabled`
- **Responsibility**: Handles PNG, JPEG, SVG, and PDF export
- **Features**: Interactive format selection with descriptions

### QRSettings

- **Purpose**: Advanced QR code configuration modal
- **Props**: `settings`, `onSettingsChange`, `isExpanded`, `onToggleExpanded`
- **Responsibility**: Modal interface for advanced settings
- **Accessibility**: Focus management and modal ARIA attributes

### Controls

- **Purpose**: Container for input controls and settings
- **Props**: Various control-related props
- **Responsibility**: Organizes input controls and settings toggle
- **Layout**: Responsive layout management

### ErrorBoundary

- **Purpose**: Catches and displays React errors gracefully
- **Props**: `children`
- **Responsibility**: Error handling and recovery UI
- **Features**: User-friendly error messages and reset functionality

## Custom Hooks

### useQRCode

- **Purpose**: Encapsulates QR code generation logic
- **Returns**: Canvas ref, state, and methods for generating/downloading QR codes
- **Benefits**: Reusable logic, separation of concerns
- **Features**: Supports multiple export formats

### useFormState

- **Purpose**: Manages form state for text and vCard inputs
- **Returns**: State management functions and current values
- **Benefits**: Centralized state management, type safety

### useModalFocus

- **Purpose**: Handles focus management in modal dialogs
- **Returns**: Modal ref and focus management functions
- **Benefits**: Accessibility compliance, keyboard navigation
- **Features**: Focus trapping, restoration, and escape key handling

## Accessibility Features

### Skip Navigation

- **Implementation**: Skip links in QRCodeGenerator component
- **Purpose**: Allows keyboard users to quickly navigate to main content
- **Standards**: WCAG 2.1 AA compliance

### Focus Management

- **Modal Focus**: Proper focus trapping in QRSettings modal
- **Tab Order**: Logical keyboard navigation throughout the app
- **Focus Indicators**: Visible focus states for all interactive elements

### ARIA Support

- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **ARIA Attributes**: Labels, descriptions, and roles where needed
- **Screen Reader Support**: Comprehensive screen reader compatibility

### Color Accessibility

- **High Contrast**: All color combinations meet WCAG AA standards
- **Color Independence**: Information not conveyed by color alone
- **Transparency Support**: Accessible handling of transparent backgrounds

## Benefits of This Architecture

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or replaced
3. **Testability**: Smaller components are easier to unit test
4. **Maintainability**: Changes to one component don't affect others
5. **Performance**: Custom hooks optimize rendering and API calls
6. **Type Safety**: Shared TypeScript interfaces ensure consistency
7. **Accessibility**: Built-in accessibility features and ARIA support
8. **User Experience**: Responsive design and intuitive interactions

## Component Testing

All components are thoroughly tested with:

- **Unit Tests**: Individual component behavior
- **Integration Tests**: Component interactions
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Responsive Tests**: Layout behavior across screen sizes
- **User Interaction Tests**: Realistic user scenarios

The test suite ensures reliability and maintains accessibility standards across all components.
