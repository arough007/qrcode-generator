# Component Architecture

This QR Code Generator has been refactored into smaller, reusable components following React best practices.

## Components

### QRCodeGenerator (Main Component)
- **Purpose**: Orchestrates the entire QR code generation flow
- **State**: Manages text input, QR type, vCard data, and color options
- **Hooks**: Uses custom hooks for QR code generation and debouncing

### QRTypeSelector
- **Purpose**: Dropdown to select between Text/URL and vCard modes
- **Props**: `qrType`, `onTypeChange`
- **Responsibility**: Single responsibility for type selection

### TextInput
- **Purpose**: Textarea for text/URL input
- **Props**: `value`, `onChange`
- **Responsibility**: Handles text input with proper labeling

### VCardForm
- **Purpose**: Form with all vCard contact fields
- **Props**: `vcardData`, `onDataChange`
- **Responsibility**: Manages contact information input with grid layout

### ColorControls
- **Purpose**: Color pickers and transparency checkbox
- **Props**: `colors`, `onColorChange`
- **Responsibility**: Handles color customization options

### QRCodeDisplay
- **Purpose**: Shows generated QR code and download button
- **Props**: `canvasRef`, `showQRCode`, `error`, `qrType`, `onDownload`
- **Responsibility**: Displays results and handles download functionality

## Custom Hooks

### useQRCode
- **Purpose**: Encapsulates QR code generation logic
- **Returns**: Canvas ref, state, and methods for generating/downloading QR codes
- **Benefits**: Reusable logic, separation of concerns

### useDebounce
- **Purpose**: Generic debouncing hook for performance optimization
- **Parameters**: `callback`, `dependencies`, `delay`
- **Benefits**: Prevents excessive API calls during rapid input changes

## Benefits of This Architecture

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or replaced
3. **Testability**: Smaller components are easier to unit test
4. **Maintainability**: Changes to one component don't affect others
5. **Performance**: Custom hooks optimize rendering and API calls
6. **Type Safety**: Shared TypeScript interfaces ensure consistency 