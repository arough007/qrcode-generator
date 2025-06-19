import React from 'react';
import { FormState, FormActions } from '../hooks/useFormState';
import ColorControls from './ColorControls';
import QRSettings from './QRSettings';

interface SettingsControlsProps {
  formState: FormState;
  formActions: FormActions;
}

const SettingsControls: React.FC<SettingsControlsProps> = ({
  formState,
  formActions,
}) => {
  return (
    <div className="qr-settings-controls">
      <ColorControls
        colors={formState.colors}
        onColorChange={formActions.updateColors}
      />

      <QRSettings
        settings={formState.qrSettings}
        onSettingsChange={formActions.updateQrSettings}
        isExpanded={formState.settingsExpanded}
        onToggleExpanded={() =>
          formActions.setSettingsExpanded(!formState.settingsExpanded)
        }
      />
    </div>
  );
};

export default SettingsControls;
